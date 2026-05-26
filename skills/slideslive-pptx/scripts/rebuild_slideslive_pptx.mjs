import fs from "node:fs/promises";
import path from "node:path";
import PptxGenJS from "pptxgenjs";

const args = Object.fromEntries(
  process.argv.slice(2).map((arg) => {
    const [key, ...value] = arg.replace(/^--/, "").split("=");
    return [key, value.join("=") || "true"];
  }),
);

const presentationId = args.id;
const slidesJsonPath = path.resolve(args.slidesJson || "slides.json");
const quality = args.quality || "2160";
const slideHost = args.host || "slideslive-slides.b-cdn.net";
const outDir = path.resolve(args.outDir || `slideslive_${presentationId}_slides`);
const outPptx = path.resolve(args.out || `slideslive_${presentationId}.pptx`);

if (!presentationId) {
  throw new Error("Pass --id={presentation_id}");
}

const data = JSON.parse(await fs.readFile(slidesJsonPath, "utf8"));
const imageSlides = data.slides.filter((slide) => slide.type === "image");

const uniqueSlides = [];
const seen = new Set();
for (const slide of imageSlides) {
  const name = slide.image.name;
  if (!seen.has(name)) {
    seen.add(name);
    uniqueSlides.push(slide);
  }
}

await fs.mkdir(outDir, { recursive: true });

async function download(url, dest) {
  const response = await fetch(url, {
    headers: {
      Referer: `https://slideslive.com/embed/presentation/${presentationId}`,
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125 Safari/537.36",
      Accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    },
  });

  if (!response.ok) throw new Error(`HTTP ${response.status} for ${url}`);
  await fs.writeFile(dest, Buffer.from(await response.arrayBuffer()));
}

const files = [];
let index = 0;
for (const slide of uniqueSlides) {
  index += 1;
  const name = slide.image.name;
  const ext = slide.image.extname ?? ".png";
  const url =
    `https://${slideHost}/${presentationId}/slides/original/` +
    `${name}${ext}?class=${quality}`;
  const dest = path.join(outDir, `${String(index).padStart(4, "0")}${ext}`);
  files.push(dest);

  try {
    await fs.access(dest);
  } catch {
    await download(url, dest);
  }

  if (index % 25 === 0 || index === uniqueSlides.length) {
    console.log(`downloaded ${index}/${uniqueSlides.length}`);
  }
}

const pptx = new PptxGenJS();
pptx.defineLayout({ name: "CUSTOM_WIDE", width: 13.333333, height: 7.5 });
pptx.layout = "CUSTOM_WIDE";

for (const file of files) {
  const slide = pptx.addSlide();
  slide.background = { color: "FFFFFF" };
  slide.addImage({ path: file, x: 0, y: 0, w: 13.333333, h: 7.5 });
}

await pptx.writeFile({ fileName: outPptx });
console.log(`wrote ${outPptx}`);
console.log(`slides: ${files.length}`);

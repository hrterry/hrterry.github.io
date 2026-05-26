import fs from "node:fs/promises";
import path from "node:path";
import PptxGenJS from "pptxgenjs";
import sharp from "sharp";

const args = Object.fromEntries(
  process.argv.slice(2).map((arg) => {
    const [key, ...value] = arg.replace(/^--/, "").split("=");
    return [key, value.join("=") || "true"];
  }),
);

const slideDir = path.resolve(args.slideDir || "slides");
const outPptx = path.resolve(args.out || "slideslive_merged.pptx");
const reportPath = path.resolve(args.report || "slideslive_merge_report.csv");

const sampleWidth = Number(args.sampleWidth || 360);
const sampleHeight = Number(args.sampleHeight || 203);
const diffThreshold = Number(args.diffThreshold || 46);
const whiteThreshold = Number(args.whiteThreshold || 244);

const files = (await fs.readdir(slideDir))
  .filter((name) => /\.(png|jpe?g)$/i.test(name))
  .sort()
  .map((name) => path.join(slideDir, name));

async function rawPixels(file) {
  return sharp(file)
    .resize(sampleWidth, sampleHeight, { fit: "fill" })
    .removeAlpha()
    .raw()
    .toBuffer();
}

function isWhiteish(buffer, offset) {
  return (
    buffer[offset] >= whiteThreshold &&
    buffer[offset + 1] >= whiteThreshold &&
    buffer[offset + 2] >= whiteThreshold
  );
}

function classifyPair(prev, next) {
  let changed = 0;
  let added = 0;
  let removed = 0;
  let modified = 0;
  const pixels = sampleWidth * sampleHeight;

  for (let offset = 0; offset < prev.length; offset += 3) {
    const delta =
      Math.abs(prev[offset] - next[offset]) +
      Math.abs(prev[offset + 1] - next[offset + 1]) +
      Math.abs(prev[offset + 2] - next[offset + 2]);
    if (delta <= diffThreshold) continue;

    changed += 1;
    const prevBlank = isWhiteish(prev, offset);
    const nextBlank = isWhiteish(next, offset);
    if (prevBlank && !nextBlank) added += 1;
    else if (!prevBlank && nextBlank) removed += 1;
    else modified += 1;
  }

  const changedRatio = changed / pixels;
  const removedRatio = changed ? removed / changed : 0;
  const modifiedRatio = changed ? modified / changed : 0;
  const addedRatio = changed ? added / changed : 0;
  const duplicate = changedRatio < 0.0015;
  const additive =
    duplicate ||
    (changedRatio > 0.001 &&
      changedRatio < 0.2 &&
      addedRatio > 0.55 &&
      removedRatio < 0.08 &&
      modifiedRatio < 0.32);

  return { additive, duplicate, changedRatio, addedRatio, removedRatio, modifiedRatio };
}

const keep = Array(files.length).fill(true);
const rows = [
  "prev,next,decision,changed_ratio,added_ratio,removed_ratio,modified_ratio",
];

let prevPixels = await rawPixels(files[0]);
for (let i = 1; i < files.length; i += 1) {
  const nextPixels = await rawPixels(files[i]);
  const result = classifyPair(prevPixels, nextPixels);
  if (result.additive) keep[i - 1] = false;

  rows.push(
    [
      path.basename(files[i - 1]),
      path.basename(files[i]),
      result.duplicate ? "duplicate_drop_prev" : result.additive ? "additive_drop_prev" : "keep_boundary",
      result.changedRatio.toFixed(6),
      result.addedRatio.toFixed(4),
      result.removedRatio.toFixed(4),
      result.modifiedRatio.toFixed(4),
    ].join(","),
  );

  prevPixels = nextPixels;
}

await fs.writeFile(reportPath, `${rows.join("\n")}\n`);

const pptx = new PptxGenJS();
pptx.defineLayout({ name: "CUSTOM_WIDE", width: 13.333333, height: 7.5 });
pptx.layout = "CUSTOM_WIDE";

for (const file of files.filter((_, index) => keep[index])) {
  const slide = pptx.addSlide();
  slide.background = { color: "FFFFFF" };
  slide.addImage({ path: file, x: 0, y: 0, w: 13.333333, h: 7.5 });
}

await pptx.writeFile({ fileName: outPptx });
console.log(`input slides: ${files.length}`);
console.log(`kept slides: ${keep.filter(Boolean).length}`);
console.log(`dropped slides: ${keep.filter((value) => !value).length}`);
console.log(`wrote ${outPptx}`);
console.log(`report ${reportPath}`);

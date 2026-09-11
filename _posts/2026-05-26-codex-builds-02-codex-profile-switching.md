---
layout: post
title: Switching Codex between login quota and a custom API
date: 2026-05-26 10:00:00 -0400
description: A small local profile switcher that changes provider configuration while keeping one shared Codex conversation history.
tags: codex configuration automation
categories: research-workflows
---

I wanted a boring switch: use Codex with the official login quota most of the time, then manually switch to a custom API profile when needed, without re-entering provider settings every time.

The useful constraint is that both modes should share the same local history. I do not want two separate Codex homes, two sets of sessions, or a migration step every time I change providers. The switch should only change how future requests are routed.

## The key idea

Codex reads its active configuration from one file under the Codex home:

    %USERPROFILE%\.codex\config.toml

Instead of editing that file by hand, keep two sanitized profile copies:

    %USERPROFILE%\.codex\profiles\official.config.toml
    %USERPROFILE%\.codex\profiles\custom-api.config.toml

Switching profiles is just copying one of those files over the active `config.toml`. The rest of the Codex home remains untouched:

    %USERPROFILE%\.codex\sessions
    %USERPROFILE%\.codex\session_index.jsonl
    %USERPROFILE%\.codex\history.jsonl

That is why chat history can stay shared. The switch changes provider configuration, not the directory where Codex stores conversations.

## Preparing the profiles

First, save the currently working official-login configuration as the official profile:

    New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.codex\profiles"
    Copy-Item "$env:USERPROFILE\.codex\config.toml" `
      "$env:USERPROFILE\.codex\profiles\official.config.toml"

Then save the custom API configuration as a second profile:

    Copy-Item "path\to\custom-api-config.toml" `
      "$env:USERPROFILE\.codex\profiles\custom-api.config.toml"

Do not publish the real custom API profile. It may contain a private base URL, model names, account-specific settings, or environment assumptions that should stay local.

## The switching script

The switcher accepts `official`, `custom-api`, or `status`. Before overwriting the active config, it saves a timestamped backup.

    param(
        [Parameter(Mandatory = $true, Position = 0)]
        [ValidateSet("official", "custom-api", "status")]
        [string] $Profile
    )

    $ErrorActionPreference = "Stop"

    $codexHome = Join-Path $HOME ".codex"
    $configPath = Join-Path $codexHome "config.toml"
    $profilesDir = Join-Path $codexHome "profiles"
    $backupDir = Join-Path $profilesDir "backups"

    $profiles = @{
        official = Join-Path $profilesDir "official.config.toml"
        "custom-api" = Join-Path $profilesDir "custom-api.config.toml"
    }

    if ($Profile -eq "status") {
        Write-Host "Active config: $configPath"
        exit 0
    }

    $sourcePath = $profiles[$Profile]
    if (!(Test-Path -LiteralPath $sourcePath)) {
        throw "Profile config not found: $sourcePath"
    }

    New-Item -ItemType Directory -Force -Path $backupDir | Out-Null

    if (Test-Path -LiteralPath $configPath) {
        $stamp = Get-Date -Format "yyyyMMdd-HHmmss"
        $backupPath = Join-Path $backupDir "config.$stamp.toml"
        Copy-Item -LiteralPath $configPath -Destination $backupPath -Force
    }

    Copy-Item -LiteralPath $sourcePath -Destination $configPath -Force
    Write-Host "Switched Codex profile to: $Profile"

Save it as:

    %USERPROFILE%\.codex\switch-codex-profile.ps1

Then run:

    powershell.exe -NoProfile -ExecutionPolicy Bypass `
      -File "$env:USERPROFILE\.codex\switch-codex-profile.ps1" official

    powershell.exe -NoProfile -ExecutionPolicy Bypass `
      -File "$env:USERPROFILE\.codex\switch-codex-profile.ps1" custom-api

## Optional double-click wrappers

For a manual workflow, small `.cmd` wrappers are enough. They avoid typing the PowerShell command each time.

    @echo off
    powershell.exe -NoProfile -ExecutionPolicy Bypass ^
      -File "%USERPROFILE%\.codex\switch-codex-profile.ps1" official
    pause

    @echo off
    powershell.exe -NoProfile -ExecutionPolicy Bypass ^
      -File "%USERPROFILE%\.codex\switch-codex-profile.ps1" custom-api
    pause

After switching, restart Codex or open a new session so the app reads the new `config.toml`.

## What this does not do

This is not a multi-account sync system. It does not merge remote server history, transfer billing state, or change authentication tokens. It only swaps the local provider configuration file used by Codex.

The important safety rule is to keep one shared `CODEX_HOME`. If each profile launches Codex with a different home directory, then sessions will naturally split across those directories.

## Troubleshooting missing history

If the sidebar appears to lose old conversations, first check whether the real session files still exist:

    Get-ChildItem -Recurse -File "$env:USERPROFILE\.codex\sessions" |
      Measure-Object

If there are many session files but only a few entries in `session_index.jsonl`, the problem is likely the local sidebar index rather than deleted conversations. Rebuilding the index from the session files restores the visible list while keeping the original conversations intact.

The lesson is simple: profile switching should be scoped to `config.toml`. Conversation storage should remain shared, boring, and backed up.

#!/usr/bin/env bash
# Quality-first pipeline.
# Playback films (hero, beacon, loops): REMUX ONLY (-c copy) — the original
# 1080p bits ship untouched, just moov-fronted for streaming.
# Scrub film (corridor): needs short GOP for seeking — re-encode at crf 17
# to keep it visually lossless.
set -e
FF='C:/Users/sadeq/AppData/Local/Programs/Python/Python312/Lib/site-packages/imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v7.1.exe'
cd "$(dirname "$0")/../incoming"
mkdir -p ../public/film

# hero + beacon + loops: untouched quality, faststart remux
for f in f1-assembly f3-beacon l1-pages l2-motion l3-apps l4-speed; do
  "$FF" -y -i $f.mp4 -an -c:v copy -movflags +faststart ../public/film/$f.mp4 2>/dev/null
  "$FF" -y -i ../public/film/$f.mp4 -frames:v 1 -q:v 2 ../public/film/$f-poster.jpg 2>/dev/null
done
# hero mobile variant (smaller screens, cellular)
"$FF" -y -i f1-assembly.mp4 -an -vf "scale=1080:-2" -c:v libx264 -preset slow -crf 23 \
  -pix_fmt yuv420p -movflags +faststart ../public/film/f1-assembly-m.mp4 2>/dev/null

# corridor: scroll-scrubbed -> short GOP, near-lossless
"$FF" -y -i f2-corridor.mp4 -an -c:v libx264 -preset slow -crf 17 -pix_fmt yuv420p \
  -g 8 -keyint_min 8 -sc_threshold 0 -movflags +faststart ../public/film/f2-corridor.mp4 2>/dev/null
"$FF" -y -i f2-corridor.mp4 -an -vf "scale=1080:-2" -c:v libx264 -preset slow -crf 22 \
  -pix_fmt yuv420p -g 4 -keyint_min 4 -sc_threshold 0 -movflags +faststart ../public/film/f2-corridor-m.mp4 2>/dev/null
"$FF" -y -i ../public/film/f2-corridor.mp4 -frames:v 1 -q:v 2 ../public/film/f2-corridor-poster.jpg 2>/dev/null

ls -la ../public/film/

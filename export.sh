#!/usr/bin/env bash

clean_png() {
  rm -rf png
}

clean_svg() {
  rm -rf svg
}

export_png() {
  local filename="$1"
  local scale="$2"
  local size=$(expr "$scale" \* 16)

  /Applications/Aseprite.app/Contents/MacOS/aseprite -b --layer="Layer 1" src/${filename}.aseprite --scale "$scale" --save-as "png/${size}/${filename}.png"
}

export_svg() {
  local filename="$1"

  /Applications/Aseprite.app/Contents/MacOS/aseprite -b --layer="Layer 1" src/${filename}.aseprite --save-as "svg/${size}/${filename}.svg"
}

export_all_png() {
  find src -type f -name *.aseprite -print | while read f; do
    filename=$(basename -s .aseprite "$f")
    export_png "$filename" 1
    export_png "$filename" 2
  done
}

export_all_svg() {
  find src -type f -name *.aseprite -print | while read f; do
    filename=$(basename -s .aseprite "$f")
    export_svg "$filename"
  done
}

# clean_png
# export_all_png

clean_svg
export_all_svg

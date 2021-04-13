# MapartCraft React (WIP)

A React JS refactor fork of Rebane2001's [MapartCraft](https://github.com/rebane2001/mapartcraft)

## Changes

- Store locale as a cookie instead of a separate page for each language
- Remove the need for `render_html.py`: `npm run build` creates the final product
- Remove the need for `ImageMagick` / `create_img.bat`
- Remove the need for `create_css.py`: all textures are in one png that correspond in x and y with `coloursJSON.json`
- Trim supported versions down: eg drop 1.12, 1.12.1 in favour of just 1.12.2...
- Tweaked locale JSONs to not contain duplicate values
- Added 4th colour to colour boxes in block selection pane when mapdat option and unobtainable box selected
- Original map preview had to finish its current rendering before re-rendering if an option changed mid render; now the map rendering worker is immediately terminated and relaunched if an option changes mid render to save time
- Remove 'seconds remaining' from progress bar as it is inaccurate, and unnecessary with percentage shown also

## Requirements

- Node JS

## Running

Acquire packages with `npm install`. Build using `npm run build`, or run debug version with `npm start`

# Logo asset sources

These local assets identify the organisations mentioned in a post. They do not add any endorsement claim to the page.

- **Redwood Research:** https://www.redwoodresearch.org/redwood_logo.svg, linked from https://www.redwoodresearch.org/. `public/assets/logos/redwood.svg` preserves the official tree and circle paths, omits the accompanying wordmark, and adds viewBox whitespace for the square tile. Original green: `#1D4B38`.
- **MATS:** https://cdn.prod.website-files.com/6909901117f6b8d83783ca29/690fa017d221ed2fd31e3735_05eb9a096d484f219928543ee6cdae64_MATS%20Logo.svg, linked from https://www.matsprogram.org/. `public/assets/logos/mats.svg` extracts the original square torch symbol and burgundy background (`#801323`), omitting the adjacent wordmark and rounded clipping mask to fit the site's square borders.
- **Lossfunk:** the existing local `lossfunk-logo.jpg`, matching the handwritten logo shown at https://lossfunk.com/ (`https://lossfunk.com/lossfunk-logo.jpg`). `public/assets/logos/lossfunk.svg` is a temporary monochrome vector trace, not an official SVG. It uses vector paths, not an embedded bitmap. Replace this file with the owner's original SVG when available. The JPG was lightly smoothed and thresholded, then traced with vtracer; no tracing tool is required to build or run the website.

All logos load from this repository, without hotlinking the organisations' servers.

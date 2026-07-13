// Generates a simple solid-color placeholder image as a data URI so seed
// recipes don't depend on network image hosting.
export function makePlaceholderImage(hexColor) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="400"><rect width="640" height="400" fill="${hexColor}"/></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

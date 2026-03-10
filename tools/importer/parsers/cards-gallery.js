/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-gallery. Base: cards.
 * Source: https://wknd-trendsetters.pages.dev/
 * Selector: .grid-layout.desktop-4-column.grid-gap-sm
 * Cards block: 1 column per row. Each row = image only.
 */
export default function parse(element, { document }) {
  const cells = [];

  const images = element.querySelectorAll('img');
  images.forEach((img) => {
    cells.push([img]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-gallery', cells });
  element.replaceWith(block);
}

/* eslint-disable */
/* global WebImporter */
/**
 * Parser for hero-banner. Base: hero.
 * Source: https://wknd-trendsetters.pages.dev/
 * Selector: section.inverse-section .utility-position-relative
 * Hero block: 1 column. Row 1 = background image, Row 2 = heading + subheading + CTA
 */
export default function parse(element, { document }) {
  const cells = [];

  // Row 1: background image
  const bgImage = element.querySelector('img.cover-image, img');
  if (bgImage) cells.push([bgImage]);

  // Row 2: heading + subheading + CTA grouped in one cell
  const contentContainer = document.createElement('div');

  const heading = element.querySelector('h2, h1, .h1-heading');
  if (heading) contentContainer.append(heading);

  const subheading = element.querySelector('p.subheading, .subheading');
  if (subheading) contentContainer.append(subheading);

  const ctaLinks = element.querySelectorAll('.button-group a.button, a.inverse-button');
  ctaLinks.forEach((link) => contentContainer.append(link));

  if (contentContainer.childNodes.length > 0) cells.push([contentContainer]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-banner', cells });
  element.replaceWith(block);
}

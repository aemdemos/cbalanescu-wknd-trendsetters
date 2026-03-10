/* eslint-disable */
/* global WebImporter */
/**
 * Parser for columns-article. Base: columns.
 * Source: https://wknd-trendsetters.pages.dev/
 * Selector: main section:first-of-type .grid-layout.grid-gap-lg
 * Columns block: 2 columns. Col 1 = image, Col 2 = breadcrumbs + heading + author + date
 */
export default function parse(element, { document }) {
  const cells = [];

  // Column 1: featured image
  const image = element.querySelector('img');

  // Column 2: article metadata
  const contentContainer = document.createElement('div');

  // Breadcrumbs: .breadcrumbs contains <a> links separated by SVG arrows
  const breadcrumbLinks = element.querySelectorAll('.breadcrumbs a');
  if (breadcrumbLinks.length > 0) {
    const breadcrumbP = document.createElement('p');
    breadcrumbLinks.forEach((link, i) => {
      if (i > 0) breadcrumbP.append(document.createTextNode('  '));
      breadcrumbP.append(link);
    });
    contentContainer.append(breadcrumbP);
  }

  // Heading
  const heading = element.querySelector('h2, h1');
  if (heading) contentContainer.append(heading);

  // Author: "By Taylor Brooks" in .flex-horizontal spans
  const authorContainer = element.querySelector('.flex-horizontal');
  if (authorContainer) {
    const authorP = document.createElement('p');
    const spans = authorContainer.querySelectorAll('span');
    const authorText = Array.from(spans).map((s) => s.textContent.trim()).join(' ');
    authorP.textContent = authorText;
    contentContainer.append(authorP);
  }

  // Date: "June 12, 2024 • 4 min read" in second .flex-horizontal
  const flexContainers = element.querySelectorAll('.flex-horizontal');
  if (flexContainers.length > 1) {
    const dateP = document.createElement('p');
    const spans = flexContainers[1].querySelectorAll('span');
    const dateText = Array.from(spans).map((s) => s.textContent.trim()).join(' ');
    dateP.textContent = dateText;
    contentContainer.append(dateP);
  }

  const row = [];
  if (image) row.push(image);
  if (contentContainer.childNodes.length > 0) row.push(contentContainer);

  if (row.length > 0) cells.push(row);

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-article', cells });
  element.replaceWith(block);
}

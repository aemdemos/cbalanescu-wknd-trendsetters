/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-article. Base: cards.
 * Source: https://wknd-trendsetters.pages.dev/
 * Selector: .grid-layout.desktop-4-column.grid-gap-md
 * Cards block: 2 columns per row. Col 1 = image, Col 2 = tag + date + heading + link
 */
export default function parse(element, { document }) {
  const cells = [];

  // Cards are <a class="article-card"> elements
  const cardItems = element.querySelectorAll('a.article-card, .article-card');
  cardItems.forEach((card) => {
    const img = card.querySelector('img');
    const contentContainer = document.createElement('div');

    // Tag: <span class="tag">
    const tag = card.querySelector('.tag');
    if (tag) {
      const p = document.createElement('p');
      p.textContent = tag.textContent.trim();
      contentContainer.append(p);
    }

    // Date: <span class="paragraph-sm"> inside .article-card-meta
    const dateEl = card.querySelector('.article-card-meta .paragraph-sm');
    if (dateEl) {
      const p = document.createElement('p');
      p.textContent = dateEl.textContent.trim();
      contentContainer.append(p);
    }

    // Heading
    const heading = card.querySelector('h3, h2, h4');
    if (heading) contentContainer.append(heading);

    // Link: the card itself is an <a> with href
    const href = card.getAttribute('href') || card.closest('a')?.getAttribute('href');
    if (href) {
      const p = document.createElement('p');
      const link = document.createElement('a');
      link.href = href;
      link.textContent = heading ? heading.textContent.trim() : href;
      p.append(link);
      contentContainer.append(p);
    }

    const row = [];
    if (img) row.push(img);
    if (contentContainer.childNodes.length > 0) row.push(contentContainer);
    if (row.length > 0) cells.push(row);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-article', cells });
  element.replaceWith(block);
}

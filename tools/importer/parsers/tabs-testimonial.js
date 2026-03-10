/* eslint-disable */
/* global WebImporter */
/**
 * Parser for tabs-testimonial. Base: tabs.
 * Source: https://wknd-trendsetters.pages.dev/
 * Selector: .tabs-wrapper
 * Tabs block: 2 columns. Col 1 = tab label (name), Col 2 = image + name + role + quote
 */
export default function parse(element, { document }) {
  const cells = [];

  // Tab panels contain the full content for each testimonial
  const tabPanels = element.querySelectorAll('.tab-pane');

  tabPanels.forEach((panel) => {
    const contentContainer = document.createElement('div');

    // Image
    const img = panel.querySelector('img');
    if (img) {
      const p = document.createElement('p');
      p.append(img);
      contentContainer.append(p);
    }

    // Name: <strong> inside .paragraph-xl div
    const nameEl = panel.querySelector('strong');
    let label = '';
    if (nameEl) {
      label = nameEl.textContent.trim();
      const p = document.createElement('p');
      const strong = document.createElement('strong');
      strong.textContent = label;
      p.append(strong);
      contentContainer.append(p);
    }

    // Role: sibling div after the strong's parent div
    const nameParent = nameEl ? nameEl.closest('.paragraph-xl, div') : null;
    const roleEl = nameParent ? nameParent.nextElementSibling : null;
    if (roleEl && roleEl.tagName === 'DIV') {
      const p = document.createElement('p');
      p.textContent = roleEl.textContent.trim();
      contentContainer.append(p);
    }

    // Quote: p.paragraph-xl
    const quoteEl = panel.querySelector('p.paragraph-xl');
    if (quoteEl) {
      const p = document.createElement('p');
      p.textContent = quoteEl.textContent.trim();
      contentContainer.append(p);
    }

    if (label && contentContainer.childNodes.length > 0) {
      cells.push([label, contentContainer]);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'tabs-testimonial', cells });
  element.replaceWith(block);
}

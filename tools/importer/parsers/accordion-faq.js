/* eslint-disable */
/* global WebImporter */
/**
 * Parser for accordion-faq. Base: accordion.
 * Source: https://wknd-trendsetters.pages.dev/
 * Selector: .faq-list
 * Accordion block: 2 columns. Col 1 = question, Col 2 = answer
 */
export default function parse(element, { document }) {
  const cells = [];

  const faqItems = element.querySelectorAll('.faq-item, details, .accordion-item');
  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question, summary, .question, dt, h3');
    const answer = item.querySelector('.faq-answer, .answer, dd, p');

    if (question && answer) {
      cells.push([question.textContent.trim(), answer.textContent.trim()]);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'accordion-faq', cells });
  element.replaceWith(block);
}

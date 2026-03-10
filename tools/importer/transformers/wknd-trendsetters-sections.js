/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: WKND Trendsetters section breaks and section metadata.
 * Inserts <hr> elements between sections and adds Section Metadata blocks
 * for sections that have a style property.
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName !== TransformHook.afterTransform) return;

  const { document } = payload;
  const template = payload.template;
  if (!template || !template.sections || template.sections.length < 2) return;

  const sections = template.sections;

  // Process sections in reverse order to avoid DOM position shifts
  for (let i = sections.length - 1; i >= 0; i--) {
    const section = sections[i];
    const sectionEl = document.querySelector(section.selector);
    if (!sectionEl) continue;

    // Add Section Metadata block if section has a style
    if (section.style) {
      const cells = [['style', section.style]];
      const metaBlock = WebImporter.Blocks.createBlock(document, {
        name: 'Section Metadata',
        cells,
      });
      sectionEl.append(metaBlock);
    }

    // Add <hr> before each non-first section to create section breaks
    if (i > 0) {
      const hr = document.createElement('hr');
      sectionEl.parentNode.insertBefore(hr, sectionEl);
    }
  }
}

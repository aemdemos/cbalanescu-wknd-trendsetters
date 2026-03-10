/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: WKND Trendsetters cleanup.
 * Selectors from captured DOM of https://wknd-trendsetters.pages.dev/
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Remove skip-link (non-authorable accessibility element)
    WebImporter.DOMUtils.remove(element, ['.skip-link']);
  }
  if (hookName === TransformHook.afterTransform) {
    // Remove non-authorable site shell elements
    WebImporter.DOMUtils.remove(element, ['.navbar', 'footer.footer', 'noscript', 'link']);
  }
}

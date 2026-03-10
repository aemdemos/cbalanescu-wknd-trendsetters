var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-homepage.js
  var import_homepage_exports = {};
  __export(import_homepage_exports, {
    default: () => import_homepage_default
  });

  // tools/importer/parsers/hero-landing.js
  function parse(element, { document }) {
    const cells = [];
    const heroImages = element.querySelectorAll(".grid-layout .grid-layout img, .grid-layout img.cover-image");
    if (heroImages.length > 0) {
      const imageContainer = document.createElement("div");
      heroImages.forEach((img) => imageContainer.append(img));
      cells.push([imageContainer]);
    }
    const contentContainer = document.createElement("div");
    const heading = element.querySelector("h1, h2, .h1-heading");
    if (heading) contentContainer.append(heading);
    const subheading = element.querySelector("p.subheading, .subheading");
    if (subheading) contentContainer.append(subheading);
    const ctaLinks = element.querySelectorAll(".button-group a.button");
    ctaLinks.forEach((link) => contentContainer.append(link));
    if (contentContainer.childNodes.length > 0) cells.push([contentContainer]);
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-landing", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-article.js
  function parse2(element, { document }) {
    const cells = [];
    const image = element.querySelector("img");
    const contentContainer = document.createElement("div");
    const breadcrumbLinks = element.querySelectorAll(".breadcrumbs a");
    if (breadcrumbLinks.length > 0) {
      const breadcrumbP = document.createElement("p");
      breadcrumbLinks.forEach((link, i) => {
        if (i > 0) breadcrumbP.append(document.createTextNode("  "));
        breadcrumbP.append(link);
      });
      contentContainer.append(breadcrumbP);
    }
    const heading = element.querySelector("h2, h1");
    if (heading) contentContainer.append(heading);
    const authorContainer = element.querySelector(".flex-horizontal");
    if (authorContainer) {
      const authorP = document.createElement("p");
      const spans = authorContainer.querySelectorAll("span");
      const authorText = Array.from(spans).map((s) => s.textContent.trim()).join(" ");
      authorP.textContent = authorText;
      contentContainer.append(authorP);
    }
    const flexContainers = element.querySelectorAll(".flex-horizontal");
    if (flexContainers.length > 1) {
      const dateP = document.createElement("p");
      const spans = flexContainers[1].querySelectorAll("span");
      const dateText = Array.from(spans).map((s) => s.textContent.trim()).join(" ");
      dateP.textContent = dateText;
      contentContainer.append(dateP);
    }
    const row = [];
    if (image) row.push(image);
    if (contentContainer.childNodes.length > 0) row.push(contentContainer);
    if (row.length > 0) cells.push(row);
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-article", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-gallery.js
  function parse3(element, { document }) {
    const cells = [];
    const images = element.querySelectorAll("img");
    images.forEach((img) => {
      cells.push([img]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-gallery", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/tabs-testimonial.js
  function parse4(element, { document }) {
    const cells = [];
    const tabPanels = element.querySelectorAll(".tab-pane");
    tabPanels.forEach((panel) => {
      const contentContainer = document.createElement("div");
      const img = panel.querySelector("img");
      if (img) {
        const p = document.createElement("p");
        p.append(img);
        contentContainer.append(p);
      }
      const nameEl = panel.querySelector("strong");
      let label = "";
      if (nameEl) {
        label = nameEl.textContent.trim();
        const p = document.createElement("p");
        const strong = document.createElement("strong");
        strong.textContent = label;
        p.append(strong);
        contentContainer.append(p);
      }
      const nameParent = nameEl ? nameEl.closest(".paragraph-xl, div") : null;
      const roleEl = nameParent ? nameParent.nextElementSibling : null;
      if (roleEl && roleEl.tagName === "DIV") {
        const p = document.createElement("p");
        p.textContent = roleEl.textContent.trim();
        contentContainer.append(p);
      }
      const quoteEl = panel.querySelector("p.paragraph-xl");
      if (quoteEl) {
        const p = document.createElement("p");
        p.textContent = quoteEl.textContent.trim();
        contentContainer.append(p);
      }
      if (label && contentContainer.childNodes.length > 0) {
        cells.push([label, contentContainer]);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "tabs-testimonial", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-article.js
  function parse5(element, { document }) {
    const cells = [];
    const cardItems = element.querySelectorAll("a.article-card, .article-card");
    cardItems.forEach((card) => {
      var _a;
      const img = card.querySelector("img");
      const contentContainer = document.createElement("div");
      const tag = card.querySelector(".tag");
      if (tag) {
        const p = document.createElement("p");
        p.textContent = tag.textContent.trim();
        contentContainer.append(p);
      }
      const dateEl = card.querySelector(".article-card-meta .paragraph-sm");
      if (dateEl) {
        const p = document.createElement("p");
        p.textContent = dateEl.textContent.trim();
        contentContainer.append(p);
      }
      const heading = card.querySelector("h3, h2, h4");
      if (heading) contentContainer.append(heading);
      const href = card.getAttribute("href") || ((_a = card.closest("a")) == null ? void 0 : _a.getAttribute("href"));
      if (href) {
        const p = document.createElement("p");
        const link = document.createElement("a");
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
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-article", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/accordion-faq.js
  function parse6(element, { document }) {
    const cells = [];
    const faqItems = element.querySelectorAll(".faq-item, details, .accordion-item");
    faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question, summary, .question, dt, h3");
      const answer = item.querySelector(".faq-answer, .answer, dd, p");
      if (question && answer) {
        cells.push([question.textContent.trim(), answer.textContent.trim()]);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "accordion-faq", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/hero-banner.js
  function parse7(element, { document }) {
    const cells = [];
    const bgImage = element.querySelector("img.cover-image, img");
    if (bgImage) cells.push([bgImage]);
    const contentContainer = document.createElement("div");
    const heading = element.querySelector("h2, h1, .h1-heading");
    if (heading) contentContainer.append(heading);
    const subheading = element.querySelector("p.subheading, .subheading");
    if (subheading) contentContainer.append(subheading);
    const ctaLinks = element.querySelectorAll(".button-group a.button, a.inverse-button");
    ctaLinks.forEach((link) => contentContainer.append(link));
    if (contentContainer.childNodes.length > 0) cells.push([contentContainer]);
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-banner", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/wknd-trendsetters-cleanup.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      WebImporter.DOMUtils.remove(element, [".skip-link"]);
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [".navbar", "footer.footer", "noscript", "link"]);
    }
  }

  // tools/importer/transformers/wknd-trendsetters-sections.js
  var TransformHook2 = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName !== TransformHook2.afterTransform) return;
    const { document } = payload;
    const template = payload.template;
    if (!template || !template.sections || template.sections.length < 2) return;
    const sections = template.sections;
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      const sectionEl = document.querySelector(section.selector);
      if (!sectionEl) continue;
      if (section.style) {
        const cells = [["style", section.style]];
        const metaBlock = WebImporter.Blocks.createBlock(document, {
          name: "Section Metadata",
          cells
        });
        sectionEl.append(metaBlock);
      }
      if (i > 0) {
        const hr = document.createElement("hr");
        sectionEl.parentNode.insertBefore(hr, sectionEl);
      }
    }
  }

  // tools/importer/import-homepage.js
  var PAGE_TEMPLATE = {
    name: "homepage",
    urls: [
      "https://wknd-trendsetters.pages.dev/"
    ],
    description: "Homepage template with hero, featured content, and promotional sections",
    blocks: [
      {
        name: "hero-landing",
        instances: ["header.secondary-section"]
      },
      {
        name: "columns-article",
        instances: ["main section:first-of-type .grid-layout.grid-gap-lg"]
      },
      {
        name: "cards-gallery",
        instances: [".grid-layout.desktop-4-column.grid-gap-sm"]
      },
      {
        name: "tabs-testimonial",
        instances: [".tabs-wrapper"]
      },
      {
        name: "cards-article",
        instances: [".grid-layout.desktop-4-column.grid-gap-md"]
      },
      {
        name: "accordion-faq",
        instances: [".faq-list"]
      },
      {
        name: "hero-banner",
        instances: ["section.inverse-section .utility-position-relative"]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Hero",
        selector: "header.section.secondary-section",
        style: "light",
        blocks: ["hero-landing"],
        defaultContent: []
      },
      {
        id: "section-2",
        name: "Featured Article",
        selector: "main > section:nth-of-type(1)",
        style: null,
        blocks: ["columns-article"],
        defaultContent: []
      },
      {
        id: "section-3",
        name: "Image Gallery",
        selector: "main > section:nth-of-type(2)",
        style: "light",
        blocks: ["cards-gallery"],
        defaultContent: [".utility-text-align-center h2", ".utility-text-align-center .paragraph-lg"]
      },
      {
        id: "section-4",
        name: "Testimonials",
        selector: "main > section:nth-of-type(3)",
        style: null,
        blocks: ["tabs-testimonial"],
        defaultContent: []
      },
      {
        id: "section-5",
        name: "Latest Articles",
        selector: "main > section:nth-of-type(4)",
        style: "light",
        blocks: ["cards-article"],
        defaultContent: [".utility-text-align-center h2", ".utility-text-align-center .paragraph-lg"]
      },
      {
        id: "section-6",
        name: "FAQ",
        selector: "main > section:nth-of-type(5)",
        style: null,
        blocks: ["accordion-faq"],
        defaultContent: [".grid-layout > div:first-child h2", ".grid-layout > div:first-child .subheading"]
      },
      {
        id: "section-7",
        name: "CTA Banner",
        selector: "section.section.inverse-section",
        style: null,
        blocks: ["hero-banner"],
        defaultContent: []
      }
    ]
  };
  var parsers = {
    "hero-landing": parse,
    "columns-article": parse2,
    "cards-gallery": parse3,
    "tabs-testimonial": parse4,
    "cards-article": parse5,
    "accordion-faq": parse6,
    "hero-banner": parse7
  };
  var transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
  function findBlocksOnPage(document, template) {
    const pageBlocks = [];
    template.blocks.forEach((blockDef) => {
      blockDef.instances.forEach((selector) => {
        const elements = document.querySelectorAll(selector);
        if (elements.length === 0) {
          console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
        }
        elements.forEach((element) => {
          pageBlocks.push({
            name: blockDef.name,
            selector,
            element,
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_homepage_default = {
    transform: (payload) => {
      const { document, url, html, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
      pageBlocks.forEach((block) => {
        const parser = parsers[block.name];
        if (parser) {
          try {
            parser(block.element, { document, url, params });
          } catch (e) {
            console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
          }
        } else {
          console.warn(`No parser found for block: ${block.name}`);
        }
      });
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "")
      );
      return [{
        element: main,
        path: path || "/index",
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_homepage_exports);
})();

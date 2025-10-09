export let TAG_PROPERTIES = /*#__PURE__*/function (TAG_PROPERTIES) {
  TAG_PROPERTIES["CHARSET"] = "charset";
  TAG_PROPERTIES["CSS_TEXT"] = "cssText";
  TAG_PROPERTIES["HREF"] = "href";
  TAG_PROPERTIES["HTTPEQUIV"] = "http-equiv";
  TAG_PROPERTIES["INNER_HTML"] = "innerHTML";
  TAG_PROPERTIES["ITEM_PROP"] = "itemprop";
  TAG_PROPERTIES["NAME"] = "name";
  TAG_PROPERTIES["PROPERTY"] = "property";
  TAG_PROPERTIES["REL"] = "rel";
  TAG_PROPERTIES["SRC"] = "src";
  return TAG_PROPERTIES;
}({});
export let ATTRIBUTE_NAMES = /*#__PURE__*/function (ATTRIBUTE_NAMES) {
  ATTRIBUTE_NAMES["BODY"] = "bodyAttributes";
  ATTRIBUTE_NAMES["HTML"] = "htmlAttributes";
  ATTRIBUTE_NAMES["TITLE"] = "titleAttributes";
  return ATTRIBUTE_NAMES;
}({});
export let TAG_NAMES = /*#__PURE__*/function (TAG_NAMES) {
  TAG_NAMES["BASE"] = "base";
  TAG_NAMES["BODY"] = "body";
  TAG_NAMES["HEAD"] = "head";
  TAG_NAMES["HTML"] = "html";
  TAG_NAMES["LINK"] = "link";
  TAG_NAMES["META"] = "meta";
  TAG_NAMES["NOSCRIPT"] = "noscript";
  TAG_NAMES["SCRIPT"] = "script";
  TAG_NAMES["STYLE"] = "style";
  TAG_NAMES["TITLE"] = "title";
  TAG_NAMES["FRAGMENT"] = "Symbol(react.fragment)";
  return TAG_NAMES;
}({});
export const SEO_PRIORITY_TAGS = {
  link: {
    rel: ['amphtml', 'canonical', 'alternate']
  },
  meta: {
    charset: '',
    name: ['generator', 'robots', 'description'],
    property: ['og:type', 'og:title', 'og:url', 'og:image', 'og:image:alt', 'og:description', 'twitter:url', 'twitter:title', 'twitter:description', 'twitter:image', 'twitter:image:alt', 'twitter:card', 'twitter:site']
  },
  script: {
    type: ['application/ld+json']
  }
};
export const VALID_TAG_NAMES = Object.values(TAG_NAMES);

/**
 * The mapping of HTML attribute names to the corresponding element properties,
 * for the names that do not match their corresponding properties.
 */
export const REACT_TAG_MAP = {
  accesskey: 'accessKey',
  charset: 'charSet',
  class: 'className',
  contenteditable: 'contentEditable',
  contextmenu: 'contextMenu',
  'http-equiv': 'httpEquiv',
  itemprop: 'itemProp',
  tabindex: 'tabIndex'
};

/**
 * The mapping reverse of REACT_TAG_MAP.
 */
export const HTML_TAG_MAP = (() => {
  const res = {};
  for (const [key, value] of Object.entries(REACT_TAG_MAP)) {
    res[value] = key;
  }
  return res;
})();
export const HELMET_ATTRIBUTE = 'data-rh';
export const IS_DOM_ENVIRONMENT = !!(typeof window !== 'undefined' && window.document.createElement);
//# sourceMappingURL=constants.js.map
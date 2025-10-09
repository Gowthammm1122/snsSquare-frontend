"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.commitTagChanges = commitTagChanges;
var _constants = require("./constants");
var _utils = require("./utils");
/**
 * Replaces HTML elements previously added to the DOM's head by React Helmet
 * by the set of given elements (tags). For any given element that matches
 * exactly an element already present in the head no actual DOM modification
 * happens, it just keeps already present element. Returns arrays of newly
 * added (newTags) and removed (oldTags) elements.
 */
function updateTags(type, tags) {
  // TODO: Do we really need the fallback here? document.head is supposed to be
  // always defined.
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const headElement = document.head || document.querySelector(_constants.TAG_NAMES.HEAD);
  const tagNodes = headElement.querySelectorAll(`${type}[${_constants.HELMET_ATTRIBUTE}]`);
  const allTags = [];
  const oldTags = [...tagNodes];
  const newTags = [];
  for (const tag of tags) {
    const newElement = document.createElement(type);

    // TODO: Well, the typing within this block is bad, and should be improved.
    for (const [key, value] of Object.entries(tag)) {
      // TODO: Revisit layer.
      // eslint-disable-next-line prefer-object-has-own
      if (Object.prototype.hasOwnProperty.call(tag, key)) {
        const name = _constants.HTML_TAG_MAP[key] ?? key;
        if (name === _constants.TAG_PROPERTIES.INNER_HTML) {
          newElement.innerHTML = value;
        } else if (name === _constants.TAG_PROPERTIES.CSS_TEXT) {
          // TODO: Not sure when this is true?
          // @ts-expect-error "pre-existing"
          if (newElement.styleSheet) {
            // @ts-expect-error "pre-existing"
            newElement.styleSheet.cssText = tag.cssText;
          } else {
            newElement.appendChild(document.createTextNode(tag.cssText));
          }
        } else {
          newElement.setAttribute(name, value ?? '');
        }
      }
    }
    newElement.setAttribute(_constants.HELMET_ATTRIBUTE, 'true');
    const attrs = {};
    for (const {
      name,
      value
    } of newElement.attributes) {
      attrs[name] = value;
    }
    allTags.push(attrs);

    // Remove a duplicate tag from domTagstoRemove, so it isn't cleared.
    for (let i = 0;; ++i) {
      if (newElement.isEqualNode(oldTags[i])) {
        oldTags.splice(i, 1);
        break;
      }
      if (i >= oldTags.length) {
        newTags.push(newElement);
        break;
      }
    }
  }
  oldTags.forEach(tag => tag.parentNode?.removeChild(tag));
  newTags.forEach(tag => headElement.appendChild(tag));

  // TODO: Do we really need this return value anywhere? Especially `oldTags`
  // that have been removed from DOM already?
  return {
    allTags,
    newTags,
    oldTags
  };
}
function updateAttributes(tagName, props) {
  const [elementTag] = document.getElementsByTagName(tagName);
  if (!elementTag) {
    return;
  }
  const helmetAttributeString = elementTag.getAttribute(_constants.HELMET_ATTRIBUTE);
  const helmetAttributes = helmetAttributeString ? helmetAttributeString.split(',') : [];
  const attributesToRemove = [...helmetAttributes];
  const attributeKeys = [];
  for (const prop of Object.keys(props)) {
    // TODO: See a comment below.
    attributeKeys.push(_constants.HTML_TAG_MAP[prop] ?? prop);
  }
  for (const [key, value] of Object.entries(props)) {
    // TODO: Get rid of the mapping later. It is not really needed, as HTML
    // attribute names are case-insensitive. However, our related logic may
    // still be case dependent - we should be careful about it.
    const attr = _constants.HTML_TAG_MAP[key] ?? key;
    if (elementTag.getAttribute(attr) !== value) {
      // TODO: That ?? '' piece is here to keep the legacy behavior for now,
      // I guess later we should prefer to consider attrbiutes with "undefined"
      // value as not set.
      elementTag.setAttribute(attr, value ?? '');
    }
    if (!helmetAttributes.includes(attr)) {
      helmetAttributes.push(attr);
    }
    const indexToSave = attributesToRemove.indexOf(attr);
    if (indexToSave !== -1) {
      attributesToRemove.splice(indexToSave, 1);
    }
  }
  for (let i = attributesToRemove.length - 1; i >= 0; i -= 1) {
    elementTag.removeAttribute(attributesToRemove[i]);
  }
  if (helmetAttributes.length === attributesToRemove.length) {
    elementTag.removeAttribute(_constants.HELMET_ATTRIBUTE);
  } else if (elementTag.getAttribute(_constants.HELMET_ATTRIBUTE) !== attributeKeys.join(',')) {
    elementTag.setAttribute(_constants.HELMET_ATTRIBUTE, attributeKeys.join(','));
  }
}
function updateTitle(title, attributes) {
  if (title !== undefined && document.title !== title) {
    document.title = (0, _utils.flattenArray)(title);
  }
  updateAttributes(_constants.TAG_NAMES.TITLE, attributes);
}
function commitTagChanges(newState, firstRender) {
  const {
    base,
    bodyAttributes,
    defer,
    htmlAttributes,
    links,
    meta,
    noscript,
    onChangeClientState,
    script,
    style,
    title,
    titleAttributes
  } = newState;
  updateAttributes(_constants.TAG_NAMES.BODY, bodyAttributes ?? {});
  updateAttributes(_constants.TAG_NAMES.HTML, htmlAttributes ?? {});
  updateTitle(title, titleAttributes);
  const tagUpdates = {
    baseTag: updateTags(_constants.TAG_NAMES.BASE, base ? [base] : []),
    linkTags: updateTags(_constants.TAG_NAMES.LINK, links ?? []),
    metaTags: updateTags(_constants.TAG_NAMES.META, meta ?? []),
    noscriptTags: updateTags(_constants.TAG_NAMES.NOSCRIPT, noscript ?? []),
    scriptTags: updateTags(_constants.TAG_NAMES.SCRIPT, script ?? []),
    styleTags: updateTags(_constants.TAG_NAMES.STYLE, style ?? [])
  };
  const resultTags = {
    baseTag: [],
    bodyAttributes: {},
    defer: defer ?? false,
    htmlAttributes: {},
    linkTags: [],
    metaTags: [],
    noscriptTags: [],
    onChangeClientState: onChangeClientState ?? (() => undefined),
    scriptTags: [],
    styleTags: [],
    title: title ?? '',
    titleAttributes: {}
  };
  const addedTags = {};
  const removedTags = {};
  Object.keys(tagUpdates).forEach(tagType => {
    const {
      allTags,
      newTags,
      oldTags
    } = tagUpdates[tagType];
    resultTags[tagType] = allTags;
    if (newTags.length) {
      addedTags[tagType] = newTags;
    }
    if (oldTags.length) {
      removedTags[tagType] = tagUpdates[tagType].oldTags;
    }
  });
  if (firstRender || Object.keys(addedTags).length || Object.keys(removedTags).length) {
    onChangeClientState?.(resultTags, addedTags, removedTags);
  }
}
//# sourceMappingURL=client.js.map
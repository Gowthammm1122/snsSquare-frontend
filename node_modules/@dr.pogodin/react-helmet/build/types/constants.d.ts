export declare enum TAG_PROPERTIES {
    CHARSET = "charset",
    CSS_TEXT = "cssText",
    HREF = "href",
    HTTPEQUIV = "http-equiv",
    INNER_HTML = "innerHTML",
    ITEM_PROP = "itemprop",
    NAME = "name",
    PROPERTY = "property",
    REL = "rel",
    SRC = "src"
}
export declare enum ATTRIBUTE_NAMES {
    BODY = "bodyAttributes",
    HTML = "htmlAttributes",
    TITLE = "titleAttributes"
}
export declare enum TAG_NAMES {
    BASE = "base",
    BODY = "body",
    HEAD = "head",
    HTML = "html",
    LINK = "link",
    META = "meta",
    NOSCRIPT = "noscript",
    SCRIPT = "script",
    STYLE = "style",
    TITLE = "title",
    FRAGMENT = "Symbol(react.fragment)"
}
export declare const SEO_PRIORITY_TAGS: {
    link: {
        rel: string[];
    };
    meta: {
        charset: string;
        name: string[];
        property: string[];
    };
    script: {
        type: string[];
    };
};
export declare const VALID_TAG_NAMES: TAG_NAMES[];
/**
 * The mapping of HTML attribute names to the corresponding element properties,
 * for the names that do not match their corresponding properties.
 */
export declare const REACT_TAG_MAP: Record<string, string>;
/**
 * The mapping reverse of REACT_TAG_MAP.
 */
export declare const HTML_TAG_MAP: Record<string, string>;
export declare const HELMET_ATTRIBUTE = "data-rh";
export declare const IS_DOM_ENVIRONMENT: boolean;

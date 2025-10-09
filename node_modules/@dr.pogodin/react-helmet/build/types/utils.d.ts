import type { AggregatedState, BaseProps, HelmetPropArrays, HelmetPropObjects, HelmetProps, PropArrayItem, RegisteredHelmetPropsArray } from './types';
type PropList = Record<string, any>;
type AttributeList = string[];
type MatchProps = Record<string, string | AttributeList>;
export declare function getTitleFromPropsList(props: RegisteredHelmetPropsArray): string | undefined;
/**
 * Merges together attributes provided for the same element by different Helmet
 * instances. Attributes provided by later registered Helmet instances overwrite
 * the same attributes provided by the earlier registered instances.
 */
export declare function mergeAttributes<T extends keyof HelmetPropObjects>(element: T, props: RegisteredHelmetPropsArray): HelmetProps[T];
/**
 * Finds the latest registered Helmet instance with `base` props provided,
 * and with its `href` value set, and returns those `base` props.
 * NOTE: Based on the legacy getBaseTagFromPropsList().
 */
export declare function aggregateBaseProps(props: RegisteredHelmetPropsArray): BaseProps | undefined;
export declare function getTagsFromPropsList<T extends keyof HelmetPropArrays>(tagName: T, primaryAttributes: Array<keyof PropArrayItem<T>>, propsArray: RegisteredHelmetPropsArray): HelmetPropArrays[T];
export declare function flattenArray(possibleArray: string[] | string): string;
export declare function prioritizer<T extends keyof HelmetPropArrays>(propsArray: HelmetPropArrays[T], propsToMatch: MatchProps): {
    default: Array<PropArrayItem<T>>;
    priority: Array<PropArrayItem<T>>;
};
export declare const without: (obj: PropList, key: string) => PropList;
/**
 * Clones given props object deep enough to make it safe to push new items
 * to its array values, and re-assign its non-array values, without a risk
 * to mutate any externally owned objects.
 */
export declare function cloneProps(props: HelmetProps): HelmetProps;
/**
 * Merges `source` props into `target`, mutating the `target` object.
 */
export declare function mergeProps(target: HelmetProps, source: HelmetProps): void;
/**
 * Adds given item to the specified prop array inside `target`.
 * It mutates the target.
 */
export declare function pushToPropArray<K extends keyof HelmetPropArrays>(target: HelmetProps, array: K, item: Exclude<HelmetPropArrays[K], undefined>[number]): void;
export declare function calcAggregatedState(props: RegisteredHelmetPropsArray): AggregatedState;
export declare function propToAttr(prop: string): string;
export {};

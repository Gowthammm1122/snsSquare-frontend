import { type FunctionComponent, type ReactNode } from 'react';
import type { ContextValue, HelmetDataContext } from './types';
export declare const Context: import("react").Context<ContextValue | undefined>;
type ProviderProps = {
    children?: ReactNode;
    context?: HelmetDataContext;
};
declare const HelmetProvider: FunctionComponent<ProviderProps>;
export default HelmetProvider;

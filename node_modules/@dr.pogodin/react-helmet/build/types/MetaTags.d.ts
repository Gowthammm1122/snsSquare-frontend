import { type Context as ContextT, type FunctionComponent, type ReactNode } from 'react';
type PropsT = {
    children?: ReactNode;
    description: string;
    extraMetaTags?: Array<{
        content: string;
        name: string;
    }>;
    image?: string;
    siteName?: string;
    socialDescription?: string;
    socialTitle?: string;
    title: string;
    url?: string;
};
/**
 * Auxiliary wrapper around "react-helmet", which helps to inject meta tags
 * (page title, a brief content description, and social media thumbnails) into
 * generated pages.
 */
declare const MetaTags: FunctionComponent<PropsT> & {
    Context: ContextT<PropsT>;
};
export default MetaTags;

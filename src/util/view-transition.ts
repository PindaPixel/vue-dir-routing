type ViewTransition = {
    /**A Promise that fulfills once the transition animation is finished, and the new page view is visible and interactive to the user. */
    finished: Promise<void>;
    /** A Promise that fulfills once the pseudo-element tree is created and the transition animation is about to start. */
    ready: Promise<void>;
    /** A Promise that fulfills when the promise returned by the document.startViewTransition()'s callback fulfills. */
    updateCallbackDone: Promise<void>;
    /** Skips the animation part of the view transition, but doesn't skip running the document.startViewTransition() callback that updates the DOM. */
    skipTransition: () => void;
}

type ObjectWithStartViewTransition = { 
    startViewTransition: (updateDom: (() => void) | (() => Promise<void>)) => ViewTransition 
} 

export function viewTransitionSupported(document: Document)
    : document is Document & ObjectWithStartViewTransition  
{
    return 'startViewTransition' in document;
}
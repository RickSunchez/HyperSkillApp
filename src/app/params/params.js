export const params = {
    defaultObserverConfig: {childList: true, subtree: true},
    ckeToolType: {
        'button': 0,
        'combo': 1
    },
    ckeActionType: {
        'insertText': 0,
        'frameText': 1,
        'frameHtml': 2
    },
    stepikUrlTypes: {
        stepUrl: new RegExp('\/edit-lesson\/\\d+\/step\/\\d+', 'i'),
        newStepUrl: new RegExp('\/edit-lesson\/\\d+\/step\/new', 'i'),
    }
};
import ckeditorHandler from "../ckeditorHandler";

const handler = new ckeditorHandler();

export function ckeFrameWithHtml(tagName, className=null, onReset=false) {
    const resetNeed = handler.ckeFrameRangeWithHTML(tagName, className);

    if (resetNeed && onReset) {
        handler.ckeReloadEditor();
    }
}
import ckeditorHandler from "../ckeditorHandler";

const handler = new ckeditorHandler();

export function ckeInsertText(text) {
    handler.ckeInsertText(text);
}
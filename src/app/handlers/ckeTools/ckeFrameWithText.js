import ckeditorHandler from "../ckeditorHandler";

const handler = new ckeditorHandler();

export function ckeFrameWithText(before, after) {
    handler.ckeFrameRangeWithText(before, after);
}
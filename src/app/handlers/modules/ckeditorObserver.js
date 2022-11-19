import subscribeObserver from "../../common/subscribeObserver";
import { params } from "../../params/params";

export default class ckeditorObserver extends subscribeObserver
{
    constructor() {
        super();
        
        this.__node = document;
        this.__config = params.defaultObserverConfig;

        this.onCkeditorPrevious = false;
        this.__observer = new MutationObserver(this.observerHandler.bind(this))
    }

    observerHandler(mutations) {
        var onCkeditor = 'CKEDITOR' in window;

        if (onCkeditor && !this.onCkeditorPrevious) {
            this.execSubscribers();
        }

        this.onCkeditorPrevious = onCkeditor;
    }
}
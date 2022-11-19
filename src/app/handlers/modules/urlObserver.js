import subscribeObserver from "../../common/subscribeObserver";
import { params } from "../../params/params";

export default class urlObserver extends subscribeObserver
{
    constructor() {
        super();

        this.__previousUrlType = '';

        this.__node = document;
        this.__config = params.defaultObserverConfig;
        this.__observer = new MutationObserver(this.__observerHandler.bind(this));
    }

    __observerHandler() {
        if (this.__examUrl()) {
            this.execSubscribers();
        }
    }

    __examUrl() {
        const url = document.location.href;
        var urlType = this.__urlType(url);
        var result = false;

        const onUrl = urlType != this.__previousUrlType;
        const isUrl = urlType == 'stepUrl';

        if (onUrl && isUrl) {
            result = true;
        }

        this.__previousUrlType = urlType;

        return result;
    }

    __urlType(url) {
        for (var type in params.stepikUrlTypes) {
            let mask = params.stepikUrlTypes[type];
            if (mask.test(url)) {
                return type;
            }
        }

        return 'common';
    }
}

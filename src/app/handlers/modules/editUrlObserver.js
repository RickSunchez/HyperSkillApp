export default class editUrlObserver {
    constructor() {
        this.__config = {childList: true, subtree: true};
        this.urlEdit = {
            'name': 'edit',
            'mask': new RegExp(/.*\/edit-lesson\/\d+\/step\/\d+/)
        };
        this.urlNewStep = {
            'name': 'new',
            'mask': new RegExp(/.*\/edit-lesson\/\d+\/step\/new/)
        }
        this.urlTypes = [this.urlEdit, this.urlNewStep];
        this.subscribers = {};
        this.previousUrl = '';
        const _this = this;
        
        this.__observer = new MutationObserver(function() {
            if (_this.__urlIsSuitable()) {
                for (let subId in _this.subscribers) {
                    _this.subscribers[subId]();
                }
            }
        });
    }

    observe() {
        return this.__observer.observe(document, this.__config);
    }

    disconnect() {
        return this.__observer.disconnect();
    }

    subscribe(func) {
        const id = this.__subId();
        this.subscribers[id] = func;
        return id
    }

    unsubscribe(funcId) {
        delete this.subscribers[funcId];
    }

    __subId() {
        const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789';
        var id = '';

        for (let i=0; i<5; i++) {
            id += alphabet.charAt(Math.floor(Math.random() * alphabet.length))
        }

        return id;
    }

    __urlIsSuitable() {
        const previousUrlType = this.__getUrlType(this.previousUrl);
        const currentUrlType = this.__getUrlType(location.href);

        this.previousUrl = location.href;

        if (previousUrlType != this.urlEdit.name && currentUrlType == this.urlEdit.name) {
            return true;
        }

        return false;
    }

    __getUrlType(url) {
        for (let type of this.urlTypes) {
            if (type.mask.test(url)) {
                return type.name;
            }
        }

        return 'undefined';
    }
}
export default class subscribeObserver
{
    observe() {
        return this.__observer.observe(this.__node, this.__config);
    }

    disconnect() {
        return this.__observer.disconnect();
    }

    subscribe(callback) {
        if (typeof this.__subscribers != 'object') {
            this.__subscribers = {};
        }

        if (typeof callback != 'function') {
            return false;
        }

        const callbackId = this.__subId();
        this.__subscribers[callbackId] = callback;
        
        return callbackId;
    }

    unsubscribe(callbackId) {
        delete this.__subscribers[callbackId];
    }

    execSubscribers() {
        if (this.__subscribers) {
            for (let callbackId in this.__subscribers) {
                this.__subscribers[callbackId]();
            }
        }
    }

    __subId() {
        const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789';
        var callbackId = '';

        for (let i=0; i<5; i++) {
            callbackId += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        }

        return callbackId;
    }
}
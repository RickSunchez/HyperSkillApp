import ckeditorObserver from './modules/ckeditorObserver';
import ckeditorProxy from './modules/ckeditorProxy';

// @TODO: развести логику элемента
// - поиск элемента (вынести в app.js??)
// - вспомогательные инструменты CKEDITOR

export default class ckeditorWaiter {
    constructor() {
        this.ckeditorObserver = new ckeditorObserver();
        this.ckeditorProxy = new ckeditorProxy();

        // я хз какое из свойств прилетает раньше, по этому тут два промиса))
        // надо чтобы были загружены: 
        // CKEDITOR.instances
        // CKEDITOR.skin

        const _this = this;
        this.__promises = [
            new Promise(function (resolve) {
                _this.ckeditorProxy.resolver.push(resolve);
            }),
            new Promise(function (resolve) {
                _this.ckeditorProxy.resolver.push(resolve);
            })
        ];
    }

    // observer
    handle(params={toolbars:[], onEditor: null, onInstance: null}) {
        this.params = params;
        Promise.all(this.__promises).then(this.params.onInstance);

        this.ckeditorObserver.subscribe(this.__proxy.bind(this));
        this.ckeditorObserver.observe();
    }

    __proxy() {
        this.ckeditorProxy.addStepikToolBars(
            this.params.toolbars,
            this.params.onEditor
        );

        this.ckeditorObserver.disconnect();
    }
}
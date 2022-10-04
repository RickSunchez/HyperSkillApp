import editUrlObserver from  './modules/editUrlObserver';
import ckeditorObserver from './modules/ckeditorObserver';
import ckeditorProxy from './modules/ckeditorProxy';

export default class ckeditorHandler {
    constructor() {
        this.ckeditorObserver = new ckeditorObserver();
        this.editUrlObserver = new editUrlObserver();
        this.ckeditorProxy = new ckeditorProxy();
    }

    // observer
    observe(tollbars, callback) {
        this.toolbars = tollbars;
        this.callback = callback;

        this.ckeditorObserver.subscribe(this.__proxy.bind(this));

        if (location.hostname.indexOf('stepik') >= 0) {
            this.editUrlObserver.subscribe((function() {
                this.ckeditorObserver.observe();
            }).bind(this));

            this.editUrlObserver.observe();
        } else {
            this.ckeditorObserver.observe();
        }
    }

    disconnect() {
        this.ckeditorObserver.disconnect();
        this.editUrlObserver.disconnect();
    }

    __proxy() {
        this.callback(
            this.ckeditorProxy.addStepikToolBars(this.toolbars)
        );
    }

    // tools
    ckeInsertText(text) {
        const editor = this.__ckeFocus();
        if (editor === null) {
            return null;
        }

        editor.insertText(text);
    }

    ckeFrameRangeWithText(before, after) {
        const editor = this.__ckeFocus();
        if (editor === null) {
            return null;
        }

        const range = this.__ckeGetRange();
        const textNode = editor.document.createElement("text");

        textNode.append(new CKEDITOR.dom.element(document.createTextNode(before)));
        textNode.append(range.cloneContents());
        textNode.append(new CKEDITOR.dom.element(document.createTextNode(after)));

        editor.insertElement(textNode);
        editor.resetDirty();
    }

    // тут пока смотрим по единственному className
    // больше пока вроде не надо
    // тут довольно просто применить фрейм к элементу, но сложно обратно
    ckeFrameRangeWithHTML(tagName, className=null) { // with switch
        const editor = this.__ckeFocus();
        if (editor === null) {
            return null;
        }

        const range = this.__ckeGetRange();

        // тут смотрим, если выделенный range уже оформлен в нужный html
        var childs = range.cloneContents().getChildren();
        var isSetup = false;
        var textContent = '';
        for (let i=0; i<childs.count(); i++) {
            let childHTML = childs.getItem(i).$.innerHTML;
            if (childHTML) {
                if (className && (childHTML.indexOf(className) >= 0)) {
                    isSetup = true;
                    let tmp = document.createElement("span");
                    tmp.innerHTML = childHTML;
                    textContent += tmp.textContent;
                }
            }
        }

        var htmlNode;

        if (isSetup) {
            htmlNode = editor.document.createElement("text");
            htmlNode.appendText(textContent);
        } else {
            htmlNode = editor.document.createElement(tagName);
            htmlNode.$['className'] = className;
            htmlNode.append(range.cloneContents());
        }

        editor.insertElement(htmlNode);
        editor.resetDirty();

        return !isSetup;
    }

    ckeReloadEditor() {
        const editor = this.__getEditor();
        if (editor === null) {
            return null;
        }

        // на самом деле это тоже костыль
        // тут переключается режим просмотра в редакторе
        // но, некоторые элементы необходимо обновлять для просмотра
        editor.setMode("source", function() { editor.setMode("wysiwyg"); });
    }

    __ckeGetRange() {
        const editor = this.__ckeFocus();
        if (editor === null) {
            return null;
        }

        return editor.getSelection().getRanges()[0];
    }

    __ckeFocus() {
        const editor = this.__getEditor();
        if (editor === null) {
            return null;
        }

        editor.focus();
        
        return editor;
    }

    __getEditor() {
        const instanceId = this.__getCkeditorInstanceId();
        if (instanceId === null) {
            return null;
        }

        return window.CKEDITOR.instances[instanceId];
    }

    __getCkeditorInstanceId() {
        if (window.CKEDITOR) {
            return Object.keys(window.CKEDITOR.instances)[0];
        } else {
            return null;
        }
    }
}
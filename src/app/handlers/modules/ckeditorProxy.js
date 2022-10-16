import modelBuilder from "../../builders/modelBuilder";
import { ckeToolbarModel } from "../../models/ckeToolbarModel";

export default class ckeditorProxy
{
    constructor() {
        this.toolbars = null;
        this.modelBuilder = new modelBuilder;
        this.resolver = [];
    }

    addStepikToolBars(newToolbars, instanceCallback) {
        for (let mode in newToolbars) {
            for (let toolbar in newToolbars[mode]) {
                for (let tool of newToolbars[mode][toolbar]) {
                    tool = this.modelBuilder.build(ckeToolbarModel, tool);
                }
            }
        }

        this.toolbars = newToolbars;
        this.instanceCallback = instanceCallback;

        this.__ckeEditorConfArgsProxy();
        this.__ckeInstanceProxy();

        return this.toolbars;
    }

    __resolve() {
        if (this.resolver.length == 0) {
            return false;
        }
        const resolve = this.resolver.pop();
        resolve();
    }

    // global CKEDITOR
    __ckeReplaceProxy() {
        CKEDITOR.replace = new Proxy(CKEDITOR.replace, {
            apply(target, thisArg, args) {
                // can modify `args`
                return target.apply(thisArg, args);
            }
        })
    }

    __ckeEditorConfArgsProxy() {
        const _this = this;

        // подписываемся на редактор
        CKEDITOR = new Proxy(CKEDITOR, {
            // на изменение свойств редактора
            set(target, prop, val) {
                val = _this.__produceCKEDITOR(target, prop, val);
                target[prop] = val;

                return true;
            }
        })
    }

    // ищем свойство editorConfig
    __produceCKEDITOR(target, prop, val) {
        const _this = this;
        target[prop] = val;

        // подписываемся на изменения аргумента, передаваемого в editorConfig
        if (prop == 'editorConfig') {
            // это функция, так что тут apply
            target[prop] = new Proxy(target[prop], {
                apply(target, thisArg, args) {
                    // подписываемся на аргумент
                    args[0] = new Proxy(args[0], {
                        // и вот тут интересующее нас свойство
                        set(target, prop, val) {
                            val = _this.__produceConfig(target, val, prop);
                            
                            target[prop] = val;
                            return true;
                        }
                    })

                    return target.apply(thisArg, args);
                }
            })
        }

        if (prop == 'skinName') {
            this.__resolve();
        }

        return target[prop];
    }

    __produceConfig(target, val, prop) {  
        if (this.toolbars['new']) {
            // @TODO: add new tools
            // хз надо проверять
            // for (let key in this.toolbars['new']) {
            //     if (!(key in target)) {
            //         target[key] = this.toolbars['new'][key];
            //     }
            // }
        }
        if (this.toolbars['append']) {
            if (prop in this.toolbars['append']) {
                val = this.__mergeObjects(val, this.toolbars['append'][prop]);
            }
        }
        return val;
    }

    __ckeInstanceProxy() {
        const _this = this;

        CKEDITOR.instances = new Proxy(CKEDITOR.instances, {
            set(target, prop, val) {
                target[prop] = val;
                _this.instanceCallback();
                _this.__resolve();
                return true;
            }
        })
    }

    // HELPERS

    __mergeObjects(source, additional) {
        for (let toolGroup of additional) {
            let elem = source.filter(function(tg) {
                return tg.name == toolGroup.name;
            })[0];
            
            if (elem) {
                for (let key in toolGroup) {
                    if (key == 'name') {
                        continue;
                    }

                    if (key in elem) {
                        // @TODO add action if new params included
                    } else {
                        elem[key] = toolGroup[key];
                    }
                }
            } else {
                source.push(toolGroup);
            }
        }

        return source;
    }
}
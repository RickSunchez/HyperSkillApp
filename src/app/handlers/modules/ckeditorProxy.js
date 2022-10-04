import modelBuilder from "../../builders/modelBuilder";
import { ckeToolbarModel } from "../../models/ckeToolbarModel";

export default class ckeditorProxy
{
    constructor() {
        this.toolbar = null;
        this.modelBuilder = new modelBuilder;
    }

    addStepikToolBars(newToolbars) {
        for (let tool of newToolbars) {
            tool = this.modelBuilder.build(ckeToolbarModel, tool);
        }
        this.toolbars = newToolbars;

        this.__ckeEditorConfArgsProxy();

        return this.toolbars;
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
                target[prop] = val;
                // ищем свойство editorConfig
                if (prop == 'editorConfig') {
                    // подписываемся на изменения аргумента, передаваемого в
                    // editorConfig (это функция, так что тут apply)
                    target[prop] = new Proxy(target[prop], {
                        apply(target, thisArg, args) {
                            // подписываемся на аргумент
                            args[0] = new Proxy(args[0], {
                                // и вот тут интересующее нас свойство
                                set(target, prop, val) {
                                    if (prop == 'toolbar_StepEditToolbar') {
                                        if (_this.toolbar) {
                                            val.concat(_this.toolbars);
                                        }
                                    }
                                    target[prop] = val;
                                    return true;
                                }
                            })

                            return target.apply(thisArg, args);
                        }
                    })
                }
                
                return true;
            }
        })
    }
}
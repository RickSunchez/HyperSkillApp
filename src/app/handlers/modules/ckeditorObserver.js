import subscribeObserver from "../../common/subscribeObserver";
import { params } from "../../consts/consts";

export default class ckeditorObserver extends subscribeObserver
{
    constructor() {
        super();
        this.__config = params.default_observer_config;
        const _this = this;

        this.__observer = new MutationObserver(function(mutations) {
            mutations.some(function() {
                if (window.CKEDITOR) {
                    _this.disconnect();
                    _this.execSubscribers();

                    return true;
                }
            });
        })
    }

    observe() {
        return this.__observer.observe();
    }

    disconnect() {
        return this.__observer.disconnect();
    }
}

//  class ckeditorObserver1 {
//     constructor() {
//         this.__config = {childList: true, subtree: true};

//         const _this = this;

//         this.__observer = new MutationObserver(function(mutations) {
//             mutations.some(function() {
//                 if (window.CKEDITOR) {
//                     _this.disconnect();
//                     _this.callback();

//                     // if (!_this.proxyIsSet) {
//                     //     _this.proxyIsSet = true;

//                     //     // подписываемся на создание объекта
//                     //     CKEDITOR.replace = new Proxy(CKEDITOR.replace, {
//                     //         apply(target, thisArg, args) {
//                     //             console.log(args);

//                     //             return target.apply(thisArg, args);
//                     //         }
//                     //     })

//                     //     // подписываемся на редактор
//                     //     CKEDITOR = new Proxy(CKEDITOR, {
//                     //         // на изменение свойств редактора
//                     //         set(target, prop, val) {
//                     //             target[prop] = val;
//                     //             // ищем свойство editorConfig
//                     //             if (prop == 'editorConfig') {
//                     //                 // подписываемся на изменения аргумента, передаваемого в
//                     //                 // editorConfig (это функция, так что тут apply)
//                     //                 target[prop] = new Proxy(target[prop], {
//                     //                     apply(target, thisArg, args) {
//                     //                         // подписываемся на аргумент
//                     //                         args[0] = new Proxy(args[0], {
//                     //                             // и вот тут интересующее нас свойство
//                     //                             set(target, prop, val) {
//                     //                                 if (prop == 'toolbar_StepEditToolbar') {
//                     //                                     console.log(val);
//                     //                                 }
//                     //                                 target[prop] = val;
//                     //                                 return true;
//                     //                             }
//                     //                         })
            
//                     //                         return target.apply(thisArg, args);
//                     //                     }
//                     //                 })
//                     //             }
                                
//                     //             return true;
//                     //         }
//                     //     })
//                     // }

//                     // let keys = Object.keys(window.CKEDITOR.instances);
//                     // if (keys.length > 0) {
//                     //     const ckeditorNode = document.querySelector('#cke_' + keys[0]);
//                     //     if (ckeditorNode) {
//                     //         _this.disconnect();
//                     //         _this.callback(ckeditorNode);

//                     //         return true;
//                     //     }
//                     // }
//                 }
//             })
//         });
//     }

//     observe(callback) {
//         this.callback = callback;
//         return this.__observer.observe(document, this.__config);
//     }

//     disconnect() {
//         return this.__observer.disconnect();
//     }

//     subscribe(func) {
//         const id = this.__subId();
//         this.subscribers[id] = func;
//         return id
//     }

//     unsubscribe(funcId) {
//         delete this.subscribers[funcId];
//     }
// }
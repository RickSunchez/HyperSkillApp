import ckeditorHandler from './handlers/ckeditorHandler';
import hseAppBuilder from './builders/hseAppBuilder';

export default class App {
    constructor() {
        this.ckeditorHandler = new ckeditorHandler();
        this.hseAppBuilder = new hseAppBuilder();
    }

    start(config) {
        this.ckeditorHandler.observe(config.toolbars, this.initApp.bind(this));
    }

    initApp(editorNode) {
        this.hseAppBuilder.build(editorNode);
    }
}
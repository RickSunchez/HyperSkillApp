import ckeditorWaiter from './handlers/ckeditorWaiter';
import ckeditorHandler from './handlers/ckeditorHandler';
import configRepository from './repositories/configRepository';
import toolModelBuilder from './modelBuilders/toolModelBuilder';
import { params } from './params/params';
import urlObserver from './handlers/modules/urlObserver';

export default class App {
    constructor(config) {
        this.ckeditorWaiter = new ckeditorWaiter();
        this.urlObserver = new urlObserver();
        this.configRepository = new configRepository(config);
    }

    start() {
        this.urlObserver.subscribe(this.init.bind(this));
        this.urlObserver.observe();
    }

    init() {
        this.ckeditorWaiter.handle({
            toolbars: this.configRepository.getToolbars(),
            onEditor: this.onCKEDITOR.bind(this),
            onInstance: this.onInstance.bind(this)
        });
    }

    onCKEDITOR() {
        console.log('CKEDITOR init');
    }

    onInstance() {
        console.log('CKEDITOR instanse init');
        var toolGroups = this.configRepository.getToolGroups();
        if (!toolGroups) {
            return false;
        }
        
        const ckeHandler = new ckeditorHandler();

        for (let toolGroup of toolGroups) {
            let tools = this.configRepository.getTools(toolGroup);
            if (!tools) {
                continue;
            }

            for (let toolName in tools) {
                let toolModel = toolModelBuilder(toolGroup, toolName, tools[toolName]);
                switch (tools[toolName]['type']) {
                    case params.ckeToolType.button:
                        ckeHandler.addButton(toolModel.name, toolModel.definition);
                        break;
                    case params.ckeToolType.combo:
                        ckeHandler.addCombo(toolModel.name, toolModel.definition);
                        break;
                }
            } 
        }
    }
}
import ckeditorHandler from "../handlers/ckeditorHandler";
import { params } from "../params/params";

export default function toolModelBuilder(toolGroup, toolName, args) {
    switch (args.type) {
        case params.ckeToolType.button:
            return __buildButtonModel(toolGroup, toolName, args.options);
        case params.ckeToolType.combo:
            return __buildComboModel(toolGroup, toolName, args.options);
        default:
            return null;
    }
}

function __buildButtonModel(toolGroup, toolName, args) {
    const ckeHandler = new ckeditorHandler();
    var command = ckeHandler.addCommand(params.ckeToolType.button, args.args.text);

    return {
        name: toolName,
        definition: {
            label: args.label,
            toolbar: `${toolGroup},${args.position}`,
            icon: args.icon || 'Button',
            command: command
        }
    }
}

function __buildComboModel(toolGroup, toolName, args) {
    const ckeHandler = new ckeditorHandler();

    return {
        name: toolName,
        definition: {
            label: args.label,
            title: args.title,
            multiSelect: false,
            toolbar: `${toolGroup},${args.position}`,
            panel: {
                css: ckeHandler.getStyles()
            },
            init: function() {
                for (let option of args.options) {
                    switch (option.type) {
                        case 'label':
                            this.startGroup(option.title);
                            break;
                        case 'item':
                            this.add(option.value, option.title, option.label);
                            break;
                    }
                }
            },
            onClick: __comboFunction(args.action, ckeHandler)
        }
    }
}

function __comboFunction(type, ckeHandler) {
    switch (type) {
        case params.ckeActionType.frameHtml:
            return function(value) {
                // @TODO: add html frame command
                console.log(type, value)
            }
        case params.ckeActionType.frameText:
            return function(value) {
                var borders = value.split(',');
                ckeHandler.frameText(borders[0] || '', borders[1] || '');
            }
        case params.ckeActionType.insertText:
            return function(value) {
                ckeHandler.insertText(value);
            }
    }
    
}
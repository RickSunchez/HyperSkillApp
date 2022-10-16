import modelBuilder from "../builders/modelBuilder";
import { ckeButtonModel } from "../models/ckeButtonModel";
import { params } from "../params/params";

export default class ckeditorHandler
{
    constructor() {
        this.editor = this.__getEditor();
        this.modelBuilder = new modelBuilder();
        this.insertTextCounter = 0;
    }

    // ui
    addButton(name='', definition={}) {
        this.editor.ui.addButton(name, definition);
    }

    addCombo(name='', definition={}) {
        this.editor.ui.addRichCombo(name, definition)
    }

    // editor
    insertText(text) {
        this.editor.insertText(text);
    }

    frameText(before, end) {
        var selection = this.editor.getSelection().getNative();
        var text = before + selection + end;

        this.insertText(text);
    }

    getStyles() {
        return [CKEDITOR.skin.getPath('editor')].concat(this.editor.config.contentsCss);
    }

    addCommand(type, args) {
        switch (type) {
            case params.ckeToolType.button:
                return this.__addInsertTextCommand(args);
            case params.ckeToolType.combo:
                return this.__buildComboModel(toolGroup, toolName, args.options);
            default:
                return null;
        }
    }

    // handler
    buildToolModel(toolGroup, toolName, args) {
        switch (args.type) {
            case params.ckeToolType.button:
                return this.__buildButtonModel(toolGroup, toolName, args.options);
            case params.ckeToolType.combo:
                return this.__buildComboModel(toolGroup, toolName, args.options);
            default:
                return null;
        }
    }

    // HELPERS

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

    __buildButtonModel(toolGroup, toolName, args) {
        var command = '';
        switch (args.action) {
            case params.ckeActionType.insertText:
                command = this.__addInsertTextCommand(args.args.text);
                break;
            case params.ckeActionType.frameText:
                break;
            case params.ckeActionType.frameHtml:
                break;
            default:
                break;
        }

        return this.modelBuilder.build(ckeButtonModel, {
            name: toolName,
            label: args.label,
            toolbar: `${toolGroup},${args.position}`,
            icon: args.icon || 'Button',
            command: command
        });
    }

    __addInsertTextCommand(text) {
        const commandName = 'hse-insertText-' + this.insertTextCounter;
        this.insertTextCounter++;

        this.editor.addCommand(commandName, {
            exec: function( editor ) {
                editor.insertText(text);
            }
        });

        return commandName;
    }
}
import { params } from '../consts/consts';
import ckeToolGroup from '../views/ckeToolGroup';
import ckeButton from '../views/ckeButton';
import modelBuilder from './modelBuilder';
import { ckeButtonModel } from '../models/ckeButtonModel';
import { ckeInsertText } from '../handlers/ckeTools/ckeInsertText';
import { ckeFrameWithHtml } from '../handlers/ckeTools/ckeFrameWithHtml';
import { ckeFrameWithText } from '../handlers/ckeTools/ckeFrameWithText';

export default class hseAppBuilder {
    constructor() {
        this.__hseSelector = 'hse-ext-app';
        this.editorNode = undefined;
        this.modelBuilder = new modelBuilder();
    }

    build(editorNode) {
        this.editorNode = editorNode;

        const toolbox = this.__getToolBox();

        if (this.__hseIsSetup(toolbox)) {
            return;
        }
        
        this.__createHseNode(toolbox);
    }

    __getToolBox() {
        return this.editorNode.querySelector(params['toolbox_selector']);
    }

    __hseIsSetup(parent) {
        const hseNode = parent.querySelector('#' + this.__hseSelector);
        return hseNode ? true : false;
    }

    __createHseNode(parent) {
        const hseToolGroup = new ckeToolGroup();
        
        hseToolGroup.addTool(
            new ckeButton(
                this.modelBuilder.build(
                    ckeButtonModel, 
                    {
                        caption: '—',
                        title: 'Em Dash',
                        callback: function() { ckeInsertText('—'); }
                    })
                ),
            new ckeButton(
                this.modelBuilder.build(
                    ckeButtonModel, 
                    {
                        caption: '[/]',
                        title: 'Frame text',
                        callback: function() { ckeFrameWithText('[]', '[/]') }
                    })
                ),
            new ckeButton(
                this.modelBuilder.build(
                    ckeButtonModel, 
                    {
                        caption: 'TeX',
                        title: 'Convert text to math formula',
                        callback: function() { ckeFrameWithHtml('span', 'math-tex', true) }
                    })
                ),
        );

        hseToolGroup.render(parent);
    }
}
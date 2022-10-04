export default class ckeButton {
    constructor(toolModel) {
        this.toolModel = toolModel;
        this.node = this.__createNode()
        
        this.node.innerHTML = this.__template();

        const iconNode = this.node.querySelector('.cke_button_icon');
        if (iconNode && this.toolModel.icon) {
            iconNode.appendChild(this.toolModel.icon);
        }

        return this.node;
    }

    __createNode() {
        const node = document.createElement('a');
        const attributes = {
            'class': 'cke_button cke_button_off',
            'title': this.toolModel.title || '',
            'tabindex': '-1',
            'hidefocus': 'true',
            'role': 'button',
            'aria-haspopup': 'false',
            'aria-disabled': 'false',
            'onkeypress': 'return false;',
            'onclick': 'return false;',
        };

        for (let key in attributes) {
            node.setAttribute(key, attributes[key]);
        }

        if (this.toolModel.callback) {
            node.addEventListener('click', this.toolModel.callback.bind(this));
        }

        return node;
    }

    __template() {
        return `
            <span class="${this.toolModel.icon ? 'cke_button_icon' : ''}"></span>
            <span
                ${this.toolModel.icon ? '' : 'style="padding-left: 0px;"'}
                class="cke_button_label ${this.toolModel.caption ? 'cke_button__source_label' : ''}" 
                aria-hidden="false"
            >${this.toolModel.caption || ''}</span>
        `;
    }
}

export default class ckeToolGroup {
    constructor() {
        this.node = undefined;
        this.tools = [];
    }

    render(parent) {
        this.node = this.__createNode();
        this.node.innerHTML = this.__template();

        const toolParent = this.node.querySelector('.cke_toolgroup');

        for (let tool of this.tools) {
            toolParent.appendChild(tool);
        }

        const toolGroupLast = parent.querySelector('.cke_toolbar_last');
        if (toolGroupLast) {
            toolGroupLast.classList.remove('cke_toolbar_last');
            this.node.classList.add('cke_toolbar_last');
        }

        parent.appendChild(this.node);
    }

    addTool(...toolNodes) {
        for (let toolNode of toolNodes) {
            this.tools.push(toolNode);
        }
    }

    __createNode() {
        const node = document.createElement('span');
        node.className = 'cke_toolbar';
        node.setAttribute('role', 'toolbar');

        return node;
    }

    __template() {
        return `
            <span class="cke_toolbar_start"></span>
            <span class="cke_toolgroup" role="presentation"></span>
            <span class="cke_toolbar_end"></span>
        `;
    }
}



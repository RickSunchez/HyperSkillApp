import { params } from "./params";

export const configTest = {
    toolbars: {
        append: {
            'toolbarGroups': [{
                name: 'hseToolbar',
                groups: ['emDash', 'hseTags']
            }]
        },
        new: {}
    },
    tools: {
        'hseToolbar': {
            'emDash': {
                type: params['ckeToolType']['button'],
                options: {
                    icon: 'Button',
                    label: 'Em Dash',
                    position: 1,
                    action: params['ckeActionType']['insertText'],
                    args: {
                        text: '—'
                    }
                }
            },
            'hseTags': {
                type: params['ckeToolType']['combo'],
                options: {
                    label: 'HSE Tags',
                    title: 'HSE Tags',
                    options: [
                        {type: 'label', title: 'Common'},
                        // {type: 'item', title: 'Item 1', value: 'val', label: 'lab'},
                        {type: 'item', title: 'PRE', value: '[PRE],[/PRE]', label: 'pre'},
                        {type: 'item', title: 'ALERT-primary', value: '[ALERT-primary],[/ALERT]', label: 'alert'},
                        {type: 'item', title: 'META', value: '[META],[/META]', label: 'meta'},
                        {type: 'label', title: 'Tasks-only'},
                        {type: 'item', title: 'HINT', value: '[HINT],[/HINT]', label: 'hint'},
                    ],
                    position: 1,
                    // action: params['ckeActionType']['insertText']
                    action: params['ckeActionType']['frameText']
                }
            }
        }
    }
}

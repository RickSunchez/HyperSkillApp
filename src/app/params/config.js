import { params } from "./params";

export const config = {
    toolbars: {
        append: {
            'toolbar_StepEditToolbar': [{
                name: 'hseToolgroup',
                items: ['emDash', 'hseTags', 'hseTemplates']
            }]
        },
        new: {}
    },
    tools: {
        'hseToolgroup': {
            'emDash': {
                type: params.ckeToolType.button,
                options: {
                    icon: 'Button',
                    label: 'Em Dash',
                    show_label: true,
                    position: 1,
                    action: params.ckeActionType.insertText,
                    args: {
                        text: '—'
                    }
                }
            },
            'hseTags': {
                type: params.ckeToolType.combo,
                options: {
                    label: 'HSE Tags',
                    title: 'HSE Tags',
                    options: [
                        {type: 'label', title: 'Common'},
                        {type: 'item', title: 'PRE', value: '[PRE],[/PRE]', label: 'pre'},
                        {type: 'item', title: 'ALERT-primary', value: '[ALERT-primary],[/ALERT]', label: 'ALERT-primary'},
                        {type: 'item', title: 'ALERT-warning', value: '[ALERT-warning],[/ALERT]', label: 'ALERT-warning'},
                        {type: 'item', title: 'META', value: '[META],[/META]', label: 'meta'},
                        {type: 'label', title: 'Tasks-only'},
                        {type: 'item', title: 'HINT', value: '[HINT],[/HINT]', label: 'hint'},
                    ],
                    position: 2,
                    action: params.ckeActionType.frameText
                }
            },
            'hseTemplates': {
                type: params.ckeToolType.combo,
                options: {
                    label: 'HSE Templates',
                    title: 'HSE Templates',
                    options: [
                        {type: 'label', title: 'Titles'},
                        {type: 'item', title: 'Application', value: '[TITLE] ? # Application [/TITLE]', label: 'application'},
                        {type: 'item', title: 'Comprehension', value: '[TITLE] ? # Comprehension [/TITLE]', label: 'alert'},
                    ],
                    position: 2,
                    action: params.ckeActionType.insertText
                }
            }
        }
    },
    controls: []
}
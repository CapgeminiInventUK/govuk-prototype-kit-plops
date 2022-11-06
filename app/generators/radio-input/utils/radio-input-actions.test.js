/* eslint-disable sonarjs/no-duplicate-string */
const { describe, expect, test } = require('@jest/globals');
const radioInputActions = require('./radio-input-actions')

describe('Setup actions for text input', () => {
  describe('Errors', () => {
    test('Less than 2 radio items provided', () => {
      const actions = () => radioInputActions('project/path', false, false, false, false, [])

      expect(actions).toThrow(Error)
      expect(actions).toThrow('There should be a minimum of 2 radio items, 0 where provided')
    });

    test('When inline and number of radio buttons is not 2', () => {
      const actions = () => radioInputActions('project/path', false, true, false, false, [{ itemDisplayText: 'radio1', itemValue: 1 }, { itemDisplayText: 'radio2', itemValue: 2 }, { itemDisplayText: 'radio3', itemValue: 3 }])

      expect(actions).toThrow(Error)
      expect(actions).toThrow('There should be 2 radio items when inline, 3 items where provided')
    });
  });
  test('run action with every set to false and 2 radio items', () => {
    const actions = radioInputActions('project/path', false, false, false, false, [{ itemDisplayText: 'radio1', itemValue: 1 }, { itemDisplayText: 'radio2', itemValue: 2 }])
    expect(actions.length).toBe(11)
    expect(actions).toEqual([
      {
        type: 'add',
        path: 'project/path/app/views/{{kebabCase pageName}}.njk',
        templateFile: './app/templates/common/layouts/content-and-input-page.njk',
      },
      {
        type: 'add',
        path: 'project/path/app/routes/{{kebabCase pageName}}.js',
        templateFile: './app/templates/radio-input/controller/radio-input-controller.template.js',
      },
      {
        type: 'modify',
        path: 'project/path/app/routes.js',
        template: "require('./routes/{{kebabCase pageName}}')(router);\n"
            + '\n'
            + 'module.exports = router',
        pattern: /module.exports = router/gi,
      },
      {
        type: 'modify',
        path: 'project/path/app/views/{{kebabCase pageName}}.njk',
        templateFile: './app/templates/radio-input/view/radio-input.njk.hbs',
        pattern: /{# FORM #}/gi,
      },
      {
        type: 'modify',
        path: 'project/path/app/views/{{kebabCase pageName}}.njk',
        template: '{{kebabCase inputName}}',
        pattern: /{# INPUT_ID #}/gi,
      },
      {
        type: 'modify',
        path: 'project/path/app/views/{{kebabCase pageName}}.njk',
        template: '{{camelCase inputName}}',
        pattern: /{# INPUT_NAME #}/gi,
      },
      {
        type: 'modify',
        path: 'project/path/app/views/{{kebabCase pageName}}.njk',
        templateFile: './app/templates/radio-input/view/segments/legend-multiple-questions.njk.hbs',
        pattern: /{# INPUT_LEGEND #}/gi,
      },
      {
        type: 'modify',
        path: 'project/path/app/views/{{kebabCase pageName}}.njk',
        template: 'classes: "govuk-radios--small",',
        pattern: /{# INPUT_GROUP_CLASSES #}/gi,
      },
      {
        type: 'modify',
        path: 'project/path/app/views/{{kebabCase pageName}}.njk',
        template: '',
        pattern: /{# INPUT_HINT #}/gi,
      },
      {
        type: 'modify',
        path: 'project/path/app/views/{{kebabCase pageName}}.njk',
        template: '[\n'
            + '  { value: "1", text: "radio1" },\n'
            + ' { value: "2", text: "radio2" }\n'
            + ']',
        pattern: /{# INPUT_ITEMS #}/gi,
      },
      {
        type: 'modify',
        path: 'project/path/app/views/{{kebabCase pageName}}.njk',
        templateFile: './app/templates/common/components/button/continue-button.njk.hbs',
        pattern: /{# BUTTON #}/gi,
      },
    ])
  })

  test('run action with every set to false and 4 radio items', () => {
    const actions = radioInputActions('project/path', false, false, false, false, [{ itemDisplayText: 'radio1', itemValue: 1 }, { itemDisplayText: 'radio2', itemValue: 2 }, { itemDisplayText: 'radio3', itemValue: 3 }, { itemDisplayText: 'radio4', itemValue: 4 }])

    expect(actions.length).toBe(11)

    expect(actions).toEqual([
      {
        type: 'add',
        path: 'project/path/app/views/{{kebabCase pageName}}.njk',
        templateFile: './app/templates/common/layouts/content-and-input-page.njk',
      },
      {
        type: 'add',
        path: 'project/path/app/routes/{{kebabCase pageName}}.js',
        templateFile: './app/templates/radio-input/controller/radio-input-controller.template.js',
      },
      {
        type: 'modify',
        path: 'project/path/app/routes.js',
        template: "require('./routes/{{kebabCase pageName}}')(router);\n"
            + '\n'
            + 'module.exports = router',
        pattern: /module.exports = router/gi,
      },
      {
        type: 'modify',
        path: 'project/path/app/views/{{kebabCase pageName}}.njk',
        templateFile: './app/templates/radio-input/view/radio-input.njk.hbs',
        pattern: /{# FORM #}/gi,
      },
      {
        type: 'modify',
        path: 'project/path/app/views/{{kebabCase pageName}}.njk',
        template: '{{kebabCase inputName}}',
        pattern: /{# INPUT_ID #}/gi,
      },
      {
        type: 'modify',
        path: 'project/path/app/views/{{kebabCase pageName}}.njk',
        template: '{{camelCase inputName}}',
        pattern: /{# INPUT_NAME #}/gi,
      },
      {
        type: 'modify',
        path: 'project/path/app/views/{{kebabCase pageName}}.njk',
        templateFile: './app/templates/radio-input/view/segments/legend-multiple-questions.njk.hbs',
        pattern: /{# INPUT_LEGEND #}/gi,
      },
      {
        type: 'modify',
        path: 'project/path/app/views/{{kebabCase pageName}}.njk',
        template: 'classes: "govuk-radios--small",',
        pattern: /{# INPUT_GROUP_CLASSES #}/gi,
      },
      {
        type: 'modify',
        path: 'project/path/app/views/{{kebabCase pageName}}.njk',
        template: '',
        pattern: /{# INPUT_HINT #}/gi,
      },
      {
        type: 'modify',
        path: 'project/path/app/views/{{kebabCase pageName}}.njk',
        template: '[\n'
            + '  { value: "1", text: "radio1" },\n'
            + ' { value: "2", text: "radio2" },\n'
            + ' { value: "3", text: "radio3" },\n'
            + ' { value: "4", text: "radio4" }\n'
            + ']',
        pattern: /{# INPUT_ITEMS #}/gi,
      },
      {
        type: 'modify',
        path: 'project/path/app/views/{{kebabCase pageName}}.njk',
        templateFile: './app/templates/common/components/button/continue-button.njk.hbs',
        pattern: /{# BUTTON #}/gi,
      },
    ])
  })

  test('run action with every set to true and 2 radio items', () => {
    const actions = radioInputActions('project/path', true, true, true, true, [{ itemDisplayText: 'radio1', itemValue: 1 }, { itemDisplayText: 'radio2', itemValue: 2 }])
    expect(actions.length).toBe(11)
    expect(actions).toEqual([
      {
        type: 'add',
        path: 'project/path/app/views/{{kebabCase pageName}}.njk',
        templateFile: './app/templates/common/layouts/input-only-page.njk',
      },
      {
        type: 'add',
        path: 'project/path/app/routes/{{kebabCase pageName}}.js',
        templateFile: './app/templates/radio-input/controller/radio-input-controller.template.js',
      },
      {
        type: 'modify',
        path: 'project/path/app/routes.js',
        template: "require('./routes/{{kebabCase pageName}}')(router);\n"
            + '\n'
            + 'module.exports = router',
        pattern: /module.exports = router/gi,
      },
      {
        type: 'modify',
        path: 'project/path/app/views/{{kebabCase pageName}}.njk',
        templateFile: './app/templates/radio-input/view/radio-input.njk.hbs',
        pattern: /{# FORM #}/gi,
      },
      {
        type: 'modify',
        path: 'project/path/app/views/{{kebabCase pageName}}.njk',
        template: '{{kebabCase inputName}}',
        pattern: /{# INPUT_ID #}/gi,
      },
      {
        type: 'modify',
        path: 'project/path/app/views/{{kebabCase pageName}}.njk',
        template: '{{camelCase inputName}}',
        pattern: /{# INPUT_NAME #}/gi,
      },
      {
        type: 'modify',
        path: 'project/path/app/views/{{kebabCase pageName}}.njk',
        templateFile: './app/templates/radio-input/view/segments/legend-one-question.njk.hbs',
        pattern: /{# INPUT_LEGEND #}/gi,
      },
      {
        type: 'modify',
        path: 'project/path/app/views/{{kebabCase pageName}}.njk',
        template: 'classes: "govuk-radios--inline",',
        pattern: /{# INPUT_GROUP_CLASSES #}/gi,
      },
      {
        type: 'modify',
        path: 'project/path/app/views/{{kebabCase pageName}}.njk',
        templateFile: './app/templates/radio-input/view/segments/input-hint.njk.hbs',
        pattern: /{# INPUT_HINT #}/gi,
      },
      {
        type: 'modify',
        path: 'project/path/app/views/{{kebabCase pageName}}.njk',
        template: '[\n'
            + '  { value: "1", text: "radio1" },\n'
            + ' { value: "2", text: "radio2" }\n'
            + ']',
        pattern: /{# INPUT_ITEMS #}/gi,
      },
      {
        type: 'modify',
        path: 'project/path/app/views/{{kebabCase pageName}}.njk',
        templateFile: './app/templates/common/components/button/continue-button.njk.hbs',
        pattern: /{# BUTTON #}/gi,
      },
    ])
  })
});

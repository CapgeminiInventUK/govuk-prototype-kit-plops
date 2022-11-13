/* eslint-disable sonarjs/no-duplicate-string */
const { describe, expect, test } = require('@jest/globals');
const textInputActions = require('./text-input-actions')

describe('Setup actions for text input', () => {
  test('get action when everything is set to false', () => {
    const actions = textInputActions('project/path', false, undefined, undefined, undefined, false)

    expect(actions.length).toBe(13);

    expect(actions).toEqual([
      {
        type: 'add',
        path: 'project/path/app/views/{{kebabCase pageName}}.njk',
        templateFile: './app/templates/common/layouts/content-and-input-page.njk',
      },
      {
        type: 'add',
        path: 'project/path/app/routes/{{kebabCase pageName}}.js',
        templateFile: './app/templates/text-input/controller/text-input-controller.template.js',
      },
      {
        type: 'modify',
        path: 'project/path/app/routes.js',
        template: "require('./routes/{{kebabCase pageName}}')(router);\n\nmodule.exports = router",
        pattern: /module.exports = router/gi,
      },
      {
        type: 'modify',
        path: 'project/path/app/views/{{kebabCase pageName}}.njk',
        templateFile: './app/templates/text-input/view/text-input.njk.hbs',
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
        templateFile: './app/templates/text-input/view/segments/input-width.njk.hbs',
        pattern: /{# INPUT_CLASS #}/gi,
      },
      {
        type: 'modify',
        path: 'project/path/app/views/{{kebabCase pageName}}.njk',
        templateFile: './app/templates/text-input/view/segments/label-not-page-heading.njk.hbs',
        pattern: /{# INPUT_LABEL #}/gi,
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
        template: '',
        pattern: /{# INPUT_PREFIX #}/gi,
      },
      {
        type: 'modify',
        path: 'project/path/app/views/{{kebabCase pageName}}.njk',
        template: '',
        pattern: /{# INPUT_SUFFIX #}/gi,
      },
      {
        type: 'modify',
        path: 'project/path/app/views/{{kebabCase pageName}}.njk',
        template: false,
        pattern: /{# INPUT_SPELLCHECK #}/gi,
      },
      {
        type: 'modify',
        path: 'project/path/app/views/{{kebabCase pageName}}.njk',
        templateFile: './app/templates/common/components/button/continue-button.njk.hbs',
        pattern: /{# BUTTON #}/gi,
      },
    ]);
  });

  test('get action when everything is set to true', () => {
    const actions = textInputActions('project/path', true, 'Question hint', '£', 'kg', true)

    expect(actions.length).toBe(13);

    expect(actions).toEqual([
      {
        type: 'add',
        path: 'project/path/app/views/{{kebabCase pageName}}.njk',
        templateFile: './app/templates/common/layouts/input-only-page.njk',
      },
      {
        type: 'add',
        path: 'project/path/app/routes/{{kebabCase pageName}}.js',
        templateFile: './app/templates/text-input/controller/text-input-controller.template.js',
      },
      {
        type: 'modify',
        path: 'project/path/app/routes.js',
        template: "require('./routes/{{kebabCase pageName}}')(router);\n\nmodule.exports = router",
        pattern: /module.exports = router/gi,
      },
      {
        type: 'modify',
        path: 'project/path/app/views/{{kebabCase pageName}}.njk',
        templateFile: './app/templates/text-input/view/text-input.njk.hbs',
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
        templateFile: './app/templates/text-input/view/segments/input-width.njk.hbs',
        pattern: /{# INPUT_CLASS #}/gi,
      },
      {
        type: 'modify',
        path: 'project/path/app/views/{{kebabCase pageName}}.njk',
        templateFile: './app/templates/text-input/view/segments/label-is-page-heading.njk.hbs',
        pattern: /{# INPUT_LABEL #}/gi,
      },
      {
        type: 'modify',
        path: 'project/path/app/views/{{kebabCase pageName}}.njk',
        templateFile: './app/templates/common/view/segments/input-hint.njk.hbs',
        pattern: /{# INPUT_HINT #}/gi,
      },
      {
        type: 'modify',
        path: 'project/path/app/views/{{kebabCase pageName}}.njk',
        templateFile: './app/templates/text-input/view/segments/prefix.njk.hbs',
        pattern: /{# INPUT_PREFIX #}/gi,
      },
      {
        type: 'modify',
        path: 'project/path/app/views/{{kebabCase pageName}}.njk',
        templateFile: './app/templates/text-input/view/segments/suffix.njk.hbs',
        pattern: /{# INPUT_SUFFIX #}/gi,
      },
      {
        type: 'modify',
        path: 'project/path/app/views/{{kebabCase pageName}}.njk',
        template: true,
        pattern: /{# INPUT_SPELLCHECK #}/gi,
      },
      {
        type: 'modify',
        path: 'project/path/app/views/{{kebabCase pageName}}.njk',
        templateFile: './app/templates/common/components/button/continue-button.njk.hbs',
        pattern: /{# BUTTON #}/gi,
      },
    ]);
  });
});

/* eslint-disable sonarjs/no-duplicate-string */
const { describe, expect, test } = require('@jest/globals');
const textInputActions = require('./text-input-actions')

describe('Setup actions for text input', () => {
  test('get action when everything is set to false', () => {
    const actions = textInputActions('project/path', false, false, false)

    expect(actions.length).toBe(10);

    expect(actions).toEqual([
      {
        type: 'add',
        path: 'project/path/app/views/{{kebabCase pageName}}.njk',
        templateFile: './app/templates/common/layouts/content-and-input-page.njk',
      },
      {
        type: 'add',
        path: 'project/path/app/routes/{{kebabCase pageName}}.js',
        templateFile: './app/templates/text-input/text-input-controller.template.js',
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
        templateFile: './app/templates/common/components/text-input/text-input.njk.hbs',
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
        templateFile: './app/templates/common/components/text-input/segments/label-not-page-heading.njk.hbs',
        pattern: /{# INPUT_LABEL #}/gi,
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
        templateFile: './app/templates/common/components/button/continue-button.njk.hbs',
        pattern: /{# BUTTON #}/gi,
      },
    ]);
  });

  test('get action when everything is set to true', () => {
    const actions = textInputActions('project/path', true, true, true)

    expect(actions.length).toBe(10);

    expect(actions).toEqual([
      {
        type: 'add',
        path: 'project/path/app/views/{{kebabCase pageName}}.njk',
        templateFile: './app/templates/common/layouts/input-only-page.njk',
      },
      {
        type: 'add',
        path: 'project/path/app/routes/{{kebabCase pageName}}.js',
        templateFile: './app/templates/text-input/text-input-controller.template.js',
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
        templateFile: './app/templates/common/components/text-input/text-input.njk.hbs',
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
        templateFile: './app/templates/common/components/text-input/segments/label-is-page-heading.njk.hbs',
        pattern: /{# INPUT_LABEL #}/gi,
      },
      {
        type: 'modify',
        path: 'project/path/app/views/{{kebabCase pageName}}.njk',
        templateFile: './app/templates/common/components/text-input/segments/prefix.njk.hbs',
        pattern: /{# INPUT_PREFIX #}/gi,
      },
      {
        type: 'modify',
        path: 'project/path/app/views/{{kebabCase pageName}}.njk',
        templateFile: './app/templates/common/components/text-input/segments/suffix.njk.hbs',
        pattern: /{# INPUT_SUFFIX #}/gi,
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

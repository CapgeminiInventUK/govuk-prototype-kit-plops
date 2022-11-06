/* eslint-disable no-multi-str */
/* eslint-disable sonarjs/no-duplicate-string */
const { describe, expect, test } = require('@jest/globals');
const guidanceActions = require('./guidance-actions')

describe('Setup actions for guidance', () => {
  test('get action when isStartButton === false', () => {
    const actions = guidanceActions('project/path', false);
    expect(actions.length).toBe(5);
    expect(actions).toEqual([
      {
        path: 'project/path/app/views/{{kebabCase pageName}}.njk',
        templateFile: './app/templates/common/layouts/content-and-input-page.njk',
        type: 'add',
      },
      {
        path: 'project/path/app/routes/{{kebabCase pageName}}.js',
        templateFile: './app/templates/guidance/controller/guidance-controller.template.js',
        type: 'add',
      },
      {
        path: 'project/path/app/routes.js',
        template: 'require(\'./routes/{{kebabCase pageName}}\')(router);\n\nmodule.exports = router',
        pattern: /module.exports = router/gi,
        type: 'modify',
      },
      {
        path: 'project/path/app/views/{{kebabCase pageName}}.njk',
        pattern: /{# FORM #}/gi,
        template: '',
        type: 'modify',
      },
      {
        path: 'project/path/app/views/{{kebabCase pageName}}.njk',
        pattern: /{# BUTTON #}/gi,
        templateFile: './app/templates/common/components/button/continue-button.njk.hbs',
        type: 'modify',
      },
    ]);
  });

  test('get action when isStartButton === true', () => {
    const actions = guidanceActions('project/path', true);
    expect(actions.length).toBe(5);
    expect(actions).toEqual([
      {
        path: 'project/path/app/views/{{kebabCase pageName}}.njk',
        templateFile: './app/templates/common/layouts/content-and-input-page.njk',
        type: 'add',
      },
      {
        path: 'project/path/app/routes/{{kebabCase pageName}}.js',
        templateFile: './app/templates/guidance/controller/guidance-controller.template.js',
        type: 'add',
      },
      {
        path: 'project/path/app/routes.js',
        template: 'require(\'./routes/{{kebabCase pageName}}\')(router);\n\nmodule.exports = router',
        pattern: /module.exports = router/gi,
        type: 'modify',
      },
      {
        path: 'project/path/app/views/{{kebabCase pageName}}.njk',
        pattern: /{# FORM #}/gi,
        template: '',
        type: 'modify',
      },
      {
        path: 'project/path/app/views/{{kebabCase pageName}}.njk',
        pattern: /{# BUTTON #}/gi,
        templateFile: './app/templates/common/components/button/start-button.njk.hbs',
        type: 'modify',
      },
    ]);
  });
});

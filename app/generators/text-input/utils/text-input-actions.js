module.exports = function textInputActions(
  projectPath,
  isPageHeading,
  hasHintOnQuestion,
  prefix,
  suffix,
) {
  const actions = [];
  actions.push({
    type: 'add',
    path: `${projectPath}/app/views/{{kebabCase pageName}}.njk`,
    templateFile: isPageHeading
      ? './app/templates/common/layouts/input-only-page.njk'
      : './app/templates/common/layouts/content-and-input-page.njk',
  });

  actions.push({
    type: 'add',
    path: `${projectPath}/app/routes/{{kebabCase pageName}}.js`,
    templateFile: './app/templates/text-input/controller/text-input-controller.template.js',
  });

  actions.push({
    type: 'modify',
    path: `${projectPath}/app/routes.js`,
    template: 'require(\'./routes/{{kebabCase pageName}}\')(router);\n\nmodule.exports = router',
    pattern: /module.exports = router/gi,
  });

  actions.push({
    type: 'modify',
    path: `${projectPath}/app/views/{{kebabCase pageName}}.njk`,
    templateFile: './app/templates/text-input/view/text-input.njk.hbs',
    pattern: /{# FORM #}/gi,
  });

  actions.push({
    type: 'modify',
    path: `${projectPath}/app/views/{{kebabCase pageName}}.njk`,
    template: '{{kebabCase inputName}}',
    pattern: /{# INPUT_ID #}/gi,
  });

  actions.push({
    type: 'modify',
    path: `${projectPath}/app/views/{{kebabCase pageName}}.njk`,
    template: '{{camelCase inputName}}',
    pattern: /{# INPUT_NAME #}/gi,
  });

  actions.push({
    type: 'modify',
    path: `${projectPath}/app/views/{{kebabCase pageName}}.njk`,
    templateFile: './app/templates/text-input/view/segments/input-width.njk.hbs',
    pattern: /{# INPUT_CLASS #}/gi,
  });

  if (isPageHeading) {
    actions.push({
      type: 'modify',
      path: `${projectPath}/app/views/{{kebabCase pageName}}.njk`,
      templateFile: './app/templates/text-input/view/segments/label-is-page-heading.njk.hbs',
      pattern: /{# INPUT_LABEL #}/gi,
    });
  } else {
    actions.push({
      type: 'modify',
      path: `${projectPath}/app/views/{{kebabCase pageName}}.njk`,
      templateFile: './app/templates/text-input/view/segments/label-not-page-heading.njk.hbs',
      pattern: /{# INPUT_LABEL #}/gi,
    });
  }

  if (hasHintOnQuestion) {
    actions.push({
      type: 'modify',
      path: `${projectPath}/app/views/{{kebabCase pageName}}.njk`,
      templateFile: './app/templates/common/view/segments/input-hint.njk.hbs',
      pattern: /{# INPUT_HINT #}/gi,
    });
  } else {
    actions.push({
      type: 'modify',
      path: `${projectPath}/app/views/{{kebabCase pageName}}.njk`,
      template: '',
      pattern: /{# INPUT_HINT #}/gi,
    });
  }

  if (prefix) {
    actions.push({
      type: 'modify',
      path: `${projectPath}/app/views/{{kebabCase pageName}}.njk`,
      templateFile: './app/templates/text-input/view/segments/prefix.njk.hbs',
      pattern: /{# INPUT_PREFIX #}/gi,
    });
  } else {
    actions.push({
      type: 'modify',
      path: `${projectPath}/app/views/{{kebabCase pageName}}.njk`,
      template: '',
      pattern: /{# INPUT_PREFIX #}/gi,
    });
  }
  if (suffix) {
    actions.push({
      type: 'modify',
      path: `${projectPath}/app/views/{{kebabCase pageName}}.njk`,
      templateFile: './app/templates/text-input/view/segments/suffix.njk.hbs',
      pattern: /{# INPUT_SUFFIX #}/gi,
    });
  } else {
    actions.push({
      type: 'modify',
      path: `${projectPath}/app/views/{{kebabCase pageName}}.njk`,
      template: '',
      pattern: /{# INPUT_SUFFIX #}/gi,
    });
  }

  actions.push({
    type: 'modify',
    path: `${projectPath}/app/views/{{kebabCase pageName}}.njk`,
    templateFile: './app/templates/common/components/button/continue-button.njk.hbs',
    pattern: /{# BUTTON #}/gi,
  });

  return actions;
}

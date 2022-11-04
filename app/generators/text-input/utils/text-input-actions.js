module.exports = function textInputActions(
  projectPath,
  isPageHeading,
  hasPrefix,
  hasSuffix,
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
    templateFile: './app/templates/text-input/text-input-controller.template.js',
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
    templateFile: './app/templates/common/components/text-input/text-input.njk.hbs',
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

  if (isPageHeading) {
    actions.push({
      type: 'modify',
      path: `${projectPath}/app/views/{{kebabCase pageName}}.njk`,
      templateFile: './app/templates/common/components/text-input/segments/label-is-page-heading.njk.hbs',
      pattern: /{# INPUT_LABEL #}/gi,
    });
  } else {
    actions.push({
      type: 'modify',
      path: `${projectPath}/app/views/{{kebabCase pageName}}.njk`,
      templateFile: './app/templates/common/components/text-input/segments/label-not-page-heading.njk.hbs',
      pattern: /{# INPUT_LABEL #}/gi,
    });
  }

  if (hasPrefix) {
    actions.push({
      type: 'modify',
      path: `${projectPath}/app/views/{{kebabCase pageName}}.njk`,
      templateFile: './app/templates/common/components/text-input/segments/prefix.njk.hbs',
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
  if (hasSuffix) {
    actions.push({
      type: 'modify',
      path: `${projectPath}/app/views/{{kebabCase pageName}}.njk`,
      templateFile: './app/templates/common/components/text-input/segments/suffix.njk.hbs',
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

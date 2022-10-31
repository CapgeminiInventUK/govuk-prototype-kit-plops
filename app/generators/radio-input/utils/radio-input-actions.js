module.exports = function radioInputActions(
  projectPath,
  isPageHeading,
  isInline,
  isStandardRadioButton,
  hasHintOnQuestion,
  radioItems,
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
    templateFile: './app/templates/radio-input/radio-input-controller.template.js',
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
    templateFile: './app/templates/common/components/radio-input/radio-input.njk.hbs',
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
      templateFile: './app/templates/common/components/radio-input/segments/legend-one-question.njk.hbs',
      pattern: /{# INPUT_LEGEND #}/gi,
    });
  } else {
    actions.push({
      type: 'modify',
      path: `${projectPath}/app/views/{{kebabCase pageName}}.njk`,
      templateFile: './app/templates/common/components/radio-input/segments/legend-multiple-questions.njk.hbs',
      pattern: /{# INPUT_LEGEND #}/gi,
    });
  }

  const inputGroupClasses = [];
  if (isInline) {
    inputGroupClasses.push('govuk-radios--inline');
  }

  if (!isStandardRadioButton) {
    inputGroupClasses.push('govuk-radios--small');
  }

  if (inputGroupClasses.length > 0) {
    actions.push({
      type: 'modify',
      path: `${projectPath}/app/views/{{kebabCase pageName}}.njk`,
      template: `classes: "${inputGroupClasses.join(' ')}",`,
      pattern: /{# INPUT_GROUP_CLASSES #}/gi,
    });
  } else {
    actions.push({
      type: 'modify',
      path: `${projectPath}/app/views/{{kebabCase pageName}}.njk`,
      template: '',
      pattern: /{# INPUT_GROUP_CLASSES #}/gi,
    });
  }

  if (hasHintOnQuestion) {
    actions.push({
      type: 'modify',
      path: `${projectPath}/app/views/{{kebabCase pageName}}.njk`,
      templateFile: './app/templates/common/components/radio-input/segments/input-hint.njk.hbs',
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

  const items = [];
  for (const radioItem of radioItems) {
    items.push(` { value: "${radioItem.itemValue}", text: "${radioItem.itemDisplayText}" }`);
  }

  actions.push({
    type: 'modify',
    path: `${projectPath}/app/views/{{kebabCase pageName}}.njk`,
    template: `[\n ${items.join(',\n')}\n]`,
    pattern: /{# INPUT_ITEMS #}/gi,
  });

  actions.push({
    type: 'modify',
    path: `${projectPath}/app/views/{{kebabCase pageName}}.njk`,
    templateFile: './app/templates/common/components/button/continue-button.njk.hbs',
    pattern: /{# BUTTON #}/gi,
  });

  return actions;
}

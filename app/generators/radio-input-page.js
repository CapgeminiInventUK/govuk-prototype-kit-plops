module.exports = function radioInputPage(plop) {
  const projectPath = process.cwd();

  plop.setGenerator('radio-input-page', {
    description: 'Create radio input page',
    prompts: async (inquirer) => {
      const { pageName } = await inquirer.prompt({
        type: 'input',
        name: 'pageName',
        message: 'Page name, include spaces we will format the name accordingly',
      });

      const { isPageHeading } = await inquirer.prompt({
        type: 'confirm',
        name: 'isPageHeading',
        message: 'Is the label for the input the page header (e.g. the H1)?',
      });

      const { label } = await inquirer.prompt({
        type: 'input',
        name: 'label',
        message: 'Enter radio to show for input label',
      });

      const { inputName } = await inquirer.prompt({
        type: 'input',
        name: 'inputName',
        message: 'Enter name of the variable that will store the value of the input',
      });

      // TODO add in the optional pages

      return Promise.resolve({
        pageName, isPageHeading, label, inputName,
      });
    },
    actions(data) {
      // TODO Correct for the input these are just placeholders from the text input version

      const actions = [];
      actions.push({
        type: 'add',
        path: `${projectPath}/app/views/{{kebabCase pageName}}.njk`,
        templateFile: data.isPageHeading
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

      if (data.isPageHeading) {
        actions.push({
          type: 'modify',
          path: `${projectPath}/app/views/{{kebabCase pageName}}.njk`,
          templateFile: './app/templates/common/components/radio-input/segments/label-is-page-heading.njk.hbs',
          pattern: /{# INPUT_LABEL #}/gi,
        });
      } else {
        actions.push({
          type: 'modify',
          path: `${projectPath}/app/views/{{kebabCase pageName}}.njk`,
          templateFile: './app/templates/common/components/radio-input/segments/label-not-page-heading.njk.hbs',
          pattern: /{# INPUT_LABEL #}/gi,
        });
      }

      actions.push({
        type: 'modify',
        path: `${projectPath}/app/views/{{kebabCase pageName}}.njk`,
        templateFile: './app/templates/common/components/button/continue-button.njk.hbs',
        pattern: /{# BUTTON #}/gi,
      });

      return actions;
    },
  });
};

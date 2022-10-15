module.exports = function guidancePage(plop) {
  const projectPath = process.cwd();

  plop.setGenerator('guidance-page', {
    description: 'Create text only page',
    prompts: async (inquirer) => {
      const { pageName } = await inquirer.prompt({
        type: 'input',
        name: 'pageName',
        message: 'Page name, include spaces we will format the name accordingly',
      });

      const { isStartButton } = await inquirer.prompt({
        type: 'confirm',
        name: 'isStartButton',
        message: 'Do you need a start now button?',
      });

      return Promise.resolve({ pageName, isStartButton });
    },
    actions(data) {
      const actions = [];

      actions.push({
        type: 'add',
        path: `${projectPath}/app/views/{{kebabCase pageName}}.njk`,
        templateFile: './app/templates/common/layouts/content-and-input-page.njk',
      });

      actions.push({
        type: 'add',
        path: `${projectPath}/app/routes/{{kebabCase pageName}}.js`,
        templateFile: './app/templates/guidance/guidance-controller.template.js',
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
        template: '',
        pattern: /{# FORM #}/gi,
      });

      actions.push({
        type: 'modify',
        path: `${projectPath}/app/views/{{kebabCase pageName}}.njk`,
        templateFile: data.isStartButton ? './app/templates/common/components/button/start-button.njk.hbs' : './app/templates/common/components/button/continue-button.njk.hbs',
        pattern: /{# BUTTON #}/gi,
      });

      return actions;
    },
  });
};

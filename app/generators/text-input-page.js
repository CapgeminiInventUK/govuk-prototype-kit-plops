module.exports = function textInputPage(plop) {
  const projectPath = process.cwd();

  plop.setGenerator('text-input-page', {
    description: 'Create text input page',
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
        message: 'Enter text to show for input label',
      });

      const { inputName } = await inquirer.prompt({
        type: 'input',
        name: 'inputName',
        message: 'Enter name of the variable that will store the value of the input',
      });

      const { hasPrefix } = await inquirer.prompt({
        type: 'confirm',
        name: 'hasPrefix',
        message: 'Does the input have a prefix?',
      });
      let customPrefix = '';
      if (hasPrefix) {
        const { prefix } = await inquirer.prompt({
          type: 'input',
          name: 'prefix',
          message: 'Enter text to show in prefix on input',
        });
        customPrefix = prefix;
      }

      const { hasSuffix } = await inquirer.prompt({
        type: 'confirm',
        name: 'hasSuffix',
        message: 'Does the input have a suffix?',
      });

      let customSuffix = '';
      if (hasSuffix) {
        const { suffix } = await inquirer.prompt({
          type: 'input',
          name: 'suffix',
          message: 'Enter text to show in suffix on input',
        });
        customSuffix = suffix;
      }

      return Promise.resolve({
        pageName, isPageHeading, hasPrefix, customPrefix, hasSuffix, customSuffix, label, inputName,
      });
    },
    actions(data) {
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
        templateFile: './app/templates/common/components/text-input/text-input.njk',
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
          templateFile: './app/templates/common/components/text-input/segments/label-is-page-heading.njk',
          pattern: /{# INPUT_LABEL #}/gi,
        });
      } else {
        actions.push({
          type: 'modify',
          path: `${projectPath}/app/views/{{kebabCase pageName}}.njk`,
          templateFile: './app/templates/common/components/text-input/segments/label-not-page-heading.njk',
          pattern: /{# INPUT_LABEL #}/gi,
        });
      }

      if (data.hasPrefix) {
        actions.push({
          type: 'modify',
          path: `${projectPath}/app/views/{{kebabCase pageName}}.njk`,
          templateFile: './app/templates/common/components/text-input/segments/prefix.njk',
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
      if (data.hasSuffix) {
        actions.push({
          type: 'modify',
          path: `${projectPath}/app/views/{{kebabCase pageName}}.njk`,
          templateFile: './app/templates/common/components/text-input/segments/suffix.njk',
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
        templateFile: './app/templates/common/components/button/continue-button.njk',
        pattern: /{# BUTTON #}/gi,
      });

      return actions;
    },
  });
};

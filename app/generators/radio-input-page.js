/* eslint-disable no-await-in-loop */
module.exports = function radioInputPage(plop) {
  const projectPath = process.cwd();

  plop.setGenerator('radio-input-page', {
    description: 'Create radio input page',
    prompts: async (inquirer) => {
      const { pageName } = await inquirer.prompt({
        type: 'input',
        name: 'pageName',
        message: 'Enter page name, this is used for the name of the files (include spaces we will format the name accordingly)',
      });

      const { isPageHeading } = await inquirer.prompt({
        type: 'confirm',
        name: 'isPageHeading',
        message: 'Is the label for the input the page header (e.g. the H1)?',
      });

      const { label } = await inquirer.prompt({
        type: 'input',
        name: 'label',
        message: isPageHeading ? 'Enter text to show as page header' : 'Enter text to show for input legend',
      });

      const { inputName } = await inquirer.prompt({
        type: 'input',
        name: 'inputName',
        message: 'Enter name of the variable that will store the value of the selected radio button',
      });

      const { hasHintOnQuestion } = await inquirer.prompt({
        type: 'confirm',
        name: 'hasHintOnQuestion',
        message: 'Do you need a hint for the question?',
      });

      let hintOnQuestion = '';
      // TODO This does not get asked and its skipped over :()
      if (hasHintOnQuestion) {
        const { hint } = await inquirer.prompt({
          type: 'input',
          name: 'hint',
          message: 'Enter the hint to be shown below the question',
        });
        hintOnQuestion = hint;
      }

      const { isStandardRadioButton } = await inquirer.prompt({
        type: 'list',
        name: 'isStandardRadioButton',
        message: 'Select radio button size?',
        choices: [{
          name: 'Standard radio buttons',
          short: 'standard',
          value: true,
        }, {
          name: 'Small radio buttons',
          short: 'small',
          value: false,
        }],
      });

      const { isInline } = await inquirer.prompt({
        type: 'confirm',
        name: 'isInline',
        message: 'Are radio buttons inline (limits to 2 choices)',
      });

      let numberOfQuestions = 2;
      if (!isInline) {
        const { numberOfRadioButtonsQuestions } = await inquirer.prompt({
          type: 'number',
          name: 'numberOfRadioButtonsQuestions',
          message: 'Enter the number of radio buttons',
          validate(questionCount) {
            return questionCount >= 2 ? true : 'Minimum of 2 questions';
          },
        });
        numberOfQuestions = numberOfRadioButtonsQuestions;
      }

      // TODO add loop for the questions
      const items = []

      for (let index = 1; index <= numberOfQuestions; index++) {
        const { itemDisplayText } = await inquirer.prompt({
          type: 'input',
          name: 'itemDisplayText',
          message: `Item ${index}: Text to display on radio button`,
        });

        const { itemValue } = await inquirer.prompt({
          type: 'input',
          name: 'itemValue',
          message: `Item ${index}: Value when selected`,
        });

        items.push({
          itemDisplayText,
          itemValue,
        })
      }

      return Promise.resolve({
        pageName,
        isPageHeading,
        label,
        inputName,
        hasHintOnQuestion,
        hintOnQuestion,
        isStandardRadioButton,
        isInline,
        numberOfQuestions,
        items,
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

      if (data.hasHintOnQuestion) {
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
      for (const item of data.items) {
        items.push(` { value: "${item.itemValue}", text: "${item.itemDisplayText}" }`);
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
    },
  });
};

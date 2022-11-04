/* eslint-disable no-await-in-loop */
const radioInputActions = require('./utils/radio-input-actions')

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

      let hintOnQuestion;
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
        message: 'Are radio buttons inline (limits to 2 choices and no hints on radio buttons)',
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

        if (!isInline) {
          // TODO Only allow (should ask) hints on radio buttons

          // TODO Conditional reveal
        }

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
      return radioInputActions(
        projectPath,
        data.isPageHeading,
        data.isInline,
        data.isStandardRadioButton,
        data.hasHintOnQuestion,
        data.items,
      );
    },
  });
};

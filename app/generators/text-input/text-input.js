const textInputActions = require('./utils/text-input-actions')
const commonPrompts = require('../utils/prompts/common-prompts')

module.exports = function textInputPage(plop) {
  const projectPath = process.cwd();

  plop.setGenerator('text-input-page', {
    description: 'Create text input page',
    prompts: async (inquirer) => {
      const commonPromptsResponses = await commonPrompts(inquirer)

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
      let customPrefix;
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

      let customSuffix;
      if (hasSuffix) {
        const { suffix } = await inquirer.prompt({
          type: 'input',
          name: 'suffix',
          message: 'Enter text to show in suffix on input',
        });
        customSuffix = suffix;
      }

      return Promise.resolve({
        ...commonPromptsResponses,
        isPageHeading,
        hasPrefix,
        customPrefix,
        hasSuffix,
        customSuffix,
        label,
        inputName,
      });
    },
    actions(data) {
      return textInputActions(projectPath, data.isPageHeading, data.hasPrefix, data.hasSuffix);
    },
  });
};

const textInputActions = require('./utils/text-input-actions')
const commonPrompts = require('../utils/prompts/common-prompts')

module.exports = function textInputPage(plop, projectPath) {
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

      const { isFixedWidth } = await inquirer.prompt({
        type: 'list',
        name: 'isFixedWidth',
        message: 'What type of width options do you require',
        choices: [{
          name: 'Fixed width (these don\'t change with screen width)',
          short: 'fixed',
          value: true,
        }, {
          name: 'Variable width (these change with screen width)',
          short: 'variable',
          value: false,
        }],
      });

      let inputWidth;
      if (isFixedWidth) {
        const { fixedWidth } = await inquirer.prompt({
          type: 'list',
          name: 'fixedWidth',
          message: 'Select the width of the input field',
          loop: false,
          choices: [{
            name: '20 character width',
            short: 'width-20',
            value: 'govuk-input--width-20',
          }, {
            name: '10 character width',
            short: 'width-10',
            value: 'govuk-input--width-10',
          }, {
            name: '5 character width',
            short: 'width-5',
            value: 'govuk-input--width-5',
          }, {
            name: '4 character width',
            short: 'width-4',
            value: 'govuk-input--width-4',
          }, {
            name: '3 character width',
            short: 'width-3',
            value: 'govuk-input--width-3',
          }, {
            name: '2 character width',
            short: 'width-2',
            value: 'govuk-input--width-2',
          }],
        });
        inputWidth = fixedWidth;
      } else {
        const { variableWidth } = await inquirer.prompt({
          type: 'list',
          name: 'variableWidth',
          message: 'Select the width of the input field',
          loop: false,
          choices: [{
            name: 'Full width',
            short: 'full',
            value: 'govuk-!-width-full',
          }, {
            name: 'Three-quarters width',
            short: 'three-quarters',
            value: 'govuk-!-width-three-quarters',
          }, {
            name: 'Two-thirds width',
            short: 'two-thirds',
            value: 'govuk-!-width-two-thirds',
          }, {
            name: 'One-half width',
            short: 'one-half',
            value: 'govuk-!-width-one-half',
          }, {
            name: 'One-third width',
            short: 'one-third',
            value: 'govuk-!-width-one-third',
          }, {
            name: 'One-quarter width',
            short: 'one-quarter',
            value: 'govuk-!-width-one-quarter',
          }],
        });
        inputWidth = variableWidth;
      }

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
        inputWidth,
      });
    },
    actions(data) {
      return textInputActions(
        projectPath,
        data.isPageHeading,
        data.hasPrefix,
        data.hasSuffix,
      );
    },
  });
};

const textInputActions = require('./utils/text-input-actions')
const commonPrompts = require('../utils/prompts/common-prompts')
const hintPrompt = require('../utils/prompts/hint-prompt')
const autocompletePrompts = require('../utils/prompts/autocomplete-prompt')

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

      const hintPromptResponses = await hintPrompt(inquirer)

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
      let prefix;
      if (hasPrefix) {
        const { inputPrefix } = await inquirer.prompt({
          type: 'input',
          name: 'inputPrefix',
          message: 'Enter text to show in prefix on input',
        });
        prefix = inputPrefix;
      }

      const { hasSuffix } = await inquirer.prompt({
        type: 'confirm',
        name: 'hasSuffix',
        message: 'Does the input have a suffix?',
      });

      let suffix;
      if (hasSuffix) {
        const { inputSuffix } = await inquirer.prompt({
          type: 'input',
          name: 'inputSuffix',
          message: 'Enter text to show in suffix on input',
        });
        suffix = inputSuffix;
      }

      const { spellcheck } = await inquirer.prompt({
        type: 'confirm',
        name: 'spellcheck',
        message: 'Enable spellcheck?',
      });

      const autocompletePromptsResponses = await autocompletePrompts(inquirer)

      return Promise.resolve({
        ...commonPromptsResponses,
        label,
        isPageHeading,
        inputName,
        ...hintPromptResponses,
        prefix,
        suffix,
        inputWidth,
        // TODO Add inputmode #16
        ...autocompletePromptsResponses,
        spellcheck: spellcheck.toString(),
      });
    },
    actions(data) {
      return textInputActions(
        projectPath,
        data.isPageHeading,
        data.hint,
        data.prefix,
        data.suffix,
        data.spellcheck,
        data.autocomplete,
      );
    },
  });
};

const guidanceActions = require('./utils/guidance-actions');
const commonPrompts = require('../utils/prompts/common-prompts');

module.exports = function guidancePage(plop, projectPath) {
  plop.setGenerator('guidance-page', {
    description: 'Create text only page',
    prompts: async (inquirer) => {
      const commonPromptsResponses = await commonPrompts(inquirer)

      const { isStartButton } = await inquirer.prompt({
        type: 'confirm',
        name: 'isStartButton',
        message: 'Do you need a start now button?',
      });

      return Promise.resolve({
        ...commonPromptsResponses,
        isStartButton,
      })
    },
    actions(data) {
      return guidanceActions(projectPath, data.isStartButton);
    },
  });
};

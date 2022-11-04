const guidanceActions = require('./utils/guidance-actions');

module.exports = function guidancePage(plop) {
  const projectPath = process.cwd();

  plop.setGenerator('guidance-page', {
    description: 'Create text only page',
    prompts: [{
      type: 'input',
      name: 'pageName',
      message: 'Page name, include spaces we will format the name accordingly',
    }, {
      type: 'confirm',
      name: 'isStartButton',
      message: 'Do you need a start now button?',
    }],
    actions(data) {
      return guidanceActions(projectPath, data.isStartButton);
    },
  });
};

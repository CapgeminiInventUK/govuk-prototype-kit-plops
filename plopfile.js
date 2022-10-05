const guidancePage = require('./app/generators/guidance-page');
const textInputPage = require('./app/generators/text-input-page');

module.exports = function plopFile(plop) {
  plop.addHelper('ng', (text) => `{{ ${text} }}`);
  plop.setActionType('manual-steps', (_, config) => config.configProps);

  guidancePage(plop);
  textInputPage(plop);
};
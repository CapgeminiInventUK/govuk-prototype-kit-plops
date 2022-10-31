const guidancePage = require('./app/generators/guidance/guidance');
const textInputPage = require('./app/generators/text-input/text-input');
const radioInputPage = require('./app/generators/radio-input/radio-input');

module.exports = function plopFile(plop) {
  plop.addHelper('ng', (text) => `{{ ${text} }}`);
  plop.setActionType('manual-steps', (_, config) => config.configProps);

  guidancePage(plop);
  textInputPage(plop);
  radioInputPage(plop);
};

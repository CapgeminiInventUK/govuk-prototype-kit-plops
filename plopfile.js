const path = require('path');
const guidancePage = require('./app/generators/guidance/guidance');
const textInputPage = require('./app/generators/text-input/text-input');
const radioInputPage = require('./app/generators/radio-input/radio-input');

module.exports = function plopFile(plop) {
  const projectPath = path.join(process.cwd(), '..', 'govuk-prototype-kit');
  console.log('...........', projectPath);

  plop.addHelper('ng', (text) => `{{ ${text} }}`);
  plop.setActionType('manual-steps', (_, config) => config.configProps);

  guidancePage(plop, projectPath);
  textInputPage(plop, projectPath);
  radioInputPage(plop, projectPath);
};

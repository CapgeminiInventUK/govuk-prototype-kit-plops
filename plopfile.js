const guidancePage = require('./generators/guidance-page')

module.exports = function (plop) {

    plop.addHelper('ng', text => `{{ ${text} }}`);
    plop.setActionType('manual-steps', function (answers, config, plop) {
        return config.configProps;
    });

    guidancePage(plop);
};
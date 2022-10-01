module.exports = function (plop) {

    const projectPath = process.cwd()

    plop.setGenerator('guidance-page', {
        description: 'Create text only page',
        prompts: async (inquirer) => {

            const { pageName } = await inquirer.prompt({
                type: 'input',
                name: 'pageName',
                message: 'Page name, include spaces we will format the name accordingly'
            });

            const { isStartButton } = await inquirer.prompt({
                type: 'confirm',
                name: 'isStartButton',
                message: 'Do you need a start now button?'
            });

            return Promise.resolve({ pageName, isStartButton });
        },
        actions: function (data) {
            var actions = [];
            actions.push({
                type: 'add',
                path: projectPath + '/app/views/{{kebabCase pageName}}.njk',
                templateFile: './templates/guidance/guidance.template.njk'
            });

            actions.push({
                type: 'add',
                path: projectPath + '/app/routes/{{kebabCase pageName}}.js',
                templateFile: './templates/guidance/guidance-controller.template.js'
            });

            actions.push({
                type: 'modify',
                path: projectPath + '/app/routes.js',
                template: "require('./routes/{{kebabCase pageName}}')(router);\n\nmodule.exports = router",
                pattern: /module.exports = router/gi
            })

            actions.push({
                type: 'modify',
                path: projectPath + '/app/views/{{kebabCase pageName}}.njk',
                templateFile: data.isStartButton ? './templates/common/start-button.njk' : './templates/common/continue-button.njk',
                pattern: /{# BUTTON #}/gi
            })


            return actions;
        }
    })
}
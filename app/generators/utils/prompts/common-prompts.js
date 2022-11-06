module.exports = async function commonPrompts(
  inquirer,
) {
  const { pageName } = await inquirer.prompt({
    type: 'input',
    name: 'pageName',
    message: 'Page name, include spaces we will format the name accordingly',
  });

  return { pageName };
}

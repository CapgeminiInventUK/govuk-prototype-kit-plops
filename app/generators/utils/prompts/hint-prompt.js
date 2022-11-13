module.exports = async function hintPrompts(
  inquirer,
) {
  const { hasHintOnQuestion } = await inquirer.prompt({
    type: 'confirm',
    name: 'hasHintOnQuestion',
    message: 'Do you need a hint for the question?',
  });

  let hint;
  if (hasHintOnQuestion) {
    const { hintOnQuestion } = await inquirer.prompt({
      type: 'input',
      name: 'hintOnQuestion',
      message: 'Enter the hint to be shown below the question',
    });
    hint = hintOnQuestion;
  }

  return { hint };
}

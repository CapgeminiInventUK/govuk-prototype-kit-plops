module.exports = async function hintPrompts(
  inquirer,
) {
  const { hasHintOnQuestion } = await inquirer.prompt({
    type: 'confirm',
    name: 'hasHintOnQuestion',
    message: 'Do you need a hint for the question?',
  });

  let hintOnQuestion;
  if (hasHintOnQuestion) {
    const { hint } = await inquirer.prompt({
      type: 'input',
      name: 'hint',
      message: 'Enter the hint to be shown below the question',
    });
    hintOnQuestion = hint;
  }

  return { hasHintOnQuestion, hintOnQuestion };
}

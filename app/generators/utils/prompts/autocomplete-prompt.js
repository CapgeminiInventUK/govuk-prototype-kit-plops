module.exports = async function hintPrompts(
  inquirer,
) {
  const { hasAutocompleteOnInput } = await inquirer.prompt({
    type: 'confirm',
    name: 'hasAutocompleteOnInput',
    message: 'Do you need autocomplete on the input?',
  });

  let autocomplete;
  if (hasAutocompleteOnInput) {
    const { autocompleteOnInput } = await inquirer.prompt({
      type: 'input',
      name: 'autocompleteOnInput',
      message: 'Enter the autocomplete for the input',
    });
    autocomplete = autocompleteOnInput;
  }

  return { autocomplete };
}

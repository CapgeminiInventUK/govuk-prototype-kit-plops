import { SyntheticEvent, useState } from 'react'
import TextField, { InputMode, InputWidth } from '../components/govuk/TextField';
import Input from '../components/Input';
import PageLayout from '../components/PageLayout';

const inputWidths = [
  { label: 'Full width', value: 'govuk-!-width-full' },
  { label: 'Three-quarters width', value: 'govuk-!-width-three-quarters' },
  { label: 'Two-thirds width', value: 'govuk-!-width-two-thirds' },
  { label: 'One-half width', value: 'govuk-!-width-one-half' },
  { label: 'One-third width', value: 'govuk-!-width-one-third' },
  { label: 'One-quarter width', value: 'govuk-!-width-one-quarter' },
  { label: '20 character width', value: 'govuk-input--width-20' },
  { label: '10 character width', value: 'govuk-input--width-10' },
  { label: '5 character width', value: 'govuk-input--width-5' },
  { label: '4 character width', value: 'govuk-input--width-4' },
  { label: '3 character width', value: 'govuk-input--width-3' },
  { label: '2 character width', value: 'govuk-input--width-2' },
];

const inputModes = [
  { label: 'Decimal', value: 'decimal' },
  { label: 'Email', value: 'email' },
  { label: 'Numeric', value: 'numeric' },
  { label: 'None', value: 'none' },
  { label: 'Search', value: 'search' },
  { label: 'Telephone', value: 'tel' },
  { label: 'Text', value: 'text' },
  { label: 'Url', value: 'url' },
];

const autoCompletes = [
  { label: 'Name', value: 'name' },
  { label: 'Given name', value: 'given-name' },
  { label: 'Family name', value: 'family-name' },
  { label: 'Nickname', value: 'nickname' },
  { label: 'Birthday', value: 'bday' },
  { label: 'Telephone', value: 'tel' },
  { label: 'Postcode', value: 'postal-code' },
];

export default function Component() {
  const [attrs, setAttrs] = useState({
    pageName: 'text-field-page',
    inputName: 'text-field-1',
    label: 'Label',
    isPageHeading: true,
    hint: '',
    inputWidth: '' as InputWidth,
    prefix: '',
    suffix: '',
    inputMode: '' as InputMode,
    autocomplete: '',
    spellcheck: false,
  });

  const handleChange = (e: SyntheticEvent) => {
    const target = (e.target as HTMLInputElement);
    setAttrs({ ...attrs, [target.name]: target.value })
  };

  const handleCheckboxToggle = (e: SyntheticEvent) => {
    const target = (e.target as HTMLInputElement);
    setAttrs({ ...attrs, [target.name]: target.checked })
  }

  return (
    <div className="main">
      <div className="componentContainer">
        <PageLayout>
          <TextField
            {...attrs}
          />
        </PageLayout>
      </div>

      <form className="componentAttributesForm" action='/api/generate-page' method='post'>
        <div className="componentAttributes">
          <input type="hidden" name="plopfile" value="text-input-page" />
          <Input
            name="pageName"
            label="Page name"
            defaultValue={attrs.pageName}
            handleChange={handleChange}
          />

          <Input
            name="inputName"
            label="Input name / id"
            defaultValue={attrs.inputName}
            handleChange={handleChange}
          />

          <Input
            name="label"
            label="Label"
            defaultValue={attrs.label}
            handleChange={handleChange}
          />

          <Input
            type="checkbox"
            name="isPageHeading"
            label="Use field label as page title"
            defaultChecked={attrs.isPageHeading}
            handleChange={handleCheckboxToggle}
          />

          <Input
            name="hint"
            label="Hint (optional)"
            defaultValue={attrs.hint}
            handleChange={handleChange}
          />

          <Input
            type="select"
            name="inputWidth"
            label="Input width (optional)"
            options={inputWidths}
            defaultValue={attrs.inputWidth}
            handleChange={handleChange}
          />

          <Input
            name="prefix"
            label="Prefix (optional)"
            defaultValue={attrs.prefix}
            handleChange={handleChange}
          />

          <Input
            name="suffix"
            label="Suffix (optional)"
            defaultValue={attrs.suffix}
            handleChange={handleChange}
          />

          <Input
            type="select"
            name="inputMode"
            label="Input mode (optional)"
            options={inputModes}
            defaultValue={attrs.inputMode}
            handleChange={handleChange}
          />

          <Input
            type="select"
            name="autocomplete"
            label="Autocomplete (optional)"
            options={autoCompletes}
            defaultValue={attrs.autocomplete}
            handleChange={handleChange}
          />

          <Input
            type="checkbox"
            name="spellcheck"
            label="Spellcheck (optional)"
            defaultChecked={attrs.spellcheck}
            handleChange={handleCheckboxToggle}
          />
          <button className='govuk-!-margin-top-4' type="submit">Generate</button>
        </div>
      </form>
    </div>
  )
}

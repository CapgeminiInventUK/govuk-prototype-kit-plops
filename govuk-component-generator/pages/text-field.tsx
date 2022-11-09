import { SyntheticEvent, useState } from 'react'
import TextField from '../components/govuk/TextField';
import Input from '../components/Input';
import PageLayout from '../components/PageLayout';

const inputWidths = [
  { label: '20 character width', value: 'govuk-input--width-20' },
  { label: '10 character width', value: 'govuk-input--width-10' },
  { label: '5 character width', value: 'govuk-input--width-5' },
  { label: '4 character width', value: 'govuk-input--width-4' },
  { label: '3 character width', value: 'govuk-input--width-3' },
  { label: '2 character width', value: 'govuk-input--width-2' },
  { label: 'Full width', value: 'govuk-!-width-full' },
  { label: 'Three-quarters width', value: 'govuk-!-width-three-quarters' },
  { label: 'Two-thirds width', value: 'govuk-!-width-two-thirds' },
  { label: 'One-half width', value: 'govuk-!-width-one-half' },
  { label: 'One-third width', value: 'govuk-!-width-one-third' },
  { label: 'One-quarter width', value: 'govuk-!-width-one-quarter' },

]
export default function Component() {
  const [attrs, setAttrs] = useState({
    name: 'text-field-1', label: 'Label', useLabelAsPageTitle: true, hint: '', inputWidth: '', prefix: '', suffix: '',
  });

  const handleChange = (e: SyntheticEvent) => {
    const target = (e.target as HTMLInputElement);
    console.log('..........', target.name, target.value )
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

          <Input
            name="name"
            label="Name / id"
            defaultValue={attrs.name}
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
            name="useLabelAsPageTitle"
            label="Use field label as page title"
            defaultChecked={attrs.useLabelAsPageTitle}
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

          <button className='govuk-!-margin-top-4' type="submit">Generate</button>
        </div>
      </form>
    </div>
  )
}

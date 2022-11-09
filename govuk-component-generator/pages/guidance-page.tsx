import { SyntheticEvent, useState } from 'react'
import Button from '../components/govuk/Button';
import PageLayout from '../components/PageLayout';



export default function Component() {
  const [attrs, setAttrs] = useState({
    pageName: 'guidance-page',
    isStartButton: false,
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
          {
            attrs.isStartButton
            && (<Button
              {...attrs}
            />)
          }
        </PageLayout>
      </div>

      <form className="componentAttributesForm" action='/api/generate-page' method='post'>
        <div className="componentAttributes">
          <input type="hidden" name="plopfile" value="guidance-page" />
          <Input
            name="page-name"
            label="Page name"
            defaultValue={attrs.pageName}
            handleChange={handleChange}
          />

          <Input
            type="checkbox"
            name="isStartButton"
            label="With start button"
            defaultChecked={attrs.isStartButton}
            handleChange={handleCheckboxToggle}
          />

          <button className='govuk-!-margin-top-4' type="submit">Generate</button>
        </div>
      </form>
    </div>
  )
}

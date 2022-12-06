import Image from 'next/image';
import { SyntheticEvent, useState } from 'react'
import styles from '../styles/radios.module.css'
import Radios from '../components/govuk/Radios';
import Input from '../components/Input';
import PageLayout from '../components/PageLayout';
import DeleteIcon from '../public/assets/images/delete-icon.png';

export default function Component() {
  const [attrs, setAttrs] = useState({
    name: 'radio-input-1',
    label: 'Label',
    useLabelAsPageTitle: true,
    hint: '',
    inline: false,
    smaller: false,
    items: [{
      text: 'Option 1', value: 'option-1', hint: '', divider: false, dividerText: '',
    }],
  });

  const handleChange = (e: SyntheticEvent) => {
    const target = (e.target as HTMLInputElement);
    setAttrs({ ...attrs, [target.name]: target.value })
  };

  const handleCheckboxToggle = (e: SyntheticEvent) => {
    const target = (e.target as HTMLInputElement);
    setAttrs({ ...attrs, [target.name]: target.checked })
  }

  const handleAddNewItemClick = (e: SyntheticEvent) => {
    e.preventDefault();
    setAttrs({
      ...attrs,
      items: [...attrs.items, {
        text: 'Text', value: 'Value', hint: '', divider: false, dividerText: '',
      }],
    })
  }

  const handleRadioItemChange = (e: SyntheticEvent) => {
    type RadioItemKey = 'text' | 'value' | 'hint' | 'dividerText';
    const target = (e.target as HTMLInputElement);
    const parts = target.name.split('-');
    const index = Number(parts[2]);
    const items = [...attrs.items];
    items[index as number][(parts[1] as RadioItemKey)] = target.value;

    setAttrs({ ...attrs, items })
  };

  const handleRadioItemCheckboxToggle = (e: SyntheticEvent) => {
    type RadioItemKey = 'divider';
    const target = (e.target as HTMLInputElement);
    const parts = target.name.split('-');
    const index = Number(parts[2]);
    const items = [...attrs.items];
    items[index][(parts[1] as RadioItemKey)] = target.checked;
    setAttrs({ ...attrs, items })
  }

  return (
    <div className="main">
      <div className="componentContainer">
        <PageLayout>
          <Radios
            {...attrs}
          />
        </PageLayout>
      </div>

      <form className="componentAttributesForm" action='/api/generate-page' method='post'>
        <div className="componentAttributes">
          <input type="hidden" name="plopfile" value="radio-input-page" />
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
            type="checkbox"
            name="inline"
            label="Inline radios (optional)"
            defaultChecked={attrs.inline}
            handleChange={handleCheckboxToggle}
          />

          <Input
            type="checkbox"
            name="smaller"
            label="Smaller radios (optional)"
            defaultChecked={attrs.smaller}
            handleChange={handleCheckboxToggle}
          />

          <div className={styles.radioItemsContainer}>
            <h3 className="govuk-!-margin-top-2 govuk-!-margin-left-2 govuk-heading-s">Items</h3>
            {attrs.items.map((item, index) => (
              <div
                className={index % 2 === 0 ? styles.radioItemContainerEven : styles.radioItemContainerOdd}
                key={index}>

                <Input
                  type="checkbox"
                  name={`item-divider-${index}`}
                  label="Is divider? (optional)"
                  defaultChecked={item.divider}
                  handleChange={handleRadioItemCheckboxToggle}
                />

                {
                  item.divider ? (
                    <Input
                      name={`item-dividerText-${index}`}
                      label="Divider text"
                      defaultValue={item.dividerText}
                      handleChange={handleRadioItemChange}
                    />
                  ) : (
                    <>
                      <Input
                        name={`item-text-${index}`}
                        label="Text"
                        defaultValue={item.text}
                        handleChange={handleRadioItemChange}
                      />
                      <Input
                        name={`item-value-${index}`}
                        label="Value"
                        defaultValue={item.value}
                        handleChange={handleRadioItemChange}
                      />
                      <Input
                        name={`item-hint-${index}`}
                        label="Hint"
                        defaultValue={item.hint}
                        handleChange={handleRadioItemChange}
                      />

                      <Image
                        id={`item-value-${index}`}
                        src={DeleteIcon}
                        width={25}
                        height={25}
                        alt="Delete this item" />
                    </>
                  )
                }
              </div>
            ))}
            <button
              className={styles.addNewItemButton}
              onClick={handleAddNewItemClick}>
              Add new item
            </button>
          </div>

          <button className='govuk-!-margin-top-4' type="submit">Generate</button>
        </div>
      </form >
    </div >
  )
}

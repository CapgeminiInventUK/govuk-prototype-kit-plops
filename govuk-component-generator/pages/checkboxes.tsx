import { SyntheticEvent, useState } from 'react'
import styles from '../styles/checkboxes.module.css'
import Image from 'next/image';
import Checkboxes from '../components/govuk/Checkboxes';
import DeleteIcon from '../public/assets/images/delete-icon.png';

const Input = (props) => (
  props.type === 'checkbox' ? (
    <>
      <label className="govuk-!-margin-top-3">
        <input
          id={props.name}
          name={props.name}
          type="checkbox"
          defaultChecked={props.defaultChecked}
          onChange={props.handleChange} />
        {props.label}
      </label>
    </>
  ) : (
    <>
      <label
        htmlFor={props.name}
        className="govuk-!-margin-top-3"
      >
        {props.label}
      </label>
      <input
        id={props.name}
        name={props.name}
        type="text"
        defaultValue={props.defaultValue}
        onChange={props.handleChange} />
    </>
  )
);

export default function Component() {
  const [attrs, setAttrs] = useState({
    name: 'checkboxes-1', label: 'Label', useLabelAsPageTitle: true, hint: '', fieldClasses: '', items: [{ text: 'Some test', value: '1' }],
  });

  const handleChange = (e: SyntheticEvent) => {
    const target = (e.target as HTMLInputElement);
    setAttrs({ ...attrs, [target.name]: target.value })
  };

  const handleCheckboxToggle = (e: SyntheticEvent) => {
    const target = (e.target as HTMLInputElement);
    setAttrs({ ...attrs, [target.name]: target.checked })
  }

  const handleAddNewItemClick = () => {
    setAttrs({ ...attrs, items: [...attrs.items, { text: 'Text', value: 'Value' }] })
  }

  const handleCheckboxItemChange = (e: SyntheticEvent) => {
    const target = (e.target as HTMLInputElement);
    const parts = target.name.split('-');
    const index = Number(parts[2]);
    const items = [...attrs.items];
    items[index][parts[1]] = target.value;
    setAttrs({ ...attrs, items })
  };

  return (
    <div className="main">
      <div className="componentContainer">
        <Checkboxes
          {...attrs}
        />
      </div>

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
          name="fieldClasses"
          label="Field classes (optional)"
          defaultValue={attrs.fieldClasses}
          handleChange={handleChange}
        />

        <div className={styles.checkboxItemsContainer}>
          <label className="govuk-!-margin-top-3">Items</label>
          {attrs.items.map((item, index) => (
            <div className={styles.checkboxItemRow} key={index}>
              <div className={styles.checkboxItemText}>
                <Input
                  name={`item-text-${index}`}
                  label="Text"
                  defaultValue={item.text}
                  handleChange={handleCheckboxItemChange}
                />
              </div>

              <div className={styles.checkboxItemValue}>
                <Input
                  name={`item-value-${index}`}
                  label="Value"
                  defaultValue={item.value}
                  handleChange={handleCheckboxItemChange}
                />
              </div>
              <Image
                id={`item-value-${index}`}
                src={DeleteIcon}
                width={25}
                height={25}
                alt="Delete this item" />
            </div>
          ))}
          <button
            className={styles.addNewItemButton}
            onClick={handleAddNewItemClick}>
            Add new item
          </button>
        </div>
      </div>
    </div>
  )
}

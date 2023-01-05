const Input = (props) => {
  switch (props.type) {
  case 'checkbox':
    return (
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
    );
  case 'select':
    return (<>
      <label className="govuk-!-margin-top-3" htmlFor={props.name}>
        {props.label}
      </label>
      <select id={props.name} name={props.name} onChange={props.handleChange}>
        <option value="">Select</option>
        {props.options.map((option: {value:string, label: string}) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>))}
      </select>
    </>
    );

  default:
    return (
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
  }
};

export default Input;

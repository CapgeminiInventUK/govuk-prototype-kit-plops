const Checkboxes = (props) => (
  <div className="govuk-form-group">
    <fieldset className="govuk-fieldset" aria-describedby={`${props.name}-hint`}>
      <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
        {
          props.useLabelAsPageTitle
            ? (<h1 className="govuk-fieldset__heading">
              {props.label}
            </h1>)
            : props.label
        }
      </legend>
      {
        props.hint
          && (<div id={`${props.name}-hint`} className="govuk-hint">
            {props.hint}
          </div>)
      }
      <div className="govuk-checkboxes" data-module="govuk-checkboxes">
        {
          props.items.map((item, index) => {
            const itemId = index === 0 ? props.name : `${props.name}-${index}`;
            return (
              <div className="govuk-checkboxes__item" key={index}>
                <input className="govuk-checkboxes__input" id={itemId} name={props.name} type="checkbox" value={item.value} />
                <label className="govuk-label govuk-checkboxes__label" htmlFor={itemId}>
                  {item.text}
                </label>
              </div>
            )
          })
        }
      </div>
    </fieldset>
  </div>
);

export default Checkboxes;

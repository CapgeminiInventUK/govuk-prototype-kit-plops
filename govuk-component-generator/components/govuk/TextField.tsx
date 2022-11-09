const TextField = (props) => (
  <div className="govuk-form-group">
    {props.useLabelAsPageTitle ? (<h1 className="govuk-label-wrapper">
      <label className="govuk-label govuk-label--l" htmlFor={props.name}>
        {props.label}
      </label>
    </h1>) : (<label className="govuk-label govuk-label--l" htmlFor={props.name}>
      {props.label}
    </label>)
    }

    {
      props.hint
        && (<div className="govuk-hint" id={`${props.name}-hint`}>
          {props.hint}
        </div>)
    }

    {
      (props.prefix || props.suffix) ? (
        <div className="govuk-input__wrapper">
          {props.prefix && <div className="govuk-input__prefix" aria-hidden="true">{props.prefix}</div>}
          <input className={`govuk-input ${props.inputWidth}`} id={props.name} name={props.name} type="text" spellCheck="false" aria-describedby={`${props.name}-hint`}/>
          {props.suffix && <div className="govuk-input__suffix" aria-hidden="true">{props.suffix}</div>}
        </div>
      )
        : (
          <input className={`govuk-input ${props.inputWidth}`} id={props.name} name={props.name} type="text" aria-describedby={`${props.name}-hint`} />
        )
    }
  </div>)

export default TextField;

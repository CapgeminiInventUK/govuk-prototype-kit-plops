export type InputMode = 'search'
  | 'text'
  | 'email'
  | 'tel'
  | 'url'
  | 'none'
  | 'numeric'
  | 'decimal'
  | undefined;

export type InputWidth = 'govuk-!-width-full'
  | 'govuk-!-width-three-quarters'
  | 'govuk-!-width-two-thirds'
  | 'govuk-!-width-one-half'
  | 'govuk-!-width-one-third'
  | 'govuk-!-width-one-quarter'
  | 'govuk-input--width-20'
  | 'govuk-input--width-10'
  | 'govuk-input--width-5'
  | 'govuk-input--width-4'
  | 'govuk-input--width-3'
  | 'govuk-input--width-2'
  | '';

export type TextFieldProps = {
  name: string,
  label: string,
  useLabelAsPageTitle: boolean,
  hint: string,
  inputWidth: InputWidth,
  prefix: string,
  suffix: string,
  inputMode: InputMode,
  autoComplete: string,
  spellCheck: boolean,
};

const TextField = (props: TextFieldProps) => (
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
          <input className={`govuk-input ${props.inputWidth}`} id={props.name} name={props.name} type="text" inputMode={props.inputMode || undefined} autoComplete={props.autoComplete || undefined} spellCheck={props.spellCheck} aria-describedby={props.hint ? `${props.name}-hint` : undefined} />
          {props.suffix && <div className="govuk-input__suffix" aria-hidden="true">{props.suffix}</div>}
        </div>
      )
        : (
          <input className={`govuk-input ${props.inputWidth}`} id={props.name} name={props.name} type="text" inputMode={props.inputMode || undefined} autoComplete={props.autoComplete || undefined} spellCheck={props.spellCheck} aria-describedby={props.hint ? `${props.name}-hint` : undefined} />
        )
    }
  </div>)

export default TextField;

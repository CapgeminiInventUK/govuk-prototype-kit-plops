export type RadiosProps = {
  name: string,
  label: string,
  useLabelAsPageTitle: boolean,
  hint: string,
  inline: boolean,
  smaller: boolean,
  items: [{
    text: string,
    value: string,
    hint: string,
    divider: boolean,
    dividerText: boolean,
  }],
}

const Radios = (props: RadiosProps) => (<div className="govuk-form-group">
  <fieldset className="govuk-fieldset">
    <legend className={`govuk-fieldset__legend govuk-fieldset__legend--${props.smaller ? 'm' : 'l'}`} aria-describedby={props.hint ? `${props.name}-hint` : undefined}>
      <h1 className="govuk-fieldset__heading">
        {props.label}
      </h1>
    </legend>

    {
      props.hint
      && (<div id={`${props.name}-hint`} className="govuk-hint">
        {props.hint}
      </div>)
    }

    <div className={`govuk-radios ${props.inline ? 'govuk-radios--inline' : ''} ${props.smaller ? 'govuk-radios--small' : ''}`} data-module="govuk-radios">
      {
        props.items.map((item, index) => {
          const itemId = index === 0 ? props.name : `${props.name}-${index + 1}`;
          const isDivider = !!item.divider;
          return (
            isDivider ? <div className="govuk-radios__divider">{item.dividerText}</div>
              : (
                <div key={index} className="govuk-radios__item">
                  <input className="govuk-radios__input" id={itemId} name={props.name} type="radio" value={item.value} aria-describedby={`${itemId}-item-hint`} />
                  <label className="govuk-label govuk-radios__label" htmlFor={itemId}>
                    {item.text}
                  </label>
                  {
                    item.hint && (<div id={`${itemId}-item-hint`} className="govuk-hint govuk-radios__hint">
                      {item.hint}
                    </div>)
                  }
                </div>
              )
          )
        })
      }
    </div>
  </fieldset>
</div >)

export default Radios;

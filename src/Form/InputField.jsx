/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */

export default function InputField({
  name,
  label,
  type = 'text',
  error,
  ...restProps
}) {
  return (
    <div role="group" className="form-control">
      <label id={`${name}-label`} htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        aria-describedby={`${name}-helptext`}
        className="form-input"
        {...restProps}
      />
      {error && <p className="error">{error}</p>}
    </div>
  )
}

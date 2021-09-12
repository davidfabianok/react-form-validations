/* eslint-disable jsx-a11y/label-has-associated-control */
import InputField from './InputField'
import useForm from './useForm'
import validations from './validations'
import './form.css'


const profilesList = [
  {key: 1, value: 'DEV', name: 'Developer'},
  {key: 2, value: 'TL', name: 'Technical lead'},
  {key: 3, value: 'TEST', name: 'Tester'},
  {key: 4, value: 'ANL', name: 'Analista'},
]

const INITIAL_FORM_STATE = {
  name: '',
  surname: '',
  email: '',
  age: '',
  profile: '',
}

export default function Form() {
  const {fields, errors, isValidated, handleSubmit, onChange, onBlur} =
    useForm(INITIAL_FORM_STATE, validations)

  return (
    <div className="container">
      <pre>
        Form values:
        <br />
        {JSON.stringify(fields, null, 2)}
        <br />
        Form Errors:
        <br />
        {JSON.stringify(errors, null, 2)}
      </pre>

      <form autoComplete="off" onSubmit={handleSubmit} className="form">
        <InputField
          name="name"
          label="Nombre:"
          placeholder="Ingresa nombre..."
          value={fields.name}
          error={errors.name}
          onChange={onChange}
          onBlur={onBlur}
        />

        <InputField
          name="surname"
          label="Apellido:"
          placeholder="Ingresa apellido..."
          value={fields.surname}
          error={errors.surname}
          onChange={onChange}
          onBlur={onBlur}
        />

        <InputField
          name="email"
          type="email"
          label="Email:"
          placeholder="example@email.com"
          value={fields.email}
          error={errors.email}
          onChange={onChange}
          onBlur={onBlur}
        />

        <InputField
          name="age"
          type="number"
          label="Edad:"
          placeholder="Ingresa Edad..."
          value={fields.age}
          error={errors.age}
          onChange={onChange}
          onBlur={onBlur}
        />

        <div role="group" className="form-control">
          <label id="profile-label" htmlFor="profile" className="form-label">
            Profesión:
          </label>
          <select
            id="profile"
            name="profile"
            className="form-input"
            onChange={onChange}
            onBlur={onBlur}
            value={fields.profile}
          >
            <option value="">Seleccione un profesión</option>
            {profilesList.map(({key, name, value}) => (
              <option key={key} value={value}>
                {name}
              </option>
            ))}
          </select>
          {errors.profile && <p className="error">{errors.profile}</p>}
        </div>

        <div role="group" className="form-control__end">
          <button type="submit" className="button" disabled={!isValidated}>
            Enviar
          </button>
        </div>
      </form>
    </div>
  )
}

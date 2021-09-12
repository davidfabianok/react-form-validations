/* eslint-disable prefer-const */
import {useCallback, useEffect, useState} from 'react'

function validateField(field, setErrors, validations) {
  let isValid = true
  let errorMessage = {}

  const {name, value} = field

  const validation = validations[name]
  if (validation?.required?.value && !value) {
    isValid = false
    errorMessage[name] = validation?.required?.message
  }

  const pattern = validation?.pattern
  if (pattern?.value && !RegExp(pattern.value).test(value)) {
    isValid = false
    errorMessage[name] = pattern.message
  }

  const custom = validation?.custom
  if (custom?.isValid && !custom.isValid(value)) {
    isValid = false
    errorMessage[name] = custom.message
  }

  setErrors(prevFormErrors => ({
    ...prevFormErrors,
    [name]: isValid ? '' : errorMessage[name],
  }))
}

export default function useForm(initialFormState, validations, sanitizeFn) {
  const [fields, setFields] = useState(initialFormState)
  const [errors, setErrors] = useState(initialFormState)
  const [isValidated, setIsValidated] = useState(false)

  const onChange = useCallback(
    event => {
      const {name, value} = event.target
      const currentValue = sanitizeFn ? sanitizeFn(value) : value

      setFields({
        ...fields,
        [name]: currentValue,
      })
    },
    [fields, sanitizeFn],
  )

  const onBlur = useCallback(
    event => {
      const field = event.target
      validateField(field, setErrors, validations)
    },
    [validations],
  )

  const validateForm = useCallback(
    elements => {
      const listFieldNames = Object.keys(fields)

      listFieldNames.forEach(field => {
        const existField = Object.prototype.hasOwnProperty.call(elements, field)
        if (!existField) {
          throw new Error(`No se encontro el campo ${field} en el formulario`)
        }

        const element = elements[field]
        validateField(element, setErrors, validations)
      })
    },
    [fields, validations],
  )

  const handleSubmit = useCallback(
    event => {
      event.preventDefault()
      const {elements} = event.currentTarget
      validateForm(elements)
    },
    [validateForm],
  )

  useEffect(() => {
    const hashError = Object.values(errors).find(error => !!error)
    setIsValidated(!hashError)
  }, [errors])

  return {
    fields,
    errors,
    isValidated,
    onChange,
    onBlur,
    handleSubmit,
  }
}

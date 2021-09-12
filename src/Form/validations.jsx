const validations = {
  name: {
    required: {
      value: true,
      message: 'El nombre es requerido',
    },
    pattern: {
      value: '^[A-Za-z]*$',
      message: 'Tu nombre es invalido',
    },
  },
  surname: {
    required: {
      value: true,
      message: 'El apellido es requerido',
    },
    pattern: {
      value: '^[A-Za-z]*$',
      message: "You're not allowed to...",
    },
  },
  email: {
    required: {
      value: true,
      message: 'El email es requerido',
    },
    pattern: {
      value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: "Email invalido",
    },
  },
  age: {
    custom: {
      isValid: value => parseInt(value, 10) > 17,
      message: 'Tienes que ser mayor de edad.',
    },
  },
  password: {
    required: {
      value: true,
      message: 'This field is required',
    },
    custom: {
      isValid: value => value.length > 6,
      message: 'The password needs to be at...',
    },
  },
  profile: {
    required: {
      value: true,
      message: 'Elija un profesión',
    },
  },
}

export default validations

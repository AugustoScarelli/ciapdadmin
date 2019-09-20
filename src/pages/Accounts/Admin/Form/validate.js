import validateUtils from 'utils/validate'

// Realtime validate
export default (values) => {
  const errors = {}

  if (!values.image || !validateUtils.imgur(values.image)) {
    errors.image = 'Defina uma foto para o administrador'
  }

  if (!values.name) {
    errors.name = 'Defina o nome do administrador'
  } else if (values.name.length < 8) {
    errors.name = 'O nome do administrador deve conter pelo menos 8 letras'
  } else if (values.name.length > 48) {
    errors.name = 'O nome do administrador não deve ultrapassar 48 letras'
  } else if (!validateUtils.commonText(values.name)) {
    errors.name = 'O nome do administrador deve conter apenas letras'
  }

  if (!values.rf) {
    errors.rf = 'Defina o RF do administrador'
  } else if (!validateUtils.rf(values.rf)) {
    errors.rf = 'Digite um RF válido'
  }

  if (!values.email) {
    errors.email = 'Defina o e-mail do administrador'
  } else if (!validateUtils.email(values.email)) {
    errors.email = 'Digite um e-mail válido'
  }

  if (!values.password) {
    errors.password = 'Defina a senha do administrador'
  } else if (values.password.length < 8) {
    errors.password = 'A senha deve conter pelo menos 8 caracteres'
  }

  return errors
}

export const stepValidate = formErrors => step => {
  switch (step) {
    case 1:
      if (formErrors.hasOwnProperty('image')) return true
      if (formErrors.hasOwnProperty('name')) return true
      if (formErrors.hasOwnProperty('rf')) return true
      if (formErrors.hasOwnProperty('email')) return true
      if (formErrors.hasOwnProperty('password')) return true
      return false
    default:
      return false
  }
}

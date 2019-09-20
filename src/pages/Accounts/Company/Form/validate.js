import validateUtils from 'utils/validate'

// Realtime validate
export default (values) => {
  const errors = {}

  if (!values.image || !validateUtils.imgur(values.image)) {
    errors.image = 'Defina uma foto para a empresa'
  }

  if (!values.name) {
    errors.name = 'Defina a razão social da empresa'
  } else if (values.name.length < 8) {
    errors.name = 'A razão social da empresa deve conter pelo menos 8 letras'
  } else if (values.name.length > 48) {
    errors.name = 'A razão social da empresa não deve ultrapassar 48 letras'
  } else if (!validateUtils.commonText(values.name)) {
    errors.name = 'A razão social da empresa deve conter apenas letras'
  }

  if (!values.cnpj) {
    errors.cnpj = 'Defina o CNPJ da empresa'
  } else if (!validateUtils.cnpj(values.cnpj)) {
    errors.cnpj = 'Digite um cnpj válido'
  }

  if (!values.email) {
    errors.email = 'Defina o e-mail da empresa'
  } else if (!validateUtils.email(values.email)) {
    errors.email = 'Digite um e-mail válido'
  }

  if (!values.password) {
    errors.password = 'Defina a senha da empresa'
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
      if (formErrors.hasOwnProperty('cnpj')) return true
      if (formErrors.hasOwnProperty('email')) return true
      if (formErrors.hasOwnProperty('password')) return true
      return false
    default:
      return false
  }
}

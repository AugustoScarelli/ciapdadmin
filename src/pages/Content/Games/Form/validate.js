import validateUtils from 'utils/validate'

// Realtime validate
export default (values) => {
  const errors = {}

  if (!values.image || !validateUtils.imgur(values.image)) {
    errors.image = 'Defina uma foto para o jogo'
  }

  if (!values.name) {
    errors.name = 'Defina o título do jogo'
  } else if (values.name.length < 5) {
    errors.name = 'O título do jogo deve conter pelo menos 5 letras'
  } else if (values.name.length > 48) {
    errors.name = 'O título do jogo não deve ultrapassar 48 letras'
  } else if (!validateUtils.commonText(values.name)) {
    errors.name = 'O título do jogo deve conter apenas letras'
  }

  if (!values.url) {
    errors.url = 'Defina a URL do jogo'
  }

  if (!values.description) {
    errors.description = 'Defina a descrição'
  } else if (values.description.length < 8) {
    errors.description = 'A descrição deve conter pelo menos 8 caracteres'
  }

  return errors
}

export const stepValidate = formErrors => step => {
  switch (step) {
    case 1:
      if (formErrors.hasOwnProperty('image')) return true
      if (formErrors.hasOwnProperty('name')) return true
      if (formErrors.hasOwnProperty('url')) return true
      if (formErrors.hasOwnProperty('description')) return true
      return false
    default:
      return false
  }
}

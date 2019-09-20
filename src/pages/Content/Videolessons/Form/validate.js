import validateUtils from 'utils/validate'

// Realtime validate
export default (values) => {
  const errors = {}

  if (!values.image || !validateUtils.imgur(values.image)) {
    errors.image = 'Defina uma foto para o administrador'
  }

  if (!values.name) {
    errors.name = 'Defina o título da vaga de emprego'
  } else if (values.name.length < 8) {
    errors.name = 'O título da vaga de emprego deve conter pelo menos 8 letras'
  } else if (values.name.length > 48) {
    errors.name = 'O título da vaga de emprego não deve ultrapassar 48 letras'
  } else if (!validateUtils.commonText(values.name)) {
    errors.name = 'O título da vaga de emprego deve conter apenas letras'
  }

  if (!values.url) {
    errors.url = 'Defina a URL do vídeo'
  } else if (!validateUtils.ytbUrl(values.url)) {
    errors.url = 'Digite uma URL válida'
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

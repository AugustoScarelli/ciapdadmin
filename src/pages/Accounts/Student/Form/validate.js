import validateUtils from 'utils/validate'

// Realtime validate
export default (values) => {
  const errors = {}

  if (!values.image || !validateUtils.imgur(values.image)) {
    errors.image = 'Defina uma foto para o aluno'
  }

  if (!values.name) {
    errors.name = 'Defina o nome do aluno'
  } else if (values.name.length < 8) {
    errors.name = 'O nome do aluno deve conter pelo menos 8 letras'
  } else if (values.name.length > 48) {
    errors.name = 'O nome do aluno não deve ultrapassar 48 letras'
  } else if (!validateUtils.commonText(values.name)) {
    errors.name = 'O nome do aluno deve conter apenas letras'
  }

  if (!values.email) {
    errors.email = 'Defina o e-mail do aluno'
  } else if (!validateUtils.email(values.email)) {
    errors.email = 'Digite um e-mail válido'
  }

  if (!values.password) {
    errors.password = 'Defina a senha do aluno'
  } else if (values.password.length < 8) {
    errors.password = 'A senha deve conter pelo menos 8 caracteres'
  }

  if (!values.cpf) {
    errors.cpf = 'Defina o CPF do aluno'
  } else if (!validateUtils.cpf(values.cpf)) {
    errors.cpf = 'Digite um CPF válido'
  }

  if (!values.birthdate) {
    errors.birthdate = 'Defina a data de nascimento do aluno'
  } else if (!validateUtils.date(values.birthdate)) {
    errors.birthdate = 'Digite uma data de nascimento válida'
  } else if (!validateUtils.birthdate(values.birthdate, { minAge: 14 })) {
    errors.birthdate = 'O aluno deve ter uma idade entre 14 e 120 anos'
  }

  if (!values.phone) {
    errors.phone = 'Defina o telefone do aluno'
  } else if (!validateUtils.phone(values.phone)) {
    errors.phone = 'Digite um telefone válido'
  }

  if (!values.cid) {
    errors.cid = 'Defina o CID do aluno'
  } else if (!validateUtils.cid(values.cid)) {
    errors.cid = `Digite um CID no formato "A00.0"`
  }

  if (!values.cep) {
    errors.cep = 'Digite um CEP válido'
  }

  if (!values.houseNumber) {
    errors.houseNumber = 'Defina o número da casa'
  } else if (!validateUtils.houseNumber(values.houseNumber)) {
    errors.houseNumber = 'O número da casa não deve ultrapassar 8 dígitos'
  }

  if (values.others) {
    if (!validateUtils.others(values.others)) {
      errors.others = 'As informações adicionais devem ter um máximo de 128 letras'
    }
  }

  return errors
}

export const stepValidate = formErrors => step => {
  switch (step) {
    case 1:
      if (formErrors.hasOwnProperty('image')) return true
      if (formErrors.hasOwnProperty('name')) return true
      if (formErrors.hasOwnProperty('email')) return true
      if (formErrors.hasOwnProperty('password')) return true
      return false
    case 2:
      if (formErrors.hasOwnProperty('cpf')) return true
      if (formErrors.hasOwnProperty('birthdate')) return true
      if (formErrors.hasOwnProperty('phone')) return true
      if (formErrors.hasOwnProperty('cid')) return true
      return false
    case 3:
      if (formErrors.hasOwnProperty('cep')) return true
      if (formErrors.hasOwnProperty('houseNumber')) return true
      if (formErrors.hasOwnProperty('others')) return true
      return false
    default:
      return false
  }
}

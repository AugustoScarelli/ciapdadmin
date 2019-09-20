const responses = {
  'auth/weak-password': 'Digite uma senha com pelo menos 8 caracteres',
  'auth/operation-not-allowed': 'Operação não permitida, contate o administrador',
  'auth/email-already-in-use': 'O e-mail digitado já está em uso',
  'auth/invalid-email': 'O e-mail digitado é inválido',
  'general/invalid-role': 'Cargo inválido, contate um administrador',
  'general/invalid-type': 'Tipo inválido, contate um administrador',
  'auth/user-not-found': 'A conta digitada não existe',
  'firestore/unknown-error': 'Erro ao acessar as informações de sua conta, contate um administrador',
}

export default (type = 'default') => (
  responses.hasOwnProperty(type)
    ? responses[type]
    : 'Serviço indisponível, tente novamente mais tarde'
)

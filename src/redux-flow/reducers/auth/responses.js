const responses = {
  'auth/weak-password': 'Digite uma senha com pelo menos 8 caracteres',
  'auth/operation-not-allowed': 'Operação não permitida, contate o administrador',
  'auth/email-already-in-use': 'O e-mail digitado já está em uso',
  'auth/invalid-email': 'O e-mail digitado é inválido',
  'auth/user-disabled': 'A conta digitada está desativada pela administração',
  'auth/email-not-verified': 'O e-mail digitado não está ativo. Siga as instruções enviadas por e-mail para a ativação',
  'auth/user-not-found': 'Não foi possível encontrar a sua conta do CIAPD',
  'auth/wrong-password': 'O e-mail e/ou a senha digitados estão incorretos',
  'auth/too-many-requests': 'Uma atividade incomum foi detectada. Tente novamente em alguns segundos',
  'auth/missing-permissions': 'A combinação digitada não pertence a área administrativa',
  'firestore/unknown-error': 'Erro ao acessar as informações de sua conta, contate um administrador',
  'firestore/user-not-found': 'O e-mail e senha digitados não estão cadastrados no Firestore, contate um administrador',
}

export default (type = 'default') => (
  responses.hasOwnProperty(type)
    ? responses[type]
    : 'Serviço indisponível, tente novamente mais tarde'
)

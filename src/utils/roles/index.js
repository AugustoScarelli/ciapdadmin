export default role => {
  switch (role) {
    case 'student-enabled':
      return 'Aluno'
    case 'student-disabled':
      return 'Aluno (desativado)'
    case 'student-deleted':
      return 'Aluno (na fila de exclusão)'
    case 'admin-enabled':
      return 'Administrador'
    case 'admin-disabled':
      return 'Administrador (desativado)'
    case 'admin-deleted':
      return 'Administrador (na fila de exclusão)'
    case 'company-enabled':
      return 'Empresa'
    case 'company-disabled':
      return 'Empresa (desativada)'
    case 'company-deleted':
      return 'Empresa (na fila de exclusão)'
    default:
      throw new Error('Invalid role')
  }
}
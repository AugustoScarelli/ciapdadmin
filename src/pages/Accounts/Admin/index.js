import React from 'react'

import Container from 'components/Container'
import AccountManager from 'components/AccountManager'
import AdminForm from './Form'
import { stepValidate } from './Form/validate'

const tabStruct = [
  {
    title: 'Em operação',
    component: (
      <AccountManager
        accountType='admin'
        accountVariant='enabled'
        formSteps={2}
        ManagerForm={AdminForm}
        managerValidation={stepValidate}
      />
    ),
  },
  {
    title: 'Desativados',
    component: (
      <AccountManager
        accountType='admin'
        accountVariant='disabled'
      />
    ),
  },
  {
    title: 'Removidos',
    component: (
      <AccountManager
        accountType='admin'
        accountVariant='deleted'
      />
    ),
  },
]

const List = () => <Container activeItem='Administradores' tabStruct={tabStruct} />

export default List

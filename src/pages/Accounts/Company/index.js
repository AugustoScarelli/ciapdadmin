import React from 'react'

import Container from 'components/Container'
import AccountManager from 'components/AccountManager'
import CompanyForm from './Form'
import { stepValidate } from './Form/validate'

const tabStruct = [
  {
    title: 'Em operação',
    component: (
      <AccountManager
        accountType='company'
        accountVariant='enabled'
        formSteps={2}
        ManagerForm={CompanyForm}
        managerValidation={stepValidate}
      />
    ),
  },
  {
    title: 'Desativados',
    component: (
      <AccountManager
        accountType='company'
        accountVariant='disabled'
      />
    ),
  },
  {
    title: 'Removidos',
    component: (
      <AccountManager
        accountType='company'
        accountVariant='deleted'
      />
    ),
  },
]

const List = () => <Container activeItem='Empresas' tabStruct={tabStruct} />

export default List

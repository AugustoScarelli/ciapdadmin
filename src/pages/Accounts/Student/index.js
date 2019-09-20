import React from 'react'

import Container from 'components/Container'
import AccountManager from 'components/AccountManager'
import StudentForm from './Form'
import {stepValidate} from './Form/validate'

const tabStruct = [
    {
        title: 'Em operação',
        component: (
            <AccountManager
                accountType='student'
                accountVariant='enabled'
                formSteps={4}
                ManagerForm={StudentForm}
                managerValidation={stepValidate}
            />
        ),
    },
    {
        title: 'Desativados',
        component: (
            <AccountManager
                accountType='student'
                accountVariant='disabled'
            />
        ),
    },
    {
        title: 'Removidos',
        component: (
            <AccountManager
                accountType='student'
                accountVariant='deleted'
            />
        ),
    },
]

const List = () => <Container activeItem='Alunos' tabStruct={tabStruct}/>

export default List

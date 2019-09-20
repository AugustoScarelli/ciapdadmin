import React from 'react'

import Container from 'components/Container'
import ContentManager from 'components/ContentManager'
import JobForm from './Form'
import { stepValidate } from './Form/validate'

const tabStruct = [
  {
    title: 'Em operação',
    component: (
      <ContentManager
        type='job'
        formSteps={2}
        ManagerForm={JobForm}
        managerValidation={stepValidate}
      />
    ),
  },
]

const List = () => <Container activeItem='Vagas de emprego' tabStruct={tabStruct} />

export default List

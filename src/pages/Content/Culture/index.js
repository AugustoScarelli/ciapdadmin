import React from 'react'

import Container from 'components/Container'
import ContentManager from 'components/ContentManager'
import CultureForm from './Form'
import { stepValidate } from './Form/validate'

const tabStruct = [
  {
    title: 'Em operação',
    component: (
      <ContentManager
        type='culture'
        formSteps={2}
        ManagerForm={CultureForm}
        managerValidation={stepValidate}
      />
    ),
  },
]

const List = () => <Container activeItem='Eventos culturais' tabStruct={tabStruct} />

export default List

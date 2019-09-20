import React from 'react'

import Container from 'components/Container'
import ContentManager from 'components/ContentManager'
import CourseForm from './Form'
import { stepValidate } from './Form/validate'

const tabStruct = [
  {
    title: 'Em operação',
    component: (
      <ContentManager
        type='course'
        formSteps={2}
        ManagerForm={CourseForm}
        managerValidation={stepValidate}
      />
    ),
  },
]

const List = () => <Container activeItem='Cursos' tabStruct={tabStruct} />

export default List

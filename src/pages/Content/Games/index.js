import React from 'react'

import Container from 'components/Container'
import ContentManager from 'components/ContentManager'
import Gamesform from './Form'
import { stepValidate } from './Form/validate'

const tabStruct = [
  {
    title: 'Em operação',
    component: (
      <ContentManager
        type='game'
        formSteps={2}
        ManagerForm={Gamesform}
        managerValidation={stepValidate}
      />
    ),
  },
]

const List = () => <Container activeItem='Jogos' tabStruct={tabStruct} />

export default List

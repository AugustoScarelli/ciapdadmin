import React from 'react'

import Container from 'components/Container'
import ContentManager from 'components/ContentManager'
import VideolessonsForm from './Form'
import { stepValidate } from './Form/validate'

const tabStruct = [
  {
    title: 'Em operação',
    component: (
      <ContentManager
        type='video'
        formSteps={2}
        ManagerForm={VideolessonsForm}
        managerValidation={stepValidate}
      />
    ),
  },
]

const List = () => <Container activeItem='Videoaulas' tabStruct={tabStruct} />

export default List

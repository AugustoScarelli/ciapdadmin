import React from 'react'
import * as route from 'utils/routes'

import AssignmentIcon from '@material-ui/icons/Assignment'
import PersonIcon from '@material-ui/icons/Person'
import SecurityIcon from '@material-ui/icons/Security'
import GroupIcon from '@material-ui/icons/Group'
import WorkIcon from '@material-ui/icons/Work'
import PaletteIcon from '@material-ui/icons/Palette'
import BookIcon from '@material-ui/icons/Book'
import PlayIcon from '@material-ui/icons/PlayCircleFilled'
import GamepadIcon from '@material-ui/icons/VideogameAsset'

const navigatorStruct = [
  {
    id: 'Principal',
    children: [
      {
        id: 'Currículos',
        uri: route.mainRoutes.curriculumManager,
        icon: <AssignmentIcon />,
        disabled: false,
      },
    ],
  },
  {
    id: 'Contas',
    children: [
      {
        id: 'Alunos',
        uri: route.accountRoutes.studentManager,
        icon: <PersonIcon />,
        disabled: false,
      },
      {
        id: 'Administradores',
        uri: route.accountRoutes.adminManager,
        icon: <SecurityIcon />,
        disabled: false,
      },
      {
        id: 'Empresas',
        uri: route.accountRoutes.companyManager,
        icon: <GroupIcon />,
        disabled: false,
      },
    ],
  },
  {
    id: 'Conteúdo',
    children: [
      {
        id: 'Vagas de Emprego',
        uri: route.contentRoutes.jobs,
        icon: <WorkIcon />,
        disabled: false,
      },
      {
        id: 'Eventos Culturais',
        uri: route.contentRoutes.culture,
        icon: <PaletteIcon />,
        disabled: false,
      },
      {
        id: 'Cursos',
        uri: route.contentRoutes.courses,
        icon: <BookIcon />,
        disabled: false,
      },
      {
        id: 'Video Aulas',
        uri: route.contentRoutes.videoLessons,
        icon: <PlayIcon />,
        disabled: false,
      },
      {
        id: 'Jogos',
        uri: route.contentRoutes.games,
        icon: <GamepadIcon />,
        disabled: false,
      }
    ],
  },
]

// Make this with pure functions later
export default (activeItem = '') => {
  try {
    for (let i = 0; i < navigatorStruct.length; i++) {
      for (let j = 0; j < navigatorStruct[i].children.length; j++) {
        if (activeItem === navigatorStruct[i].children[j].id) {
          navigatorStruct[i].children[j].active = true
        } else {
          navigatorStruct[i].children[j].active = false
        }
      }
    }

    return navigatorStruct
  } catch (err) {
    console.error(err)
    alert('Erro na estruturação do menu.\nContate o administrador.')
  }
}

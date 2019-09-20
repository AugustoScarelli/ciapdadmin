import React from 'react'

import LoginContainer from 'components/LoginContainer'
import Typography from '@material-ui/core/Typography'
import { unstable_Box as Box } from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'

import padlock from 'media/padlock.svg'
import { loginRoutes } from 'utils/routes'

const LostCredentials = () => (
  <LoginContainer>
    <section>
      <div>
        <Typography
          align='center'
          gutterBottom
          variant='h5'
        >
          Esqueci meus dados
        </Typography>
        <Typography
          align='center'
          gutterBottom
          variant='subtitle1'
        >
          Como posso recuperá-los?
        </Typography>
      </div>
      <Box
        display='flex'
        justifyContent='center'
        paddingTop={4}
      >
        <img alt='Padlock' src={padlock} />
      </Box>
      <Box paddingTop={4}>
        <Typography gutterBottom variant='body1'>
          Para recuperar as suas informações de acesso é muito simples. Basta
          contatar o superadministrador do CIAPD e informar a situação, então ele
          irá trocar a sua senha.
        </Typography>
      </Box>
      <Box
        display='flex'
        justifyContent='flex-start'
        marginTop={4}
      >
        <Button
          color='primary'
          component={Link}
          to={loginRoutes.loginForm}
          variant='contained'
        >
          Voltar
        </Button>
      </Box>
    </section>
  </LoginContainer>
)

export default LostCredentials

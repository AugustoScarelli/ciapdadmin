import React from 'react'

import LoginContainer from 'components/LoginContainer'
import Typography from '@material-ui/core/Typography'
import { unstable_Box as Box } from '@material-ui/core/Box'
import Link from '@material-ui/core/Link'
import Button from '@material-ui/core/Button'
import { Link as RRLink } from 'react-router-dom'

import person from 'media/person.svg'
import { loginRoutes } from 'utils/routes'

const ReadMore = () => (
  <LoginContainer>
    <section>
      <div>
        <Typography
          align='center'
          gutterBottom
          variant='h5'
        >
          Novo acesso
        </Typography>
        <Typography
          align='center'
          gutterBottom
          variant='subtitle1'
        >
          Como posso conseguir uma conta?
        </Typography>
      </div>
      <Box
        display='flex'
        justifyContent='center'
        paddingTop={4}
      >
        <img alt='New Account' src={person} />
      </Box>
      <Box paddingTop={4}>
        <Typography
          component='div'
          gutterBottom
          variant='body1'
        >
          O acesso ao sistema só é permitido aos alunos e colaboradores do CIAPD.
          Se deseja acessar o sistema entre em contato com o&nbsp;
          <Link
            href='https://www.puc-campinas.edu.br/ciapd/'
            rel='noopener noreferrer'
            target='_blank'
            variant='subtitle2'
          >
            órgão responsável
          </Link>
        </Typography>
      </Box>
      <Box
        display='flex'
        justifyContent='flex-start'
        marginTop={4}
      >
        <Button
          color='primary'
          component={RRLink}
          to={loginRoutes.loginForm}
          variant='contained'
        >
          Voltar
        </Button>
      </Box>
    </section>
  </LoginContainer>
)

export default ReadMore

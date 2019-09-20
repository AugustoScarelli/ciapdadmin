import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { login } from 'reducers/auth/action-creators'
import { openSnackbar } from 'reducers/snackbar/action-creators'
import { connect } from 'react-redux'

import LoginContainer from 'components/LoginContainer'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import { Link as RRLink } from 'react-router-dom'
import { unstable_Box as Box } from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

import { withStyles } from '@material-ui/styles'

import { loginRoutes } from 'utils/routes'
import { compose } from 'recompose'

const styles = theme => ({
  input: {
    marginBottom: theme.spacing.unit * 2
  },
})

let LoginForm = ({ classes, login, auth, openSnackbar }) => {
  const onSubmit = (e) => {
    e.preventDefault()
    const { email, password } = e.target
    login(email.value, password.value)
  }

  useEffect(() => {
    if (auth.error) {
      openSnackbar({
        type: 'error',
        content: auth.error,
        duration: 6000,
      })
    }
  }, [auth.error])

  return (
    <LoginContainer>
      <section className='loader'>
        {
          auth.loading
            ? null
            : <Fragment>
              <div>
                <Typography
                  align='center'
                  gutterBottom
                  variant='h5'
                >
                  Entrar
                </Typography>
                <Typography
                  align='center'
                  gutterBottom
                  variant='subtitle1'
                >
                  Use sua conta administrativa
                </Typography>
              </div>
              <form onSubmit={onSubmit}>
                <TextField
                  autoFocus
                  disabled={auth.loading}
                  fullWidth
                  inputProps={{
                    minLength: 6
                  }}
                  label='E-mail ou telefone'
                  margin='normal'
                  name='email'
                  required
                  type='email'
                  variant='outlined'
                />
                <TextField
                  className={classes.input}
                  disabled={auth.loading}
                  fullWidth
                  helperText='Não compartilhe o seu e-mail e senha com ninguém'
                  inputProps={{
                    minLength: 8
                  }}
                  label='Digite sua senha'
                  margin='normal'
                  name='password'
                  required
                  type='password'
                  variant='outlined'
                />
                <Link
                  component={RRLink}
                  href='#'
                  to={loginRoutes.lostCredentials}
                  variant='subtitle2'
                >
                  Esqueceu seus dados?
                </Link>
                <Box paddingTop={4}>
                  <Typography
                    component='div'
                    gutterBottom
                    variant='body1'
                  >
                    Não possui uma conta para o acesso? Participe das oficinas do CIAPD!&nbsp;
                    <Link
                      component={RRLink}
                      href='#'
                      to={loginRoutes.readMore}
                      variant='subtitle2'
                    >
                      Saiba mais
                    </Link>
                  </Typography>
                </Box>
                <Box
                  display='flex'
                  justifyContent='flex-end'
                  marginTop={4}
                >
                  <Button
                    color='primary'
                    disabled={auth.loading}
                    name='submit'
                    type='submit'
                    variant='contained'
                  >
                    Entrar
                  </Button>
                </Box>
              </form>
            </Fragment>
        }
      </section>
    </LoginContainer>
  )
}

// Check if a better solution for this exists later
// Prevent import error on Route in App.js

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  openSnackbar: PropTypes.func.isRequired,
}

const mapStateToProps = ({ auth }) => ({ auth })

const mapDispathToProps = dispatch => ({
  login: (email, password) => dispatch(login(email, password)),
  openSnackbar: (options) => dispatch(openSnackbar(options)),
})

LoginForm = compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispathToProps),
)(LoginForm)

export default () => (
  <LoginForm />
)

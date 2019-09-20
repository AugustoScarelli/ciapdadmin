import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { resetCep, fetchCep } from 'reducers/cep/action-creators'
import { connect } from 'react-redux'

import Paper from '@material-ui/core/Paper'
import { unstable_Box as Box } from '@material-ui/core/Box'
import MuiDialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import Divider from 'components/Divider'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'

import imgurUtils from 'utils/imgur'
import { compose } from 'recompose'

const PaperComponent = props => (
  <Paper component={Box} width={560} maxHeight={600} {...props} />
)

const Dialog = (props) => {
  const {
    user,
    fetchCep,
    resetCep,
    handleDialogClose,
    openDialog,
    cep,
    accountType,
  } = props

  useEffect(() => {
    if (user.cep) {
      fetchCep(user.cep)
    }

  }, [user.cep])

  const handleClose = () => {
    if (user.cep) {
      resetCep()
    }

    handleDialogClose()
  }

  return (
    <MuiDialog
      aria-describedby='user-info'
      aria-labelledby='user-info-title'
      onClose={handleClose}
      open={openDialog}
      PaperComponent={PaperComponent}
    >
      <DialogTitle id='user-info-title'>
        Usuário
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          className='loader'
          component='div'
          id='user-info'
        >
          {!cep.loading ?
            <Fragment>
              <Box
                display='block'
                height={{ xs: 120, sm: 180 }}
                mx='auto'
                width={{ xs: 120, sm: 180 }}
              >
                <Box
                  alt={user.name}
                  borderRadius='50%'
                  component='img'
                  height='100%'
                  src={imgurUtils.get(user.image).url}
                  width='100%'
                />
              </Box>
              <Box display='block' marginTop={3}> {accountType === 'company' ? 'Razão social' : 'Nome'}: {user.name} </Box>
              <Box my={0.5}> <Divider /> </Box>
              {accountType === 'admin' ?
                <Fragment>
                  <Box display='block'> RF: {user.rf} </Box>
                  <Box my={0.5}> <Divider /> </Box>
                </Fragment>
                : null}
              {accountType === 'company' ?
                <Fragment>
                  <Box display='block'> CNPJ: {user.cnpj} </Box>
                  <Box my={0.5}> <Divider /> </Box>
                </Fragment>
                : null}
              <Box display='block'> E-mail: {user.email} </Box>
              <Box my={0.5}> <Divider /> </Box>
              {accountType === 'student' ?
                <Fragment>
                  <Box display='block'> CPF: {user.cpf} </Box>
                  <Box my={0.5}> <Divider /> </Box>
                  <Box display='block'> Data de nascimento: {user.birthdate} </Box>
                  <Box my={0.5}> <Divider /> </Box>
                  <Box display='block'> Telefone: {user.phone} </Box>
                  <Box my={0.5}> <Divider /> </Box>
                  <Box display='block'> CID: {user.cid} </Box>
                  <Box my={0.5}> <Divider /> </Box>
                  <Box display='block'>
                    Controle por voz: {
                      user.voiceControl
                        ? 'ativado'
                        : 'desativado'
                    }
                  </Box>
                  <Box my={0.5}> <Divider /> </Box>
                  <Box display='block'>
                    Ajuda por voz: {
                      user.voiceContext
                        ? 'ativado'
                        : 'desativado'
                    }
                  </Box>
                  <Box my={0.5}> <Divider /> </Box>
                  <Box display='block'> CEP: {user.cep} </Box>
                  <Box my={0.5}> <Divider /> </Box>
                  <Box display='block'> Endereço: {cep.info.street} - {cep.info.city}/{cep.info.district} </Box>
                  <Box my={0.5}> <Divider /> </Box>
                  <Box display='block'> Número da casa: {user.houseNumber} </Box>
                  <Box my={0.5}> <Divider /> </Box>
                  <Box display='block'>
                    Informações adicionais: {
                      user.others
                        ? user.others
                        : '-----------'
                    }
                  </Box>
                </Fragment>
                : null}
            </Fragment> : null}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          OK
      </Button>
      </DialogActions>
    </MuiDialog>
  )
}

Dialog.propTypes = {
  user: PropTypes.object.isRequired,
  fetchCep: PropTypes.func.isRequired,
  resetCep: PropTypes.func.isRequired,
  handleDialogClose: PropTypes.func.isRequired,
  openDialog: PropTypes.bool.isRequired,
  cep: PropTypes.object.isRequired,
  accountType: PropTypes.oneOf(['admin', 'company', 'student']),
}

const mapStateToProps = ({ cep }) => ({ cep })

const mapDispatchToProps = dispatch => ({
  resetCep: () => dispatch(resetCep()),
  fetchCep: cep => dispatch(fetchCep(cep)),
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(Dialog)

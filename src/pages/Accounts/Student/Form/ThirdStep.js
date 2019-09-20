import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { resetCep, fetchCep } from 'reducers/cep/action-creators'
import { connect } from 'react-redux'

import Toolbar from '@material-ui/core/Toolbar'
import Grid from '@material-ui/core/Grid'
import { unstable_Box as Box } from '@material-ui/core/Box'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import Field from 'components/Field'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import Link from '@material-ui/core/Link'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'

import { withStyles } from '@material-ui/styles'

import { compose } from 'recompose'

const styles = theme => ({
  icon: {
    fill: theme.palette.common.darkIcon,
    height: '100%',
    width: '100%',
  },
})

const ThirdStep = (props) => {
  const {
    cep,
    change,
    resetCep,
    fetchCep,
    className,
    classes
  } = props

  const [open, setOpen] = useState(false)
  const { street, city, district } = cep.info

  useEffect(() => {
    if (cep.error) {
      change('cep', '')
      return null
    }

    if (!street) return null
    if (!city) return null
    if (!district) return null

    handleOpen()
  }, [cep])

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    resetCep()
    setOpen(false)
  }

  const handleCep = (e) => {
    const { target: { value } } = e
    if (value) {
      fetchCep(value)
    }
  }

  return (
    <Toolbar className={className}>
      <Grid container spacing={16}>
        <Grid item xs={12}>
          <Box
            height={120}
            margin='auto'
            width={120}
          >
            <LocationOnIcon className={classes.icon} />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
        >
          <Field
            label='CEP'
            name='cep'
            type='number'
            onBlur={handleCep}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
        >
          <Field
            label='Número'
            name='houseNumber'
            type='number'
          />
        </Grid>
        <Grid item xs={12}>
          <Field label='Outras informações' name='others' />
        </Grid>
      </Grid>
      <Dialog
        aria-describedby='cep-confirm-description'
        aria-labelledby='cep-confirm-title'
        onClose={handleClose}
        open={open}
      >
        <DialogTitle id='cep-confirm-title'>
          Confirmação de CEP
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='cep-confirm-description'>
            <Box component='span' display='block'>
              O CEP digitado corresponde ao endereço:
            </Box>
            <Box
              component='span'
              display='block'
              fontWeight={500}
            >
              {street} - {city}/{district}
            </Box>
            <Box component='span' display='block'>
              Caso esteja incorreto, preencha o&nbsp;
              <Link
                href='https://viacep.com.br/cep/'
                rel='noopener noreferrer'
                target='_blank'
              >
                formulário
              </Link> para uma eventual correção.
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Toolbar>
  )
}

ThirdStep.propTypes = {
  cep: PropTypes.object.isRequired,
  change: PropTypes.func.isRequired,
  resetCep: PropTypes.func.isRequired,
  fetchCep: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = ({ cep }) => ({ cep })

const mapDispatchToProps = dispatch => ({
  resetCep: () => dispatch(resetCep()),
  fetchCep: cep => dispatch(fetchCep(cep)),
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(ThirdStep)

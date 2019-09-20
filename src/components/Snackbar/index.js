import React from 'react'
import PropTypes from 'prop-types'
import { closeSnackbar } from 'reducers/snackbar/action-creators'
import { connect } from 'react-redux'

import MuiSnackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import Typography from '@material-ui/core/Typography'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import WarningIcon from '@material-ui/icons/Warning'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

import classNames from 'classnames'
import { withStyles } from '@material-ui/styles'

import green from '@material-ui/core/colors/green'
import red from '@material-ui/core/colors/red'
import amber from '@material-ui/core/colors/amber'
import { compose } from 'recompose'

const styles = theme => ({
  snackbar: {
    [theme.breakpoints.up('md')]: {
      maxWidth: '85vw',
    },
  },
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: red[700],
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  content: {
    color: theme.palette.common.white,
    display: 'flex',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 20,
    opacity: 0.9,
  },
  iconVariant: {
    marginRight: theme.spacing.unit,
  },
})

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
}

const Snackbar = ({ snackbar, closeSnackbar, classes }) => {
  const Icon = snackbar.open ? variantIcon[snackbar.type] : () => null

  return (
    <MuiSnackbar
      anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      autoHideDuration={snackbar.duration}
      onClose={closeSnackbar}
      open={snackbar.open}
    >
      <SnackbarContent
        aria-describedby='root-snackbar'
        className={
          classNames(
            classes.snackbar,
            classes[snackbar.type]
          )
        }
        message={
          <Typography
            className={classes.content}
            component='span'
            id='root-snackbar'
            variant='subtitle2'
          >
            <Icon
              className={
                classNames(
                  classes.icon,
                  classes.iconVariant
                )
              }
            />
            {snackbar.content}
          </Typography>
        }
        action={[
          <IconButton
            aria-label='Close'
            color='inherit'
            key='close'
            onClick={closeSnackbar}
          >
            <CloseIcon className={classes.snackbarIconClose} />
          </IconButton>
        ]}
      />
    </MuiSnackbar>
  )
}

Snackbar.propTypes = {
  snackbar: PropTypes.object.isRequired,
  closeSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = ({ snackbar }) => ({ snackbar })

const mapDispatchToProps = dispatch => ({
  closeSnackbar: () => dispatch(closeSnackbar())
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(Snackbar)

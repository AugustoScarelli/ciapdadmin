import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { minSteps } from 'reducers/user-form'
import { backStep, closeForm, nextStep } from 'reducers/user-form/action-creators'
import { openSnackbar } from 'reducers/snackbar/action-creators'
import { createUser, editUser } from 'reducers/firestore/action-creators'
import { getFormSyncErrors, submit } from 'redux-form'
import { connect } from 'react-redux'

import Dialog from '@material-ui/core/Dialog'
import Paper from '@material-ui/core/Paper'
import { unstable_Box as Box } from '@material-ui/core/Box'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import LinearProgress from '@material-ui/core/LinearProgress'
import Toolbar from '@material-ui/core/Toolbar'
import Divider from 'components/Divider'
import DialogActions from '@material-ui/core/DialogActions'
import MobileStepper from '@material-ui/core/MobileStepper'
import Button from '@material-ui/core/Button'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'

import { withStyles } from '@material-ui/styles'

import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery'
import { compose } from 'recompose'

const styles = theme => ({
  white: {
    backgroundColor: theme.palette.common.white,
  },
})

const PaperComponent = props => (
  <Paper component={Box} width={560} height={520} {...props} />
)

const FormDialog = (props) => {
  const {
    firestore,
    backStep,
    openSnackbar,
    closeForm,
    form,
    createUser,
    editUser,
    accountType,
    submit,
    nextStep,
    managerValidation,
    ManagerForm,
    classes,
  } = props

  const { error, userCreated, userEdited } = firestore

  useEffect(() => {
    if (error) {
      backStep()
      openSnackbar({
        type: 'error',
        content: error,
        duration: 6000,
      })
    } else if (userCreated) {
      closeForm()
      openSnackbar({
        type: 'success',
        content: 'Usuário adicionado com sucesso!',
        duration: 3000,
      })
    } else if (userEdited) {
      closeForm()
      openSnackbar({
        type: 'success',
        content: 'Usuário editado com sucesso!',
        duration: 3000,
      })
    }
  }, [error, userCreated, userEdited])

  const { name, edit, step, steps, loading, errors, open } = form

  const handleSubmit = values => {
    const role = `${accountType}-enabled`
    if (edit) {
      editUser(values, { callbackRole: role })
    } else {
      createUser(values, { role })
    }
  }

  const handleRemoteSubmit = () => {
    submit(name)
    nextStep()
  }

  const matches = useMediaQuery('(max-width:600px)')
  const isLastFillStep = (step === (steps - 1))
  const isLoadingOrLastStep = (loading || step === steps)
  const hasFormErrors = managerValidation(errors)(step)

  return (
    <div>
      <Dialog
        fullScreen={matches}
        aria-labelledby='add-user'
        onClose={
          isLoadingOrLastStep
            ? null
            : closeForm
        }
        open={open}
        PaperComponent={PaperComponent}
      >
        <DialogTitle id='add-user'>
          Adicionar usuário
        </DialogTitle>
        <DialogContent>
          <ManagerForm onSubmit={handleSubmit} />
          <Toolbar />
          {loading ? <LinearProgress /> : <Divider />}
        </DialogContent>
        <DialogActions>
          <MobileStepper
            activeStep={step - 1}
            backButton={
              <Button
                disabled={isLoadingOrLastStep}
                onClick={
                  step === minSteps
                    ? closeForm
                    : backStep
                }
                size='small'
              >
                <KeyboardArrowLeftIcon />
                Voltar
              </Button>
            }
            className={classes.white}
            component={Box}
            nextButton={
              <Button
                disabled={isLoadingOrLastStep || hasFormErrors}
                onClick={isLastFillStep ? handleRemoteSubmit : nextStep}
                size='small'
              >
                {isLastFillStep ? 'Finalizar' : 'Próximo'}
                <KeyboardArrowRightIcon />
              </Button>
            }
            position='static'
            steps={steps}
            variant='progress'
            width='100%'
          />
        </DialogActions>
      </Dialog>
    </div>
  )
}

FormDialog.propTypes = {
  firestore: PropTypes.object.isRequired,
  backStep: PropTypes.func.isRequired,
  openSnackbar: PropTypes.func.isRequired,
  closeForm: PropTypes.func.isRequired,
  editUser: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  createUser: PropTypes.func.isRequired,
  accountType: PropTypes.oneOf(['admin', 'company', 'student']),
  submit: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
  managerValidation: PropTypes.func,
  ManagerForm: PropTypes.any,
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  firestore: {
    error: state.firestore.error,
    userCreated: state.firestore.userCreated,
    userEdited: state.firestore.userEdited,
  },
  form: {
    name: `${state.userForm.type}-form`,
    edit: state.userForm.edit,
    step: state.userForm.step,
    steps: state.userForm.steps,
    loading: state.cep.loading || state.imgur.loading,
    errors: getFormSyncErrors(`${state.userForm.type}-form`)(state),
    open: state.userForm.open,
  },
})

const mapDispatchToProps = dispatch => ({
  backStep: () => dispatch(backStep()),
  openSnackbar: options => dispatch(openSnackbar(options)),
  closeForm: () => dispatch(closeForm()),
  createUser: (values, options) => dispatch(createUser(values, options)),
  editUser: (values, options) => dispatch(editUser(values, options)),
  submit: formName => dispatch(submit(formName)),
  nextStep: () => dispatch(nextStep()),
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(FormDialog)

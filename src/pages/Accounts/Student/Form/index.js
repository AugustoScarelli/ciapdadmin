import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import { unstable_Box as Box } from '@material-ui/core/Box'
import Field from 'components/Field'
import FirstStep from './FirstStep'
import SecondStep from './SecondStep'
import ThirdStep from './ThirdStep'

import classNames from 'classnames'
import { withStyles } from '@material-ui/styles'

import validate from './validate'
import { compose } from 'recompose'

const styles = {
  hide: {
    display: 'none',
  },
}

const Form = ({ handleSubmit, onSubmit, change, step, classes }) => (
  <form onSubmit={handleSubmit(onSubmit)}>
    <Box display='none'>
      <Field name='uid' />
    </Box>
    <FirstStep
      change={change}
      className={
        classNames(
          step !== 1 &&
          classes.hide
        )
      }
    />
    <SecondStep
      className={
        classNames(
          step !== 2
          && classes.hide
        )
      }
    />
    <ThirdStep
      change={change}
      className={
        classNames(
          step !== 3
          && classes.hide
        )
      }
    />
    <div
      className={
        classNames(
          'loader',
          step !== 4
          && classes.hide
        )
      }
    />
  </form>
)

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  step: state.userForm.step,
  initialValues: state.userForm.edit
    ? state.userForm.user
    : null,
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps),
  reduxForm({
    form: 'student-form',
    validate,
  }),
)(Form)

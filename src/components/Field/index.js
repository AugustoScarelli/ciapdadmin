import React from 'react'
import PropTypes from 'prop-types'

import { Field as ReduxFormField } from 'redux-form'
import { TextField } from 'redux-form-material-ui'

import { withStyles } from '@material-ui/styles'

const styles = {
  field: {
    marginBottom: 0,
    marginTop: 0,
  },
  input: {
    textAlign: 'center',
    textTransform: 'lowercase',
  },
}

const Field = ({ classes, inputProps, type, ...props }) => (
  <ReduxFormField
    {...props}
    className={classes.field}
    component={TextField}
    fullWidth
    inputProps={{
      ...inputProps,
      className: classes.input,
    }}
    margin='normal'
    type={type}
    variant='outlined'
  />
)

Field.defaultProps = {
  type: 'text',
}

Field.propTypes = {
  classes: PropTypes.object.isRequired,
  inputProps: PropTypes.object,
  type: PropTypes.string,
}

export default withStyles(styles)(Field)

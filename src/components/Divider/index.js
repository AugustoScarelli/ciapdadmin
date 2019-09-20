import React from 'react'
import PropTypes from 'prop-types'

import MuiDivider from '@material-ui/core/Divider'

import { withStyles } from '@material-ui/styles'

const styles = {
  divider: {
    backgroundColor: '#dadada',
    width: '100%',
  },
}

const Divider = ({ classes, ...props }) => (
  <MuiDivider className={classes.divider} {...props} />
)

Divider.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Divider)

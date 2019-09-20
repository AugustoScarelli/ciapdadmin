import React from 'react'
import PropTypes from 'prop-types'

import Paper from '@material-ui/core/Paper'
import { unstable_Box as Box } from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import { withStyles } from '@material-ui/styles'

const styles = theme => ({
  background: {
    backgroundColor: props => props.color,
  },
  black: {
    color: theme.palette.common.black,
  },
  white: {
    color: theme.palette.common.white,
  },
})

const Header = ({ variant, classes, title, subtitle }) => (
  <div className={variant === 'default' ? classes.white : classes.black}>
    <Typography color='inherit' variant='h6'>
      {title}
    </Typography>
    <Typography color='inherit' variant='body2'>
      {subtitle}
    </Typography>
  </div>
)

const Panel = ({ classes, variant, title, subtitle, children }) => (
  <Paper
    component={Box}
    display='inline-block'
    width={1}
  >
    <Box position='relative' width={1}>
      <Paper
        borderRadius={4}
        className={classes.background}
        component={Box}
        marginTop={-3}
        mx='auto'
        padding={2}
        square={true}
        width={{ xs: '80%', sm: '85%', lg: '90%' }}
      >
        {
          variant === 'default'
            ? <Header
              variant={variant}
              classes={classes}
              title={title}
              subtitle={subtitle}
            />
            : children
        }
      </Paper>
    </Box>
    <Box padding={2} paddingTop={4}>
      {
        variant === 'default'
          ? children
          : <Header
            variant={variant}
            classes={classes}
            title={title}
            subtitle={subtitle}
          />
      }
    </Box>
  </Paper>
)

Panel.defaultProps = {
  variant: 'default',
}

Panel.propTypes = {
  color: (props, propName, componentName) => {
    if (!(/^#(?:[0-9a-fA-F]{3}){1,2}$/).test(props[propName])) {
      return new Error(
        `Invalid prop '${propName}' supplied to '${componentName}'. Validation failed.`
      )
    }
  },
  classes: PropTypes.object.isRequired,
  variant: PropTypes.oneOf(['default', 'chart']).isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
}

export default withStyles(styles)(Panel)

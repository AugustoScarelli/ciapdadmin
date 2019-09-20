import React from 'react'
import PropTypes from 'prop-types'

import { unstable_Box as Box } from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'

import { withStyles } from '@material-ui/styles'

import background from 'media/background.jpg'
import ciapd from 'media/ciapd.svg'

// Make prevent background load (network) on mobile devices later

const styles = theme => ({
  root: {
    backgroundBlendMode: 'darken',
    backgroundColor: 'rgba(1, 11, 62, 0.5)',
    backgroundImage: `url(${background})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
  container: {
    [theme.breakpoints.only('xs')]: {
      boxShadow: 'unset',
    },
  },
})

const Container = ({ classes, children }) => (
  <Box
    alignItems='center'
    className={classes.root}
    display='flex'
    height='100vh'
    justifyContent='center'
  >
    <Paper
      borderRadius={{ xs: 0, sm: 8 }}
      className={classes.container}
      component={Box}
      height={{ xs: '100%', sm: 'auto' }}
      minHeight={{ xs: '100%', sm: 562 }}
      paddingBottom={{ xs: 3, sm: 4 }}
      paddingLeft={{ xs: 3, sm: 5 }}
      paddingRight={{ xs: 3, sm: 5 }}
      paddingTop={{ xs: 3, sm: 6 }}
      square={true}
      width={{ xs: '100%', sm: 440 }}
    >
      <Box
        display='flex'
        justifyContent='center'
        marginBottom={2}
      >
        <img alt='CIAPD' height={32} src={ciapd} />
      </Box>
      {children}
    </Paper>
  </Box>
)

Container.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired,
}

export default withStyles(styles)(Container)

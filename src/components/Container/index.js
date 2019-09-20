import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { unstable_Box as Box } from '@material-ui/core/Box'
import Hidden from '@material-ui/core/Hidden'
import Navigator from 'components/Navigator'
import Header from './Header'

import { withStyles } from '@material-ui/styles'

const drawerWidth = 256

const styles = {
  drawerWidth: {
    '& > :first-child': {
      width: drawerWidth,
    },
  },
  drawerWidthMobile: {
    '& > :nth-child(2)': {
      width: drawerWidth,
    },
  },
  main: {
    backgroundColor: '#eaeff1',
  },
}

const Container = ({ tabStruct, activeItem, classes }) => {
  const [state, setState] = useState({
    tabOpen: 0,
    mobileOpen: false,
  })

  const handleTabOpen = (_, value) => {
    setState(prevState => ({
      ...prevState,
      tabOpen: value,
    }))
  }

  const handleDrawerToggle = () => {
    setState(prevState => ({
      ...prevState,
      mobileOpen: !prevState.mobileOpen,
    }))
  }

  const handleReduceTabStruct = struct => (
    struct.map(tab => ({
      ...tab,
      component: null
    }))
  )

  const tabStructNullable = handleReduceTabStruct(tabStruct)

  return (
    <Box display='flex' minHeight='100vh'>
      <Box
        component='nav'
        flexShrink={{ sm: 0 }}
        width={{ sm: drawerWidth }}
      >
        <Hidden implementation='js' smUp>
          <Navigator
            activeItem={activeItem}
            className={classes.drawerWidthMobile}
            onClose={handleDrawerToggle}
            open={state.mobileOpen}
            variant='temporary'
          />
        </Hidden>
        <Hidden xsDown implementation='css'>
          <Navigator
            activeItem={activeItem}
            className={classes.drawerWidth}
          />
        </Hidden>
      </Box>
      <Box
        display='flex'
        flex={1}
        flexDirection='column'
      >
        <Header
          activeItem={activeItem}
          handleTabOpen={handleTabOpen}
          onDrawerToggle={handleDrawerToggle}
          tabOpen={state.tabOpen}
          tabStruct={tabStructNullable}
        />
        <Box
          className={classes.main}
          component='main'
          flex={1}
          paddingTop={6}
          px={{ xs: 2, sm: 3, md: 4.5 }}
        >
          {tabStruct[state.tabOpen].component}
        </Box>
      </Box>
    </Box>
  )
}

Container.propTypes = {
  // Check if this prop is correct later
  tabStruct: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      component: PropTypes.element.isRequired,
    })
  ),
  activeItem: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Container)

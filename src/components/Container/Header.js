import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { logout } from 'reducers/auth/action-creators'
import { connect } from 'react-redux'

import AppBar from '@material-ui/core/AppBar'
import { unstable_Box as Box } from '@material-ui/core/Box'
import Toolbar from '@material-ui/core/Toolbar'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Tooltip from '@material-ui/core/Tooltip'
import Badge from '@material-ui/core/Badge'
import NotificationsIcon from '@material-ui/icons/Notifications'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import HelpIcon from '@material-ui/icons/Help'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import { withStyles } from '@material-ui/styles'

import { compose } from 'recompose'

const styles = {
  appBar: {
    zIndex: 0,
  },
}

const Header = (props) => {
  const {
    logout,
    onDrawerToggle,
    auth,
    classes,
    activeItem,
    handleTabOpen,
    tabOpen,
    tabStruct,
  } = props

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleMenu = (e) => {
    setAnchorEl(e.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    logout()
    handleClose()
  }

  const notifications = 0

  return (
    <Fragment>
      <AppBar
        color='primary'
        component={Box}
        elevation={0}
        paddingTop={1}
        position='sticky'
      >
        <Toolbar>
          <Grid
            alignItems='center'
            container
            spacing={8}
          >
            <Hidden smUp>
              <Grid item>
                <IconButton
                  aria-label='Open drawer'
                  color='inherit'
                  onClick={onDrawerToggle}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
            </Hidden>
            <Grid item xs />
            <Grid item>
              <Tooltip title='Notificações'>
                <IconButton color='inherit'>
                  <Badge
                    badgeContent={notifications}
                    color='error'
                    invisible={notifications === 0}
                  >
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <IconButton
                aria-haspopup='true'
                aria-owns={open ? 'menu-appbar' : undefined}
                color='inherit'
                onClick={handleMenu}
              >
                <Avatar src={auth.info.image} />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        className={classes.appBar}
        color='primary'
        elevation={0}
        position='static'
      >
        <Toolbar>
          <Grid
            alignItems='center'
            container
            spacing={8}
          >
            <Grid item xs>
              <Typography color='inherit' variant='h5'>
                {activeItem}
              </Typography>
            </Grid>
            <Grid item>
              <Tooltip title='Ajuda'>
                <IconButton color='inherit'>
                  <HelpIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        className={classes.appBar}
        color='primary'
        elevation={0}
        position='static'
      >
        <Tabs
          onChange={handleTabOpen}
          textColor='inherit'
          value={tabOpen}
        >
          {tabStruct.map(({ title }) => (
            <Tab
              key={title}
              label={title}
              textColor='inherit'
            />
          ))}
        </Tabs>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'top',
        }}
        id='menu-appbar'
        onClose={handleClose}
        open={open}
        transformOrigin={{
          horizontal: 'right',
          vertical: 'top',
        }}
      >
        <MenuItem disabled>Trocar Senha</MenuItem>
        <MenuItem onClick={handleLogout}>Sair</MenuItem>
      </Menu>
    </Fragment>
  )
}

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  onDrawerToggle: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  activeItem: PropTypes.string.isRequired,
  handleTabOpen: PropTypes.func.isRequired,
  tabOpen: PropTypes.number.isRequired,

  // Check if this prop is correct later
  tabStruct: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
    })
  ),
}

const mapStateToProps = ({ auth }) => ({ auth })

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(Header)

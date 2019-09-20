import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import HomeIcon from '@material-ui/icons/Home'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'

import classNames from 'classnames'
import { withStyles } from '@material-ui/styles'
import styles from './styles'

import { compose } from 'recompose'
import ciapd from 'media/ciapd_white.svg'
import navigatorStruct from './struct'

const Navigator = ({ classes, activeItem, auth, ...other }) => {
  // Prevent "Invalid value for prop `dispatch` on <div> tag" error
  delete other.dispatch

  return (
    <Drawer variant='permanent' {...other}>
      <List disablePadding>
        <ListItem
          className={
            classNames(
              classes.firebase,
              classes.item,
              classes.itemCategory,
            )
          }
        >
          <img alt='CIAPD' height={32} src={ciapd} />
        </ListItem>
        <ListItem
          className={
            classNames(
              classes.item,
              classes.itemCategory,
            )
          }
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText
            classes={{
              primary: classes.itemPrimary,
            }}
          >
            Administrativo
          </ListItemText>
        </ListItem>
        {navigatorStruct(activeItem).map(({ id, children }) => id === 'Contas' && /admin/.test(auth.info.role) ? null : (
          <Fragment key={id}>
            <ListItem>
              <ListItemText
                classes={{
                  primary: classes.categoryHeaderPrimary,
                }}
              >
                {id}
              </ListItemText>
            </ListItem>
            {children.map(({ id: childId, uri, icon, active, disabled }) => (
              <ListItem
                button
                className={classNames(
                  classes.item,
                  classes.itemActionable,
                  active && classes.itemActiveItem,
                )}
                component={Link}
                dense
                disabled={disabled}
                key={childId}
                to={uri}
              >
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText
                  classes={{
                    primary: classes.itemPrimary,
                    textDense: classes.textDense,
                  }}
                >
                  {childId}
                </ListItemText>
              </ListItem>
            ))}
            <Divider />
          </Fragment>
        ))}
      </List>
    </Drawer>
  )
}

Navigator.propTypes = {
  classes: PropTypes.object.isRequired,
  activeItem: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = ({ auth }) => ({ auth })

export default compose(
  withStyles(styles),
  connect(mapStateToProps),
)(Navigator)

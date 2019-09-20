import React from 'react'
import PropTypes from 'prop-types'

import MuiMenu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

const Menu = (props) => {
  const {
    anchorEl,
    handleMenuClose,
    openMenu,
    handleDialog,
    handleEdit,
    handleDelete,
  } = props

  return (
    <MuiMenu
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'center',
        vertical: 'top',
      }}
      id='menu-user'
      onClose={handleMenuClose}
      open={openMenu}
      transformOrigin={{
        horizontal: 'right',
        vertical: 'top',
      }}
    >
      {/* Mui doesn't support Fragment inside a <Menu> at v3.9.2 */}
      <MenuItem onClick={handleDialog}>Ver</MenuItem>
      <MenuItem onClick={handleEdit}>Editar</MenuItem>
      <MenuItem onClick={handleDelete}>Remover</MenuItem>
    </MuiMenu>
  )
}

Menu.propTypes = {
  anchorEl: PropTypes.any,
  handleMenuClose: PropTypes.func.isRequired,
  openMenu: PropTypes.bool.isRequired,
  handleDialog: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
}

export default Menu

import React from 'react'
import PropTypes from 'prop-types'

import MuiMenu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

const Menu = (props) => {
  const {
    anchorEl,
    handleMenuClose,
    openMenu,
    accountVariant,
    handleDialog,
    handleEdit,
    handleDisable,
    handleDelete,
    handleEnable,
    handleRestore,
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
      {accountVariant === 'enabled' ? <MenuItem onClick={handleDialog}>Ver</MenuItem> : null}
      {accountVariant === 'enabled' ? <MenuItem onClick={handleEdit}>Editar</MenuItem> : null}
      {accountVariant === 'enabled' ? <MenuItem onClick={handleDisable}>Desativar</MenuItem> : null}
      {accountVariant === 'enabled' ? <MenuItem onClick={handleDelete}>Remover</MenuItem> : null}
      {accountVariant === 'disabled' ? <MenuItem onClick={handleEnable}>Ativar</MenuItem> : null}
      {accountVariant === 'deleted' ? <MenuItem onClick={handleRestore}>Restaurar</MenuItem> : null}
    </MuiMenu>
  )
}

Menu.propTypes = {
  anchorEl: PropTypes.any,
  handleMenuClose: PropTypes.func.isRequired,
  openMenu: PropTypes.bool.isRequired,
  accountVariant: PropTypes.string.isRequired,
  handleDialog: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDisable: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleEnable: PropTypes.func.isRequired,
  handleRestore: PropTypes.func.isRequired,
}

export default Menu

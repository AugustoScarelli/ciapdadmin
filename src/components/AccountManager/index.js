import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {openSnackbar} from 'reducers/snackbar/action-creators'
import {getUsers, filterUsers, filterUsersSuccess, changeRole} from 'reducers/firestore/action-creators'
import {openForm} from 'reducers/user-form/action-creators'
import {connect} from 'react-redux'

import Paper from '@material-ui/core/Paper'
import {unstable_Box as Box} from '@material-ui/core/Box'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Grid from '@material-ui/core/Grid'
import SearchIcon from '@material-ui/icons/Search'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import RefreshIcon from '@material-ui/icons/Refresh'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Avatar from '@material-ui/core/Avatar'
import ListItemText from '@material-ui/core/ListItemText'
import FormDialog from './FormDialog'
import Menu from './Menu'
import ViewDialog from './ViewDialog'

import styles from './styles'
import {withStyles} from '@material-ui/styles'

import imgurUtils from 'utils/imgur'
import {compose} from 'recompose'

const Homepage = (props) => {
    const {
        accountType,
        accountVariant,
        getUsers,
        firestore,
        openSnackbar,
        formSteps,
        filterUsers,
        filterUsersSuccess,
        openForm,
        changeRole,
        classes,
        ManagerForm,
        managerValidation,
    } = props

    // Menu state
    const [anchorEl, setAnchorEl] = useState(null)
    const openMenu = Boolean(anchorEl)

    // View dialog state
    const [openDialog, setDialog] = useState(false)

    // Choosed user state
    const [userIndex, setUserIndex] = useState(null)

    const role = `${accountType}-${accountVariant}`
    useEffect(() => {
        getUsers(role)
    }, [role])

    const {
        error,
        roleChanged,
        filter,
        loading,
    } = firestore

    useEffect(() => {
        if (error) {
            openSnackbar({
                type: 'error',
                content: error,
                duration: 6000,
            })
        } else if (roleChanged) {
            openSnackbar({
                type: 'success',
                content: 'Status atualizado com sucesso',
                duration: 3000,
            })
        }
    }, [error, roleChanged])

    const users = firestore[`${firestore.filter ? 'filteredUsers' : 'users'}`]
    const user = typeof userIndex === 'number' ? users[userIndex] : null
    const openFormOptions = {
        type: accountType,
        steps: formSteps,
        edit: false,
        user,
    }

    const handleUpdate = () => {
        getUsers(role)
    }

    const handleMenu = (e) => {
        setAnchorEl(e.currentTarget)
    }

    const handleMenuClose = () => {
        setAnchorEl(null)
    }

    const handleDialog = () => {
        setDialog(true)
    }

    const handleDialogClose = () => {
        setDialog(false)
        handleMenuClose()
    }

    const handleUser = (index) => {
        setUserIndex(index)
    }

    const handleFilter = (e) => {
        const {target: {value}} = e
        value ? filterUsers(value) : filterUsersSuccess()
    }

    const handleEdit = () => {
        openForm({...openFormOptions, edit: true})
        handleMenuClose()
    }

    const handleEnable = () => {
        if (user) {
            changeRole(user.uid, `${accountType}-enabled`, {
                callbackRole: `${accountType}-disabled`
            })
        }

        handleMenuClose()
    }

    const handleDisable = () => {
        if (user) {
            changeRole(user.uid, `${accountType}-disabled`, {
                callbackRole: `${accountType}-enabled`
            })
        }

        handleMenuClose()
    }

    const handleRestore = () => {
        if (user) {
            changeRole(user.uid, `${accountType}-enabled`, {
                callbackRole: `${accountType}-deleted`
            })
        }

        handleMenuClose()
    }

    const handleDelete = () => {
        if (user) {
            changeRole(user.uid, `${accountType}-deleted`, {
                callbackRole: `${accountType}-enabled`
            })
        }

        handleMenuClose()
    }

    return (
        <Paper
            className={classes.root}
            component={Box}
            margin='auto'
            maxWidth={936}
        >
            <AppBar
                component={Box}
                borderBottom='1px solid rgba(0, 0, 0, 0.12)'
                position='static'
                color='default'
                elevation={0}
            >
                <Toolbar>
                    <Grid
                        alignItems='center'
                        container
                        spacing={16}
                    >
                        <Grid item>
                            <Box
                                color='inherit'
                                component={SearchIcon}
                                display='block'
                            />
                        </Grid>
                        <Grid item xs>
                            <TextField
                                disabled={!filter && (loading || users.length <= 0)}
                                fullWidth
                                InputProps={{
                                    className: classes.input,
                                    disableUnderline: true,
                                }}
                                onChange={handleFilter}
                                placeholder='Procure por nome, e-mail ou por CPF/RF'
                            />
                        </Grid>
                        <Grid item>
                            {accountVariant === 'enabled' ? <Button
                                className={classes.button}
                                color='primary'
                                onClick={() => openForm(openFormOptions)}
                                variant='contained'
                            >
                                Novo usuário
                            </Button> : null}
                            <Tooltip title='Atualizar'>
                                <IconButton onClick={handleUpdate}>
                                    <Box
                                        color='inherit'
                                        component={RefreshIcon}
                                        display='block'
                                    />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            {
                ManagerForm && managerValidation
                    ? (
                        <FormDialog
                            accountType={accountType}
                            ManagerForm={ManagerForm}
                            managerValidation={managerValidation}
                        />
                    ) : null}
            <List className='loader'>
                {
                    loading
                        ? null
                        : (
                            users.length <= 0
                                ? (
                                    <Box px={2} py={9.25}>
                                        <Typography color='textSecondary' align='center'>
                                            Nenhum usuário foi encontrado
                                        </Typography>
                                    </Box>
                                )
                                : users.map(({uid, image, name, email}, index) => (
                                    <ListItem
                                        aria-haspopup='true'
                                        aria-owns={openMenu ? 'menu-user' : undefined}
                                        button
                                        key={uid}
                                        onClick={
                                            (e) => {
                                                handleUser(index)
                                                handleMenu(e)
                                            }
                                        }
                                    >
                                        <Avatar src={imgurUtils.get(image).url}/>
                                        <ListItemText primary={name} secondary={email}/>
                                    </ListItem>
                                ))
                        )
                }
            </List>
            <Menu
                accountVariant={accountVariant}
                anchorEl={anchorEl}
                handleDialog={handleDialog}
                handleDisable={handleDisable}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                handleEnable={handleEnable}
                handleMenuClose={handleMenuClose}
                handleRestore={handleRestore}
                openMenu={openMenu}
            />
            {
                user && accountVariant === 'enabled'
                    ? <ViewDialog
                        handleDialogClose={handleDialogClose}
                        openDialog={openDialog}
                        accountType={accountType}
                        user={user}
                    /> : null
            }
        </Paper>
    )
}

Homepage.defaultProps = {
    formSteps: 1,
    Form: null,
    stepValidate: null,
}

Homepage.propTypes = {
    accountType: PropTypes.oneOf(['admin', 'company', 'student']),
    accountVariant: PropTypes.oneOf(['enabled', 'disabled', 'deleted']),
    getUsers: PropTypes.func.isRequired,
    firestore: PropTypes.object.isRequired,
    openSnackbar: PropTypes.func.isRequired,
    formSteps: PropTypes.number,
    filterUsers: PropTypes.func.isRequired,
    filterUsersSuccess: PropTypes.func.isRequired,
    openForm: PropTypes.func.isRequired,
    changeRole: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    ManagerForm: PropTypes.any,
    managerValidation: PropTypes.func,
}

const mapStateToProps = ({firestore}) => ({firestore})

const mapDispatchToProps = dispatch => ({
    getUsers: role => dispatch(getUsers({role})),
    openSnackbar: options => dispatch(openSnackbar(options)),
    filterUsers: query => dispatch(filterUsers(query)),
    filterUsersSuccess: () => dispatch(filterUsersSuccess()),
    changeRole: (uid, newRole, getUsersRole) => dispatch(changeRole(uid, newRole, getUsersRole)),
    openForm: options => dispatch(openForm(options)),
})

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps),
)(Homepage)

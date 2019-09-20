import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { openSnackbar } from 'reducers/snackbar/action-creators'
import { getContent, filterContent, filterContentSuccess, deleteContent } from 'reducers/firestore/action-creators'
import { openForm } from 'reducers/content-form/action-creators'
import { connect } from 'react-redux'

import Paper from '@material-ui/core/Paper'
import { unstable_Box as Box } from '@material-ui/core/Box'
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
import { withStyles } from '@material-ui/styles'

import imgurUtils from 'utils/imgur'
import { compose } from 'recompose'

const Homepage = (props) => {
  const {
    type,
    getContent,
    firestore,
    openSnackbar,
    formSteps,
    filterContent,
    filterContentSuccess,
    deleteContent,
    openForm,
    classes,
    ManagerForm,
    managerValidation,
  } = props

  // Menu state
  const [anchorEl, setAnchorEl] = useState(null)
  const openMenu = Boolean(anchorEl)

  // View dialog state
  const [openDialog, setDialog] = useState(false)

  // Choosed content state
  const [contentIndex, setContentIndex] = useState(null)

  useEffect(() => {
    getContent(type)
  }, [type])

  const {
    error,
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
    }
  }, [error])

  const contents = firestore[`${firestore.filter ? 'filteredContent' : 'contents'}`]
  const content = typeof contentIndex === 'number' ? contents[contentIndex] : null
  const openFormOptions = {
    type,
    steps: formSteps,
    edit: false,
    content,
  }

  const handleUpdate = () => {
    getContent(type)
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

  const handleContent = (index) => {
    setContentIndex(index)
  }

  const handleFilter = (e) => {
    const { target: { value } } = e
    value ? filterContent(value) : filterContentSuccess()
  }

  const handleEdit = () => {
    openForm({ ...openFormOptions, edit: true })
    handleMenuClose()
  }

  const handleDelete = () => {
    deleteContent(content.uid, { callbackType: type })
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
                disabled={!filter && (loading || contents.length <= 0)}
                fullWidth
                InputProps={{
                  className: classes.input,
                  disableUnderline: true,
                }}
                onChange={handleFilter}
                placeholder='Procure por título ou data de expiração'
              />
            </Grid>
            <Grid item>
              <Button
                className={classes.button}
                color='primary'
                onClick={() => openForm(openFormOptions)}
                variant='contained'
              >
                Novo(a) {
                  type === 'job'
                    ? 'vaga de emprego'
                    : type === 'culture'
                      ? 'dica cultural'
                      : type === 'course'
                        ? 'curso'
                        : type === 'video'
                          ? 'videoaula'
                          : type === 'game'
                            ? 'jogo'
                            : null
                }
              </Button>
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
              type={type}
              ManagerForm={ManagerForm}
              managerValidation={managerValidation}
            />
          ) : null}
      <List className='loader'>
        {
          loading
            ? null
            : (
              contents.length <= 0
                ? (
                  <Box px={2} py={9.25}>
                    <Typography color='textSecondary' align='center'>
                      Nenhum (a) {
                        type === 'job'
                          ? 'vaga de emprego'
                          : type === 'culture'
                            ? 'dica cultural'
                            : type === 'course'
                              ? 'curso'
                              : type === 'video'
                                ? 'videoaula'
                                : type === 'game'
                                  ? 'jogo'
                                  : null
                      } foi encontrado (a)
                    </Typography>
                  </Box>
                )
                : contents.map(({ uid, image, name, date, url }, index) => (
                  <ListItem
                    aria-haspopup='true'
                    aria-owns={openMenu ? 'menu-content' : undefined}
                    button
                    key={uid}
                    onClick={
                      (e) => {
                        handleContent(index)
                        handleMenu(e)
                      }
                    }
                  >
                    <Avatar src={imgurUtils.get(image).url} />
                    <ListItemText primary={name} secondary={date ? date : url ? url : null} />
                  </ListItem>
                ))
            )
        }
      </List>
      <Menu
        anchorEl={anchorEl}
        handleDialog={handleDialog}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        handleMenuClose={handleMenuClose}
        openMenu={openMenu}
      />
      {
        content
          ? <ViewDialog
            handleDialogClose={handleDialogClose}
            openDialog={openDialog}
            type={type}
            content={content}
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
  type: PropTypes.oneOf(['job', 'culture', 'course', 'video', 'game']),
  getContent: PropTypes.func.isRequired,
  firestore: PropTypes.object.isRequired,
  openSnackbar: PropTypes.func.isRequired,
  formSteps: PropTypes.number,
  filterContent: PropTypes.func.isRequired,
  filterContentSuccess: PropTypes.func.isRequired,
  deleteContent: PropTypes.func.isRequired,
  openForm: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  ManagerForm: PropTypes.any,
  managerValidation: PropTypes.func,
}

const mapStateToProps = ({ firestore }) => ({ firestore })

const mapDispatchToProps = dispatch => ({
  getContent: type => dispatch(getContent({ type })),
  openSnackbar: options => dispatch(openSnackbar(options)),
  filterContent: query => dispatch(filterContent(query)),
  filterContentSuccess: () => dispatch(filterContentSuccess()),
  deleteContent: (uid, options) => dispatch(deleteContent(uid, options)),
  openForm: options => dispatch(openForm(options)),
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(Homepage)

import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  resetImgur,
  uploadToImgur,
  deleteFromImgur
} from 'reducers/imgur/action-creators'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import Toolbar from '@material-ui/core/Toolbar'
import Grid from '@material-ui/core/Grid'
import { unstable_Box as Box } from '@material-ui/core/Box'
import Field from 'components/Field'

import { withStyles } from '@material-ui/styles'

import imgurUtils from 'utils/imgur'
import faceImage from 'media/culture.svg'
import validate from './validate'
import { compose } from 'recompose'

const styles = theme => ({
  inputImage: {
    cursor: 'pointer',
    transition: theme.transitions.create('', {
      duration: theme.transitions.duration.short,
      easing: theme.transitions.easing.easeIn,
    }),
    '&:hover': {
      boxShadow: theme.shadows[6],
      transition: theme.transitions.create('', {
        duration: theme.transitions.duration.short,
        easing: theme.transitions.easing.easeOut,
      }),
    },
  },
})

const FirstStep = (props) => {
  const {
    imgur,
    change,
    resetImgur,
    deleteFromImgur,
    uploadToImgur,
    handleSubmit,
    onSubmit,
    step,
    classes,
  } = props

  useEffect(() => {
    const { info: { url, key } } = imgur
    if (!url) return null
    if (!key) return null

    const imagePreview = document.getElementById('image-preview-b485e324')
    if (imagePreview) {
      imagePreview.src = url
    }

    change('image', imgurUtils.set({ url, key }))
  }, [imgur])

  const handleImage = (e) => {
    const file = e.target.files[0]
    if (!file) return null

    const { info: { key } } = imgur
    resetImgur()
    if (key) {
      deleteFromImgur(key, { reset: false })
    }

    uploadToImgur(file, { reset: false })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box display='none'>
        <Field name='uid' />
      </Box>
      {step === 1 ? <Toolbar>
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <Box display='flex' justifyContent='center'>
              {/* Change to "Avatar" component Mui later */}
              <Box
                component='label'
                height={120}
                htmlFor='label-input-image-470fc69b'
                width={120}
              >
                <Box
                  alt='Preview'
                  borderRadius='50%'
                  component='img'
                  className={classes.inputImage}
                  height='inherit'
                  id='image-preview-b485e324'
                  src={faceImage}
                  width='inherit'
                />
              </Box>
              <Box
                accept='image/*'
                component='input'
                display='none'
                id='label-input-image-470fc69b'
                onChange={handleImage}
                type='file'
              />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
          >
            <Field label='Título' name='name' />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
          >
            <Field label='Data de expiração' name='date' />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <Field label='Descrição' name='description' />
          </Grid>
          <Box display='none'>
            <Field name='image' />
          </Box>
        </Grid>
      </Toolbar> : null}
      {step === 2 ? <div className='loader' /> : null}
    </form>
  )
}

FirstStep.propTypes = {
  imgur: PropTypes.object.isRequired,
  change: PropTypes.func.isRequired,
  resetImgur: PropTypes.func.isRequired,
  deleteFromImgur: PropTypes.func.isRequired,
  uploadToImgur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  imgur: state.imgur,
  step: state.contentForm.step,
  initialValues: state.contentForm.edit
    ? state.contentForm.content
    : null,
})

const mapDispatchToProps = dispatch => ({
  resetImgur: () => dispatch(resetImgur()),
  deleteFromImgur: (key, options) => dispatch(deleteFromImgur(key, options)),
  uploadToImgur: (file, options) => dispatch(uploadToImgur(file, options)),
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'culture-form',
    validate,
  }),
)(FirstStep)
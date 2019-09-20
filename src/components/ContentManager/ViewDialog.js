import React from 'react'
import PropTypes from 'prop-types'

import Paper from '@material-ui/core/Paper'
import { unstable_Box as Box } from '@material-ui/core/Box'
import MuiDialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import Divider from 'components/Divider'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import YouTubePlayer from 'react-player/lib/players/YouTube'
import Typography from '@material-ui/core/Typography'


import imgurUtils from 'utils/imgur'

const PaperComponent = props => (
  <Paper component={Box} width={560} maxHeight={600} {...props} />
)

const Dialog = (props) => {
  const {
    content,
    handleDialogClose,
    openDialog,
    type,
  } = props

  const handleClose = () => {
    handleDialogClose()
  }

  return (
    <MuiDialog
      aria-describedby='content-info'
      aria-labelledby='content-info-title'
      onClose={handleClose}
      open={openDialog}
      PaperComponent={PaperComponent}
    >
      <DialogTitle id='content-info-title'>
        {
          type === 'job'
            ? 'Vaga de emprego'
            : type === 'culture'
              ? 'Dica cultural'
              : type === 'course'
                ? 'Curso'
                : type === 'video'
                  ? 'Videoaula'
                  : type === 'game'
                    ? 'Jogo'
                    : null
        }
      </DialogTitle>
      <DialogContent>
        {content.url ? <DialogContentText
          className='loader'
          component='div'
          id='content-info'
        >
          <YouTubePlayer url={content.url} width='100%' />
          <Box display='block' marginTop={3}>
            <Typography
              align='left'
              gutterBottom
              variant='h5'
            >
              {content.name}
            </Typography>
          </Box>
          <Box display='block' marginTop={1}> {content.description} </Box>
        </DialogContentText> : <DialogContentText
          className='loader'
          component='div'
          id='content-info'
        >
            <Box
              display='block'
              height={{ xs: 120, sm: 180 }}
              mx='auto'
              width={{ xs: 120, sm: 180 }}
            >
              <Box
                alt={content.name}
                borderRadius='50%'
                component='img'
                height='100%'
                src={imgurUtils.get(content.image).url}
                width='100%'
              />
            </Box>
            <Box display='block' marginTop={3}> Título: {content.name} </Box>
            <Box my={0.5}><Divider /></Box>
            <Box display='block'> Data de expiração: {content.date} </Box>
            <Box my={0.5}><Divider /></Box>
            <Box display='block'> Descrição: {content.description} </Box>
            <Box my={0.5}><Divider /></Box>
          </DialogContentText>}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          OK
      </Button>
      </DialogActions>
    </MuiDialog>
  )
}

Dialog.propTypes = {
  content: PropTypes.object.isRequired,
  handleDialogClose: PropTypes.func.isRequired,
  openDialog: PropTypes.bool.isRequired,
  type: PropTypes.oneOf(['job', 'culture', 'course', 'video', 'game']),
}

export default Dialog

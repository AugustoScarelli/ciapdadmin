import red from '@material-ui/core/colors/red'
import green from '@material-ui/core/colors/green'

export default theme => ({
  root: {
    maxHeight: 'calc(100vh - 248px)',
    minHeight: 234,
    overflow: 'auto',
  },
  button: {
    marginRight: theme.spacing.unit,
  },
  input: {
    fontSize: theme.typography.fontSize,
  },
  background: {
    [theme.breakpoints.up('md')]: {
      maxWidth: '85vw',
    },
  },
  error: {
    backgroundColor: red[700],
  },
  success: {
    backgroundColor: green[600],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    fontSize: 20,
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    color: theme.palette.common.white,
    display: 'flex',
    justifyContent: 'center',
  },
})

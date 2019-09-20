export default theme => ({
  firebase: {
    fontFamily: theme.typography.fontFamily,
    fontSize: 24,
    justifyContent: 'center',
  },
  item: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  itemCategory: {
    backgroundColor: '#232f3e',
    boxShadow: '0 -1px 0 #404854 inset',
  },
  itemPrimary: {
    color: 'inherit',
    fontSize: theme.typography.fontSize,
    '&$textDense': {
      fontSize: theme.typography.fontSize,
    },
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.white,
  },
  itemButton: {
    paddingBottom: theme.spacing.unit / 2,
    paddingTop: theme.spacing.unit / 2,
  },
  itemActionable: {
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
  },
  itemActiveItem: {
    color: '#4fc3f7',
  },
  textDense: {},
})

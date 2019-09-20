import React from 'react'
import PropTypes from 'prop-types'

import Toolbar from '@material-ui/core/Toolbar'
import Grid from '@material-ui/core/Grid'
import { unstable_Box as Box } from '@material-ui/core/Box'
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd'
import Field from 'components/Field'
import { Field as RFField } from 'redux-form'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

import { withStyles } from '@material-ui/styles'

const styles = theme => ({
  icon: {
    fill: theme.palette.common.darkIcon,
    height: '100%',
    width: '100%',
  },
})

const renderCheckbox = ({ input, label }) => (
  <Box display='flex' justifyContent='center'>
    <FormControlLabel
      control={
        <Checkbox
          checked={input.value ? true : false}
          onChange={input.onChange}
        />
      }
      label={label}
    />
  </Box>
)

const SecondStep = ({ className, classes }) => (
  <Toolbar className={className}>
    <Grid container spacing={16}>
      <Grid item xs={12}>
        <Box
          height={107}
          margin='auto'
          width={107}
        >
          <AssignmentIndIcon className={classes.icon} />
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
      >
        <Field
          label='CPF'
          name='cpf'
          type='number'
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
      >
        <Field label='Data de nascimento' name='birthdate' />
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
      >
        <Field
          label='Telefone'
          name='phone'
          type='number'
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
      >
        <Field label='CID' name='cid' />
      </Grid>
      <Grid item sm={6} xs={12} >
        <RFField name='voiceControl' component={renderCheckbox} label='Controle por voz' />
      </Grid>
      <Grid item sm={6} xs={12}>
        <RFField name='voiceContext' component={renderCheckbox} label='Ajuda por voz' />
      </Grid>
    </Grid>
  </Toolbar>
)

SecondStep.propTypes = {
  className: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SecondStep)

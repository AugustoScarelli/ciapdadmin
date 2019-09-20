import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { openSnackbar } from 'reducers/snackbar/action-creators'
import { connect } from 'react-redux'

import Toolbar from '@material-ui/core/Toolbar'
import Grid from '@material-ui/core/Grid'
import Panel from 'components/Panel'
import LoginChart from './LoginChart'
import ContractChart from './ContractChart'
import CurriculumChart from './CurriculumChart'

import 'chartist/dist/chartist.css'
import './chartist-override.css'
import { withStyles } from '@material-ui/styles'

import { compose } from 'recompose'

const styles = theme => ({
  grid: {
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing.unit * 2,
    },
  },
})

const General = ({ openSnackbar, classes }) => {
  useEffect(() => {
    const key = 'persist:chart'
    const info = window.localStorage.getItem(key)

    if (!info) {
      localStorage.setItem(key, true)
      openSnackbar({ type: 'info', content: 'Os gráficos, por hora, não representam dados reais', duration: 6000 })
    }
  }, [0])

  return (
    <Toolbar>
      <Grid
        alignItems='center'
        container
        spacing={32}
      >
        <Grid item xs={12} md={4}>
          <Panel
            title='Acessos semanais'
            subtitle='Acessos do sistema educacional nas últimas semanas.'
            color='#57af5b'
            variant='chart'
          >
            <LoginChart />
          </Panel>
        </Grid>
        <Grid
          className={classes.grid}
          item
          xs={12}
          md={4}
        >
          <Panel
            title='Contratos'
            subtitle='Contratos de emprego realizados através do CIAPD em 2019.'
            color='#ffa624'
            variant='chart'
          >
            <ContractChart />
          </Panel>
        </Grid>
        <Grid
          className={classes.grid}
          item
          xs={12}
          md={4}
        >
          <Panel
            title='Currículos'
            subtitle={`Currículos preenchidos e/ou editados pelos alunos neste mês.`}
            color='#ef524f'
            variant='chart'
          >
            <CurriculumChart />
          </Panel>
        </Grid>
      </Grid>
    </Toolbar>
  )
}

General.propTypes = {
  openSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
}

const mapDispatchToProps = dispatch => ({
  openSnackbar: options => dispatch(openSnackbar(options)),
})

export default compose(
  withStyles(styles),
  connect(null, mapDispatchToProps),
)(General)

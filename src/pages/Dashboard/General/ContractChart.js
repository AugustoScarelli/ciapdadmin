import React, { Component } from 'react'
import Chartist from 'chartist'

class ContractChart extends Component {
  state = {
    series: [[542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]]
  }

  componentDidMount() {
    this.contractChart = new Chartist.Bar(
      '#contract-chart',
      {
        labels: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'Mai',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec'
        ],
        series: this.state.series,
      },
      {
        axisX: {
          showGrid: false
        },
        low: 0,
        high: 1000,
        chartPadding: {
          top: 0,
          right: 5,
          bottom: 0,
          left: 0
        }
      }
    )

    this.contractChart.on('draw', data => {
      if (data.type === 'bar') {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * 80,
            dur: 500,
            from: 0,
            to: 1,
            easing: 'ease',
          },
        });
      }
    })

    // Prevent update on mobile scroll
    // Check if exists a better solution for this later
    this.contractChart.on('created', () => {
      this.width = window.innerWidth
      if (this.contractChart) {
        this.contractChart.detach()
      }

      window.addEventListener('resize', () => {
        if (this.width !== window.innerWidth) {
          this.width = window.innerWidth
          if (this.contractChart) {
            this.contractChart.update()
          }
        }
      })
    })
  }

  componentWillUnmount() {
    this.width = null
    this.contractChart = null
  }

  width = null
  contractChart = null

  render() {
    return <div id='contract-chart' />
  }
}

export default ContractChart

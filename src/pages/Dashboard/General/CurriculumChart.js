import React, { Component } from 'react'
import Chartist from 'chartist'

class CurriculumChart extends Component {
  state = {
    series: [[38, 19, 25, 13, 34, 23, 16]]
  }

  componentDidMount() {
    this.curriculumChart = new Chartist.Line(
      '#curriculum-chart',
      {
        labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
        series: this.state.series,
      },
      {
        lineSmooth: Chartist.Interpolation.cardinal({
          tension: 0,
        }),
        low: 0,
        high: 50,
        chartPadding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        }
      }
    )

    this.curriculumChart.on('draw', data => {
      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path
              .clone()
              .scale(1, 0)
              .translate(0, data.chartRect.height())
              .stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint,
          },
        })
      } else if (data.type === 'point') {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * 80,
            dur: 500,
            from: 0,
            to: 1,
            easing: 'ease',
          },
        })
      }
    })

    // Prevent update on mobile scroll
    // Check if exists a better solution for this later
    this.curriculumChart.on('created', () => {
      this.width = window.innerWidth
      if (this.curriculumChart) {
        this.curriculumChart.detach()
      }

      window.addEventListener('resize', () => {
        if (this.width !== window.innerWidth) {
          this.width = window.innerWidth
          if (this.curriculumChart) {
            this.curriculumChart.update()
          }
        }
      })
    })
  }

  componentWillUnmount() {
    this.width = null
    this.curriculumChart = null
  }

  width = null
  curriculumChart = null

  render() {
    return <div id='curriculum-chart' />
  }
}

export default CurriculumChart

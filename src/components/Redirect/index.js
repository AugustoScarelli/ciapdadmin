import { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter as _withRouter } from 'react-router-dom'

class Redirect extends Component {
  static propTypes = {
    to: PropTypes.string.isRequired,
    timer: PropTypes.number,
    history: PropTypes.object.isRequired
  }

  static defaultProps = {
    timer: 500
  }

  componentDidMount() {
    this.timeout = setTimeout(() => {
      this.props.history.push(this.props.to)
    }, this.props.timer)
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout)
    }

    this.timeout = null
  }

  timeout = null

  render() {
    return null
  }
}

const withRouter = () => _withRouter

export default withRouter()(Redirect)

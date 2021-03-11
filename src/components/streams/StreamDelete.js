import React, { Component } from 'react';
import Modal from "../Modal"
import history from "../../history"
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchStream, deleteStream } from "../../actions"


class StreamDelete extends Component {

  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id)
  }

  renderActions() {

    const { id } = this.props.match.params

    return (
      <>
        <button
          onClick={ () => this.props.deleteStream(id) }
          className="ui button negative">Delete</button>
        <Link className="ui button" to={ "/" }>Cancel</Link>
      </>
    )
  }

  renderContent() {
    if (!this.props.stream) {
      return <p>Are you sure you want delete this stream?</p>
    }
    return (
      <p>Are you sure you want delete this stream: <b>"{ this.props.stream.title }"?</b></p>
    )
  }

  render() {
    return (
      <div>
        StreamDelete
        <Modal
          title="Delete Stream"
          content={ this.renderContent() }
          actions={ this.renderActions() }
          onDismiss={ () => history.push("/") }
        />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] }
}


export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);
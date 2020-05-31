import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search: ''
        }
    }
    handleChange = (e) => {
        this.props.onSearch(e.target.value)
    }
    render() {
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <div className="input-field">
                        <input type="text" placeholder="Search" id="search" onChange={this.handleChange} />
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        events: state.firestore.ordered.events,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps)
)(Search)
import React, { Component } from 'react';
import axios from '../../../axios'
import './FullPost.css';

class FullPost extends Component {
    state = {
        fullPost: null,
        error: false
    }
    componentWillMount() {
        if (this.props.match.params.id) {
            if ((!this.state.fullPost) || (this.props.match.params.id !== this.state.fullPost.id)) {
                axios.get("/posts/" + this.props.match.params.id)
                    .then(response => {
                        this.setState({
                            fullPost: response.data
                        })
                    }).catch(error => {
                        if (this.state.error === false) {
                            this.setState({
                                error: true
                            })
                        }
                    })
            }
        }
    }
    deleteHandler = () => {
        axios.delete("/posts/" + this.props.selectedPost)
            .then(response => {
                console.log(response)
            })
    }
    render() {
        let post = <p style={{ textAlign: "center" }}>Please select a Post!</p>;
        if (this.props.selectedPost) {
            post = <p style={{ textAlign: "center" }}>Loading...!</p>;
        }
        if (this.state.error) {
            post = <p style={{ textAlign: "center" }}>Something went wrong</p>
        }

        if (this.state.fullPost) {

            if (!this.state.error) {
                post = (
                    <div className="FullPost">
                        <h1>{this.state.fullPost.title}</h1>
                        <p>{this.state.fullPost.body}</p>
                        <div className="Edit">
                            <button onClick={this.deleteHandler} className="Delete">Delete</button>
                        </div>
                    </div>

                );
            }
        }

        return post;

    }
}

export default FullPost;
import React, { Component } from 'react'
import axios from '../../../axios'
import { Route } from 'react-router-dom'
import Post from '../../../components/Post/Post'
import './Posts.css'
import FullPost from '../FullPost/FullPost'

class Posts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: [],
        }
    }
    articleClickHandler = (id) => {
        this.props.history.push({ pathname: this.props.match.url + '/'+id })
    }
    componentDidMount() {
        axios.get("/posts")
            .then(response => {

                const posts = response.data.slice(0, 3)
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'max'
                    }
                })
                this.setState({
                    posts: updatedPosts
                })

            })
    }
    render() {
        return (
            <div>
                <section className="Posts">
                    {this.state.posts.map((post, i) => {
                        return (
                            // <Link to={'/'+post.id} >
                            <Post key={i} click={this.articleClickHandler.bind(this, post.id)}
                                title={post.title}
                                author={post.author} />
                            // </Link>
                        )
                    }

                    )}
                </section>
                <Route path={ this.props.match.url + '/:id' } exact component={FullPost} />
            </div>
        );
    }
}


export default Posts
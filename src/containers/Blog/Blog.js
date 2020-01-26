import React, { Component } from 'react';

import './Blog.css';
import Posts from './Posts/Posts'
import { Route, NavLink, Switch,Redirect } from 'react-router-dom'
// import NewPost from './NewPost/NewPost'
import asyncComponent from '../../hoc/asyncComponent'

const AsyncNewPost = asyncComponent(() => {
    return import('./NewPost/NewPost')
});


class Blog extends Component {
    state ={
        isAuthenticated :true
    }
    render() {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink
                                exact
                                to="/posts">Posts</NavLink></li>
                            <li><NavLink to={{
                                pathname: '/new-post',
                                hash: "#test",
                                search: "hello=s"
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                {/* <Posts /> */}
                <Switch>
                    <Route  path="/posts"  component={Posts} />
                    { this.state.isAuthenticated ?  
                    <Route path="/new-post" render={(props) => {
                        return <AsyncNewPost {...props}  />
                    }}  />
                     : null}
                    <Route  render={()=>{
                        return <h1>Not Found!</h1>
                    }} />
                    {/* <Redirect from="/" to="/posts" /> */}
                </Switch>
            </div>
        );
    }
}

export default Blog;
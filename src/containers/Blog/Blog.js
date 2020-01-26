import React, { Component, lazy,Suspense } from 'react';

import './Blog.css';
// import Posts from './Posts/Posts'
import { Route, NavLink, Switch,Redirect } from 'react-router-dom'

import asyncComponent from '../../hoc/asyncComponent'
const Posts = lazy(()=>{
    return import('./Posts/Posts')
});
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
                    <Route  path="/posts"  render={(props) =>{
                        return <Suspense fallback="Loading...">
                            <Posts {...props} />
                        </Suspense>
                    }} />
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
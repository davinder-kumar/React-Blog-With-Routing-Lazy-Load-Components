import React, { Component } from 'react'

const asyncComponent = (componentRef) =>{
    return class  extends Component{
        state ={
            component : null
        }
        componentDidMount(){
            // console.log(this.constructor.name,"s")
            componentRef()
            .then((cmp) => {
               this.setState({
                component : cmp.default
               }) 
            })
        }

        render(){
            let Component =  this.state.component
            
            return Component ? <Component {...this.props} /> :null
        }
        
    }
}

export default asyncComponent
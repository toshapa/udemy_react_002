import { Component } from "react";

import ErrorMessage from "../error/error";



class ErrorBoundary extends Component {

    state = {
        error: false
    }
    
    componentDidCatch(prevError) {
        console.log(prevError)
        this.setState({
            error: true
        })
    }
    render () {
        if (this.state.error) {
            return <ErrorMessage/>
        }

        return this.props.children
    }
}

export default ErrorBoundary
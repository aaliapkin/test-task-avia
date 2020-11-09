import React, { Component } from 'react';
import './error-boundary.scss';

export class ErrorBoundary extends Component {

    state = {
        hasError: false
    }

    componentDidCatch() {
        this.setState({
            hasError: true
        });
    }

    render() {
        if (this.state.hasError) {
            return <ErrorIndicator />
        }
        return this.props.children;
    }
};

const ErrorIndicator = () => (

    <div className="error__container">
        <span className="error__icon" />
        <div className="error__desc"><h1>Error!</h1>Something went wrong...</div>
    </div>
)

export { ErrorIndicator };
export default ErrorBoundary;

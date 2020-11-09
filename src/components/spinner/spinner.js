import React, { Component } from 'react';
import './spinner.scss'

export default class Spinner extends Component {
    render() {
        return (
            <div className="spinner__container">
                <div className="spinner__inner-container">
                    <div className="spinner-border spinner" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
        );
    }
};
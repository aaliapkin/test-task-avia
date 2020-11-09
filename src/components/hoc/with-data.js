import React, { Component } from 'react';
import Spinner from '../spinner';
import { ErrorBoundary, ErrorIndicator } from '../error';

const withData = () => (Wrapped) => {
    return class extends Component {

        componentDidMount() {

            const { dataRequest, dataLoaded, dataError, service } = this.props;
            dataRequest();

            service.getFlights()
                .then((data) => {
                    dataLoaded(data);
                })
                .catch(() => {
                    dataError();
                });
        }

        render() {

            const { data, loading, error } = this.props;

            if (loading) {
                return <Spinner />;
            }

            if (error) {
                return <ErrorIndicator />;
            }

            return (
                <ErrorBoundary>
                    <Wrapped {...this.props} data={data} />
                </ErrorBoundary>
            );
        }
    };
};

export default withData;

import React, { Component } from 'react';
import Spinner from '../spinner';
import { ErrorBoundary, ErrorIndicator } from '../error';

const withData = (method) => (Wrapped) => {
    return class extends Component {

        componentDidMount() {
            this.update();
        }

        componentDidUpdate(prevProps) {
            const { loading } = this.props;
            if (this.props.filter !== prevProps.filter && loading == false) {
                this.update();
            }
        }

        update() {
            const { dataRequest, dataError, service, dataLoaded, filter, param } = this.props;
            dataRequest();
            service[method](filter, param)
                .then((data) => {
                    dataLoaded(data);
                })
                .catch(() => {
                    dataError();
                });
        }

        render() {
            const { loading, error, data } = this.props;

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

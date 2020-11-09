import React, { Component } from 'react';
import Spinner from '../spinner';
import { ErrorBoundary, ErrorIndicator } from '../error';

const sortCallback = (a, b, type) => {
    if (type === 'price_desc') {
        return a.flight.price.total.amount - b.flight.price.total.amount;
    }
    if (type === 'price_asc') {
        return b.flight.price.total.amount - a.flight.price.total.amount;
    }
    return 0;
}

const withData = () => (Wrapped) => {
    return class extends Component {

        componentDidMount() {
            this.update();
        }

        componentDidUpdate(prevProps) {
            const { flights: { loading } } = this.props;
            if (this.props.filter !== prevProps.filter && loading == false) {
                this.update();
            }
        }

        update() {
            const { dataRequest, dataError, service } = this.props;
            dataRequest();

            service.getFlights()
                .then((data) => {
                    this.dataReady(data);
                })
                .catch(() => {
                    dataError();
                });
        }

        dataReady(data) {
            const { dataLoaded, filter } = this.props;
            data.flights.sort((a, b) => sortCallback(a, b, filter.sorting));
            dataLoaded(data);
        }

        render() {

            const { loading, error, data } = this.props.flights;

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

import React from 'react';
import { ServiceConsumer } from '../../flight-service';

const WithFlightService = () => (Wrapped) => {

    return (props) => {
        return (
            <ServiceConsumer>
                {
                    (openWeatherMapService) => {
                        return (<Wrapped {...props}
                            service={openWeatherMapService} />);
                    }
                }
            </ServiceConsumer>
        );
    }
};

export default WithFlightService;

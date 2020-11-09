import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import { store } from './redux';
import { Provider } from 'react-redux';
import { ServiceProvider, FlightService } from './flight-service';

import './index.scss';

const flightService = new FlightService();

const update = () => {

    ReactDOM.render(
        <ServiceProvider value={flightService}>
            <Provider store={store}>
                <App />
            </Provider>
        </ServiceProvider>
        , document.getElementById('root'));
}

update();
store.subscribe(update);

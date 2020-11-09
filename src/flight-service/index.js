import React from 'react'
import FlightService from './flight-service';

const {
    Provider: ServiceProvider,
    Consumer: ServiceConsumer
} = React.createContext();

export {
    ServiceConsumer,
    ServiceProvider,
    FlightService
};
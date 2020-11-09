import { createStore } from 'redux';

const initialState = {
    flights: {
        data: {},
        loading: true,
        error: false
    }
};

const flightsReducer = (state, action) => {
    switch (action.type) {

        case 'FETCH_FLIGHTS_REQUEST':
            return {
                data: {},
                loading: true,
                error: false
            };

        case 'FETCH_FLIGHTS_SUCCESS':
            return {
                data: action.payload,
                loading: false,
                error: null
            };

        case 'FETCH_FLIGHTS_FAILURE':
            return {
                data: [],
                loading: false,
                error: action.payload
            };

        default:
            return state.flights;
    }
}

const reducer = (state = initialState, action) => {
    return {
        flights: flightsReducer(state, action)
    };
};

const store = createStore(reducer);

export { store };
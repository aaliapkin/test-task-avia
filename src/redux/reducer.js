import { createStore } from 'redux';

const filterReducer = (state, action) => {

    if (state === undefined) {
        return {
            sorting: 'price_asc',
            change: [],
            priceFrom: 0,
            priceTo: 0,
            airline: []
        };
    }

    switch (action.type) {
        case 'SET_SORTING_VALUE':
            return {
                ...state.filter,
                sorting: action.payload
            };

        case 'SET_CHANGE_FILTER_VALUE':
            let newChange = [...state.filter.change];
            if (action.payload.value === false) {
                newChange = newChange.filter((el) => el !== action.payload.index);
            } else {
                newChange.push(action.payload.index);
            }

            return {
                ...state.filter,
                change: newChange
            };

        case 'SET_AIRLINE_FILTER_VALUE':
            let newAirline = [...state.filter.airline];
            if (action.payload.value === false) {
                newAirline = newAirline.filter((el) => el !== action.payload.code);
            } else {
                newAirline.push(action.payload.code);
            }

            return {
                ...state.filter,
                airline: newAirline
            };

        case 'SET_FILTER_PRICE_TO':
            return {
                ...state.filter,
                priceTo: +action.payload
            };

        case 'SET_FILTER_PRICE_FROM':
            return {
                ...state.filter,
                priceFrom: +action.payload
            };

        default:
            return state.filter;
    }
}


const airlinesReducer = (state, action) => {

    if (state === undefined) {
        return {
            data: [],
            loading: true,
            error: false
        };
    }

    switch (action.type) {

        case 'FETCH_AIRLINES_REQUEST':
            return {
                data: [],
                loading: true,
                error: false
            };

        case 'FETCH_AIRLINES_SUCCESS':
            return {
                data: action.payload,
                loading: false,
                error: null
            };

        case 'FETCH_AIRLINES_FAILURE':
            return {
                data: [],
                loading: false,
                error: action.payload
            };

        default:
            return state.airlines;
    }
}


const flightsReducer = (state, action) => {
    if (state === undefined) {
        return {
            data: [],
            loading: true,
            error: false,
            full: false
        };
    }

    switch (action.type) {

        case 'SET_SORTING_VALUE':
        case 'SET_CHANGE_FILTER_VALUE':
        case 'SET_FILTER_PRICE_TO':
        case 'SET_FILTER_PRICE_FROM':
        case 'SET_AIRLINE_FILTER_VALUE':
            return { ...state, data: [] };

        case 'FETCH_FLIGHTS_REQUEST':
            return {
                data: [...state.data],
                loading: true,
                error: false,
                full: false
            };

        case 'FETCH_FLIGHTS_SUCCESS':
            return {
                data: [...state.data, ...action.payload],
                loading: false,
                error: null,
                full: false
            };

        case 'FETCH_FLIGHTS_FAILURE':
            return {
                data: [],
                loading: false,
                error: action.payload,
                full: false
            };

        case 'FETCH_FLIGHTS_FULL':
            return {
                ...state,
                full: true
            };
        default:
            return state;
    }
}

const reducer = (state, action) => {

    return {
        flights: flightsReducer(state?.flights, action),
        filter: filterReducer(state, action),
        airlines: airlinesReducer(state, action)
    };
};

const store = createStore(reducer);

export { store };
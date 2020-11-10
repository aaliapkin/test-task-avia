export const flightsRequest = () => {
    return {
        type: 'FETCH_FLIGHTS_REQUEST'
    };
}

export const flightsLoaded = (data) => {
    return {
        type: 'FETCH_FLIGHTS_SUCCESS',
        payload: data
    };
}

export const flightsError = (error) => {
    return {
        type: 'FETCH_FLIGHTS_FAILURE',
        payload: error
    };
}

export const airlinesRequest = () => {
    return {
        type: 'FETCH_AIRLINES_REQUEST'
    };
}

export const airlinesLoaded = (data) => {
    return {
        type: 'FETCH_AIRLINES_SUCCESS',
        payload: data
    };
}

export const airlinesError = (error) => {
    return {
        type: 'FETCH_AIRLINES_FAILURE',
        payload: error
    };
}

export const setSorting = (value) => {
    return {
        type: 'SET_SORTING_VALUE',
        payload: value
    };
}

export const setChangeFilter = (value) => {
    return {
        type: 'SET_CHANGE_FILTER_VALUE',
        payload: value
    };
}

export const setPriceTo = (value) => {
    return {
        type: 'SET_FILTER_PRICE_TO',
        payload: value
    };
}

export const setPriceFrom = (value) => {
    return {
        type: 'SET_FILTER_PRICE_FROM',
        payload: value
    };
}

export const setAirlineFilter = (value) => {
    return {
        type: 'SET_AIRLINE_FILTER_VALUE',
        payload: value
    };
}
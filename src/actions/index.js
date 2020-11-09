
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

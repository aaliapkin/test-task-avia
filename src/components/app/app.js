import React from 'react';
import Filter from '../filter';
import FlightList from '../flight-list';

const App = () => {
    return (
        <div className="container">
            <div className="wrapper">
                <div className="wrapper__left">
                    <Filter />
                </div>
                <div className="wrapper__right">
                    <FlightList />
                </div>
            </div>
        </div>
    );
}

export default App;

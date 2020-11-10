import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import WithFlightService from '../hoc/with-flight-service';
import { WithData } from '../hoc';
import { airlinesRequest, airlinesLoaded, airlinesError } from '../../actions';

const Airline = (props) => {

    let { data, filter, setAirlineFilter } = props;

    let airlines = [...data];

    for (let fil of filter.airline) {
        for (let line of airlines) {
            if (line.code === fil) {
                line.checked = true;
            }
        }
    }

    let elements = airlines.map((el) => (
        <div className="cost__filter-row filter__row" key={el.code}>
            <div className="cost__filter-name">
                <input
                    type="checkbox"
                    name="polish"
                    checked={el.checked}
                    onChange={(e) => setAirlineFilter({ code: el.code, value: e.target.checked })} />
                <label htmlFor="polish" className="filter__label-right">{el.caption}</label>
            </div>
            <div className="cost__filter-cost">от {el.price} р.</div>
        </div>
    ));

    return (
        <React.Fragment>
            {elements}
        </React.Fragment>
    );
}


const mapStateToProps = () => ({ airlines: { data, loading, error }, filter }) => ({ data, loading, error, filter });

const mapDispatchToProps = (dispatch) => {
    return {
        dataRequest: () => dispatch(airlinesRequest()),
        dataLoaded: (data) => dispatch(airlinesLoaded(data)),
        dataError: () => dispatch(airlinesError())
    };
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    WithFlightService(),
    WithData('getAirlines')
)(Airline);

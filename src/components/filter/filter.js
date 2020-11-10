import React from 'react';
import { connect } from 'react-redux';
import './filter.scss';
import { setSorting, setChangeFilter, setPriceTo, setPriceFrom, setAirlineFilter } from '../../actions';
import Airline from '../airline';

const Filter = (props) => {

    const { sorting, setSorting, setChangeFilter, setPriceTo, setPriceFrom, setAirlineFilter } = props;

    return (
        <div className="filter__wrapper">
            <div className="filter__body">
                <form className="filter__form" action="">

                    <h2 className="filter__title">Сортировать</h2>

                    <div className="filter__row">
                        <input
                            type="radio"
                            name="sort"
                            value="price_asc"
                            checked={sorting === 'price_asc' ? true : false}
                            onChange={() => setSorting('price_asc')}
                        />
                        <label htmlFor="price_asc" className="filter__label-right">по возрастанию цены</label>
                    </div>
                    <div className="filter__row">
                        <input
                            type="radio"
                            name="sort"
                            value="price_desc"
                            checked={sorting === 'price_desc' ? true : false}
                            onChange={() => setSorting('price_desc')}
                        />
                        <label htmlFor="price_desc" className="filter__label-right">по убыванию в цене</label>
                    </div>
                    <div className="filter__row">
                        <input
                            type="radio"
                            name="sort"
                            value="time"
                            checked={sorting === 'time' ? true : false}
                            onChange={() => setSorting('time')}
                        />
                        <label htmlFor="time" className="filter__label-right">по времени в пути</label>
                    </div>

                    <h2 className="filter__title">Фильтровать</h2>

                    <div className="filter__row">
                        <input
                            type="checkbox"
                            name="1relay"
                            onChange={(e) => { setChangeFilter({ index: 1, value: e.target.checked }) }}
                        />
                        <label htmlFor="1relay" className="filter__label-right">1 пересадка</label>
                    </div>
                    <div className="filter__row">
                        <input
                            type="checkbox"
                            name="0relay"
                            onChange={(e) => { setChangeFilter({ index: 0, value: e.target.checked }) }}
                        />
                        <label htmlFor="0relay" className="filter__label-right">без пересадок</label>
                    </div>

                    <h2 className="filter__title">Цена</h2>

                    <div className="filter__row">
                        <label htmlFor="from">От</label>
                        <input
                            name="from"
                            type="text"
                            onChange={(e) => { setPriceFrom(e.target.value) }} />
                    </div>
                    <div className="filter__row">
                        <label htmlFor="to">До</label>
                        <input
                            name="from"
                            type="text"
                            onChange={(e) => { setPriceTo(e.target.value) }} />
                    </div>

                    <h2 className="filter__title cost__filter">Цена</h2>

                    <Airline setAirlineFilter={setAirlineFilter} />

                </form>
            </div>
        </div>
    );
}

const mapStateToProps = () => ({ filter }) => (filter);

const mapDispatchToProps = (dispatch) => {
    return {
        setSorting: (value) => dispatch(setSorting(value)),
        setChangeFilter: (value) => dispatch(setChangeFilter(value)),
        setPriceTo: (value) => dispatch(setPriceTo(value)),
        setPriceFrom: (value) => dispatch(setPriceFrom(value)),
        setAirlineFilter: (value) => dispatch(setAirlineFilter(value))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
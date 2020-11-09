import React from 'react';
import { connect } from 'react-redux';
import './filter.scss';
import { setSorting } from '../../actions';

const Filter = (props) => {

    const { sorting, setSorting } = props;

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
                        <label htmlFor="radio" className="filter__label-right">по возрастанию цены</label>
                    </div>
                    <div className="filter__row">
                        <input
                            type="radio"
                            name="sort"
                            value="price_desc"
                            checked={sorting === 'price_desc' ? true : false}
                            onChange={() => setSorting('price_desc')}
                        />
                        <label htmlFor="radio" className="filter__label-right">по убыванию в цене</label>
                    </div>
                    <div className="filter__row">
                        <input
                            type="radio"
                            name="sort"
                            value="time"
                            checked={sorting === 'time' ? true : false}
                            onChange={() => setSorting('time')}
                        />
                        <label htmlFor="radio" className="filter__label-right">по времени в пути</label>
                    </div>

                    <h2 className="filter__title">Фильтровать</h2>

                    <div className="filter__row">
                        <input type="checkbox" name="1relay" />
                        <label htmlFor="radio" className="filter__label-right">1 пересадка</label>
                    </div>
                    <div className="filter__row">
                        <input type="checkbox" name="1relay" />
                        <label htmlFor="radio" className="filter__label-right">без пересадок</label>
                    </div>

                    <h2 className="filter__title">Цена</h2>

                    <div className="filter__row">
                        <label htmlFor="from">От</label><input name="from" type="text" />
                    </div>
                    <div className="filter__row">
                        <label htmlFor="to">До</label><input name="to" type="text" />
                    </div>

                    <h2 className="filter__title cost__filter">Цена</h2>

                    <div className="cost__filter-row filter__row">
                        <div className="cost__filter-name">
                            <input type="checkbox" name="polish" />
                            <label htmlFor="polish" className="filter__label-right">LOT Polish Airlines</label>
                        </div>
                        <div className="cost__filter-cost">
                            от 21049 р.
                                </div>
                    </div>

                    <div className="cost__filter-row filter__row">
                        <div className="cost__filter-name">
                            <input type="checkbox" name="polish" />
                            <label htmlFor="polish" className="filter__label-right cost__filter-label">Аэрофлот —
                                        Российские авиалинии</label>
                        </div>
                        <div className="cost__filter-cost">
                            от 21049 р.
                                </div>
                    </div>

                </form>
            </div>
        </div>
    );
}

const mapStateToProps = () => ({ filter }) => (filter);

const mapDispatchToProps = (dispatch) => {
    return {
        setSorting: (value) => dispatch(setSorting(value))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { WithData } from '../hoc';
import WithFlightService from '../hoc/with-flight-service';
import './flight-list.scss';
import { flightsRequest, flightsLoaded, flightsError } from '../../actions';

function hashCode(str) {
    var hash = 0, i, chr;
    for (i = 0; i < str.length; i++) {
        chr = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}

// AF: "Air France"
// AY: "Finnair Oyj"
// AZ: "Alitalia Societa Aerea Italiana"
// BT: "Air Baltic Corporation A/S"
// KL: "KLM"
// LO: "LOT Polish Airlines"
// PC: "Pegasus Hava Tasimaciligi A.S."
// SN: "Brussels Airlines"
// SU: "Аэрофлот - российские авиалинии"
// TK: "TURK HAVA YOLLARI A.O."

const airlines = {
    'AF': 'img/airfrance.png',
    'AY': 'img/polish-airlines.png',
    'AZ': 'img/polish-airlines.png',
    'BT': 'img/polish-airlines.png',
    'KL': 'img/klm.png',
    'LO': 'img/polish-airlines.png',
    'PC': 'img/polish-airlines.png',
    'SN': 'img/brussels.png',
    'SU': 'img/aeroflot.png',
    'TK': 'img/polish-airlines.png',
};

const months = ['янв', 'фев', 'март', 'апр', 'май', 'июнь', 'июль', 'авг', 'сен', 'окт', 'ноя', 'дек'];
const weekdays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

function getCarriers(flights) {
    let carriers = {};

    for (let d of flights) {
        carriers[d.flight.carrier.airlineCode] = d.flight.carrier.caption;
    }

    //console.log(carriers);
}

const formatDate = (date) => {
    let d = new Date(Date.parse(date));
    let ret;
    ret = {
        date: `${d.getDate()} ${months[d.getMonth()]}. ${weekdays[d.getDay()]}`,
        time: `${d.getHours()}:${('0' + d.getMinutes()).slice(-2)}`
    };
    return ret;
}

const flightHours = (minutes) => {
    return `${Math.floor(minutes / 60)} ч ${('0' + minutes % 60).slice(-2)} мин`;
}

const FlightList = (props) => {

    let { data: { flights } } = props;

    //getCarriers(flights);

    flights = [...flights.slice(0, 50)];

    let flightElements = flights.map(({ flightToken, flight }) => {
        return (<FlightElement key={hashCode(flightToken)} flight={flight} />);
    });

    return (
        <React.Fragment>
            {flightElements}
            <button className="flight__more">Показать еще</button>
        </React.Fragment>
    );
}

const FlightElement = ({ flight }) => {

    const price = flight.price.total.amount;
    // const ccy = flight.price.total.currencyCode;
    const carrier = flight.carrier.airlineCode;

    // if (ccy === 'RUB') {
    //     return <></>;
    // }

    return (
        <React.Fragment>

            <div className="flight__header">
                <img src={airlines[carrier]} alt="polish airlines" className="flight__image" />
                <div className="flight__cost-group">
                    <div className="flight__cost">{price}</div>
                    <div className="flight__cost-desc">Стоимость для одного взрослого пассажира</div>
                </div>
            </div>

            <FlightLeg leg={flight.legs[0]} />

            <div className="flight__spacer"></div>

            <FlightLeg leg={flight.legs[1]} />

            <button className="flight__select">ВЫБРАТЬ</button>

        </React.Fragment>
    );
}

const FlightLeg = ({ leg }) => {

    // if (leg.segments.length === 2) {
    //     return <></>;
    // }

    let firstseg = leg.segments[0];
    let lastseg = leg.segments[leg.segments.length - 1];

    // let departureCity = firstseg.departureCity?.caption ?? '';
    // let departureAirport = firstseg.departureAirport.caption;
    let departureAirportCode = firstseg.departureAirport.uid;
    let departure = (firstseg.departureCity?.caption === undefined ? '' : firstseg.departureCity.caption + ', ') + firstseg.departureAirport.caption;


    // let arrivalCity = lastseg.arrivalCity?.caption ?? '';
    // let arrivalAirport = lastseg.arrivalAirport.caption;
    let arrivalAirportCode = lastseg.arrivalAirport.uid;
    let arrival = (lastseg.arrivalCity?.caption === undefined ? '' : lastseg.arrivalCity.caption + ', ') + lastseg.arrivalAirport.caption;

    let layoverCount = leg.segments.length - 1;
    let layover = '';
    switch (layoverCount) {
        case 0:
            layover = 'без пересадок';
            break;
        case 1:
            layover = '1 пересадка';
            break;
        case 2:
            layover = '2 пересадки';
            break;
        case 3:
            layover = '3 пересадки';
            break;
        case 4:
            layover = '4 пересадки';
            break;
        default:
            layover = layoverCount + ' пересадок';
            break;
    }

    const { date: departureDate, time: departureTime } = formatDate(firstseg.departureDate);
    const { date: arrivalDate, time: arrivalTime } = formatDate(lastseg.arrivalDate);
    const carrier = firstseg.airline.caption;

    return (
        <React.Fragment>
            <div className="flight__element element-flight">
                <div className="element-flight__title">
                    <div className="element-flight__city">{departure}<span>({departureAirportCode})</span></div>
                    <div className="element-flight__arrow">&#8594;</div>
                    <div className="element-flight__city">{arrival}<span>({arrivalAirportCode})</span></div>
                </div>
                <div className="element-flight__time">
                    <div className="element-flight__time-val">{departureTime} <span>{departureDate}</span></div>
                    <div className="element-flight__time-period">{flightHours(leg.duration)}</div>
                    <div className="element-flight__time-val"><span>{arrivalDate}</span> {arrivalTime}</div>
                </div>
                <div className="element-flight__relay"><span>{layover}</span></div>
                <div className="element-flight__transporter">Рейс выполняет: {carrier}</div>
            </div>
        </React.Fragment>
    );

}


const mapStateToProps = () => ({ flights: { data, loading, error }, filter }) => ({ data, loading, error, filter });

const mapDispatchToProps = (dispatch) => {
    return {
        dataRequest: () => dispatch(flightsRequest()),
        dataLoaded: (data) => dispatch(flightsLoaded(data)),
        dataError: () => dispatch(flightsError())
    };
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    WithFlightService(),
    WithData('getFlights2')
)(FlightList);

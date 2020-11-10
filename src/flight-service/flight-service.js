import { data } from './data';

function hashCode(str) {
    var hash = 0, i, chr;
    for (i = 0; i < str.length; i++) {
        chr = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}

export default class FlightService {

    url = 'http://localhost:3001/result';

    getFlights = async () => {
        const res = await fetch(`${this.url}`);
        if (!res.ok) {
            throw new Error(`Could not fetch ${this.url}, received ${res.status}`)
        }
        return await res.json();
    }


    getJson = async () => {
        return data;
    }

    getFlights2 = async (filter, start, limit) => {
        // const res = await fetch(`${this.url}`);
        // if (!res.ok) {
        //     throw new Error(`Could not fetch ${this.url}, received ${res.status}`);
        // }
        // let data = await res.json();
        let res = await this.getJson();
        let data = res;
        let flights = data;
        flights = flights
            .sort((a, b) => this.sortCallback(a, b, filter))
            .filter(el => this.filterCallback(el, filter))
            .filter(el => this.filterAirlineCallback(el, filter));
        //debugger;
        console.log('start, start + limit', start, start + limit);
        flights = [...flights.slice(start, start + limit)];
        return flights;
    }

    getAirlines = async (filter) => {
        // const res = await fetch(`${this.url}`);
        // if (!res.ok) {
        //     throw new Error(`Could not fetch ${this.url}, received ${res.status}`);
        // }
        // let data = await res.json();
        // // let data = this.getJson();
        // data.flights = data.flights.filter(el => this.filterCallback(el, filter));


        let res = await this.getJson();
        let data = res;
        let flights = data;

        let carriers = {};
        for (let fl of flights) {
            let price = fl.flight.price.total.amount;
            let code = fl.flight.carrier.airlineCode;
            let caption = fl.flight.carrier.caption;
            if (carriers[code] === undefined) {
                carriers[code] = {
                    price: price,
                    caption: caption
                };
            } else {
                if (+price < +carriers[code].price) {
                    carriers[code].price = price;
                }
            }
        }
        let carriersArray = [];
        for (let property in carriers) {
            carriersArray.push({
                price: carriers[property].price,
                caption: carriers[property].caption,
                code: property
            });
        }
        return carriersArray;
    }

    sortCallback = (a, b, filter) => {
        let { sorting } = filter;
        if (sorting === 'price_desc') {
            return b.flight.price.total.amount - a.flight.price.total.amount;
        }
        if (sorting === 'price_asc') {
            return a.flight.price.total.amount - b.flight.price.total.amount;
        }
        if (sorting === 'time') {
            return -(b.flight.legs[0].duration + b.flight.legs[1].duration) +
                (a.flight.legs[0].duration + a.flight.legs[1].duration);
        }
        return 0;
    }

    filterCallback = (el, filter) => {
        const { change, priceFrom, priceTo, airline } = filter;
        //console.log(filter);
        //console.log(el);

        let changes = Math.max(el.flight.legs[0].segments.length - 1, el.flight.legs[1].segments.length - 1);

        if (change.length > 0) {
            let ret2 = false;
            for (let c of change) {
                if (c === changes) {
                    ret2 = true;
                }
            }
            if (ret2 === false) {
                return false;
            }
        }

        if (priceFrom > 0) {
            if (+el.flight.price.total.amount < priceFrom) {
                return false;
            }
        }

        if (priceTo > 0) {
            if (+el.flight.price.total.amount > priceTo) {
                return false;
            }
        }
        return true;
    }


    filterAirlineCallback = (el, filter) => {
        const { airline } = filter;

        //console.log(el);

        if (airline.length > 0) {
            let res = false;
            for (let line of airline) {
                if (line === el.flight.carrier.airlineCode) {
                    res = true;
                }
            }
            if (res === false) {
                return false;
            }
        }

        return true;
    }

}
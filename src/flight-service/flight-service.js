export default class FlightService {

    url = 'http://localhost:3001/result';

    getFlights = async () => {
        const res = await fetch(`${this.url}`);
        if (!res.ok) {
            throw new Error(`Could not fetch ${this.url}, received ${res.status}`)
        }
        return await res.json();
    }

    getFlights2 = async (sort, filter, start, limit) => {
        const res = await fetch(`${this.url}`);
        if (!res.ok) {
            throw new Error(`Could not fetch ${this.url}, received ${res.status}`);
        }
        let data = await res.json();
        data = this.calculateTotalTime(data);
    }

    calculateTotalTime(data) {
        for (let f of data.flights) {
            console.log(f);
        }
        return data;
    }

}
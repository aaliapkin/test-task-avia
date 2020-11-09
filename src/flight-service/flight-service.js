export default class FlightService {

    url = 'http://localhost:3001/result';

    getFlights = async () => {
        const res = await fetch(`${this.url}`);
        if (!res.ok) {
            throw new Error(`Could not fetch ${this.url}, received ${res.status}`)
        }
        return await res.json();
    }



}
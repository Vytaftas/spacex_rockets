import axios from 'axios';
import { IRocket } from '../components/organisms/RocketsSearchFilter/types';
import { IShip } from '../components/organisms/ShipsSearchFilter/types';

const httpClient = axios.create({
    baseURL: 'https://api.spacexdata.com/v3',
    timeout: 1000,
});

httpClient.interceptors.response.use(
    (response) => response.data,
    (error) => Promise.reject(error)
);
class API {
    private rockets: string;
    private ships: string;

    constructor() {
        this.rockets = '/rockets';
        this.ships = '/ships';
    }

    public async getRockets(): Promise<IRocket[]> {
        const rockets: IRocket[] = await httpClient.get(this.rockets);
        return rockets;
    }

    public async getShips(): Promise<IShip[]> {
        const ships: IShip[] = await httpClient.get(this.ships);
        return ships;
    }
}

export default new API();

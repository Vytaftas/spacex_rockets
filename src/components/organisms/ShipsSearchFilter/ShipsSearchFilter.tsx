import SearchBar from '../../molecules/SearchBar';
import Table from '../../molecules/Table';
import API from '../../../shared/api';
import Loader from '../../atoms/Loader';
import Message from '../../atoms/Message';

import { StyledSearchFilter } from './styles';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { IShip } from './types';

const ShipsSearchFilter = () => {
    const [filteredData, setFilteredData] = useState<IShip[]>([]);

    const getShipData = async () => {
        const data = (await API.getShips()) as IShip[];

        const shipsData = data.map((ship) => {
            const { ship_id, ship_name, ship_type, weight_kg, year_built, home_port } = ship;
            return { id: ship_id, ship_name, ship_type, weight_kg, year_built, home_port };
        });

        return shipsData;
    };

    const query = useQuery({
        queryKey: ['ships'],
        queryFn: getShipData,
    });

    const { data, isError, isLoading } = query;

    useEffect(() => {
        setFilteredData(() => data as IShip[]);
    }, [data]);

    return (
        <StyledSearchFilter>
            <SearchBar searchBarName='SpaceX ships' isLoading={isLoading} isError={isError} filterData={[data, filteredData, setFilteredData]} />
            {isLoading ? (
                <Loader />
            ) : isError ? (
                <Message message={'API Error.. Try again later..'} />
            ) : (
                data && <Table filterData={[filteredData, setFilteredData]} />
            )}
        </StyledSearchFilter>
    );
};

export default ShipsSearchFilter;

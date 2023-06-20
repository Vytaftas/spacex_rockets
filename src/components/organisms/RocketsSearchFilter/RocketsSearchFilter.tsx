import SearchBar from '../../molecules/SearchBar';
import Table from '../../molecules/Table';
import API from '../../../api';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { IRocket, IRocketMapped } from './types';
import { StyledSearchFilter } from './styles';

const RocketsSearchFilter = () => {
    const [filteredData, setFilteredData] = useState<IRocketMapped[]>([]);

    const getRockets = async () => {
        const data = await API.getRockets();
        const rocketData = data.map((rocket: IRocket) => {
            return {
                id: rocket.id,
                rocket_name: rocket.rocket_name,
                diameter: rocket?.diameter?.meters,
                height: rocket?.height?.meters,
                mass: rocket?.mass?.kg,
                cost_per_launch: rocket.cost_per_launch,
            };
        });

        return rocketData;
    };

    const query = useQuery({
        queryKey: ['rockets'],
        queryFn: getRockets,
    });

    const { data, isError, isLoading } = query;

    useEffect(() => {
        setFilteredData(() => data as IRocketMapped[]);
    }, [data]);

    return (
        <StyledSearchFilter>
            <SearchBar searchBarName='SpaceX Rockets' isLoading={isLoading} isError={isError} filterData={[data, filteredData, setFilteredData]} />
            {isLoading ? 'LOADING' : isError ? 'API Error.. Try again later..' : data && <Table filterData={[filteredData, setFilteredData]} />}
        </StyledSearchFilter>
    );
};

export default RocketsSearchFilter;

import SearchBar from '../../molecules/SearchBar';
import Table from '../../molecules/Table';
import API from '../../../shared/api';
import Loader from '../../atoms/Loader';
import Message from '../../atoms/Message';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { IRocket, IRocketMapped } from './types';
import { StyledSearchFilter } from './styles';

import { FilterBy, filterRows } from '../../../shared/helpers/filterRows';

const RocketsSearchFilter = () => {
    const [filteredData, setFilteredData] = useState<object[]>([]);

    const activeFilter = 'cost_per_launch';

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

        filterRows(rocketData, activeFilter, FilterBy.descending);

        setFilteredData(() => rocketData as IRocketMapped[]);
        return rocketData;
    };

    const query = useQuery({
        queryKey: ['rockets'],
        queryFn: getRockets,
    });

    const { data, isError, isLoading } = query;

    return (
        <StyledSearchFilter id='rockets_filter'>
            <SearchBar
                searchBarName='SpaceX rockets'
                isLoading={isLoading}
                isError={isError}
                filterData={[data as object[], filteredData, setFilteredData]}
            />
            {isLoading ? (
                <Loader />
            ) : isError ? (
                <Message message={'API Error.. Try again later..'} />
            ) : (
                data && <Table showIdColumn activeFilter={activeFilter} tableID='rockets_filter' filterData={[filteredData, setFilteredData]} />
            )}
        </StyledSearchFilter>
    );
};

export default RocketsSearchFilter;

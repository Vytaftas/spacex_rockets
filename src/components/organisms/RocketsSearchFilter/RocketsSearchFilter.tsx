import SearchBar from '../../molecules/SearchBar';
import Table from '../../molecules/Table';
import { StyledRocketsSearchFilter } from './styles';
import { useQuery } from '@tanstack/react-query';
import { useState, ChangeEvent, useEffect } from 'react';
import { IRocket } from './types';
import axios from 'axios';

const RocketsSearchFilter = () => {
    const [filteredData, setFilteredData] = useState<IRocket[] | null>(null);

    const getRockets = async () => {
        const data: IRocket[] = await axios.get('https://api.spacexdata.com/v3/rockets').then((data) => data.data);
        const rocketData = data.map((rocket: IRocket) => {
            return {
                id: rocket.id,
                cost_per_launch: rocket.cost_per_launch,
                rocket_name: rocket.rocket_name,
                height: rocket?.height?.meters,
                diameter: rocket?.diameter?.meters,
                mass: rocket?.mass?.kg,
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
        setFilteredData((prev) => data);
    }, [data]);

    const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;

        if (target) {
            const filteredRockets = data?.filter((item) => {
                return Object.values(item).some((itemValue) => {
                    return itemValue?.toString().toLowerCase().includes(target.value.toString().toLowerCase());
                });
            });

            // if (filteredRockets) setFilteredData((prev) => filteredRockets);
            setFilteredData((prev) => [...filteredRockets]);
        }
    };

    const handleFilterClick = (currentHeading) => {
        const target = currentHeading;
        const targetColumn = target.getAttribute('data-target');
        const order = target.getAttribute('data-order');
        console.log(target);

        switch (targetColumn) {
            case 'rocket_name': {
                const filteredRockets = filteredData?.sort((a, b) => {
                    return order === 'ASC' ? b[targetColumn].localeCompare(a[targetColumn]) : a[targetColumn].localeCompare(b[targetColumn]);
                });

                setFilteredData((prev) => [...filteredRockets]);
                break;
            }
            default: {
                const filteredRockets = filteredData?.sort((a, b) =>
                    order === 'ASC' ? b[targetColumn] - a[targetColumn] : a[targetColumn] - b[targetColumn]
                );

                setFilteredData((prev) => [...filteredRockets]);
                break;
            }
        }
    };

    return (
        <StyledRocketsSearchFilter>
            <SearchBar
                isLoading={isLoading}
                isError={isError}
                action={handleSearchInput}
                numResults={filteredData ? filteredData.length : data?.length}
            />
            {isLoading
                ? 'LOADING'
                : isError
                ? 'API Error.. Try again later..'
                : data && <Table data={filteredData} headingSortAction={handleFilterClick} />}
        </StyledRocketsSearchFilter>
    );
};

export default RocketsSearchFilter;

import Input from '../../atoms/Input';
import { StyledSearchBarLogo, StyledSearchBarResults, StyledSearchBarWrapper } from './styles';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { IRocketMapped } from '../../organisms/RocketsSearchFilter/types';

const ICONS = {
    search: <i className='fa-solid fa-magnifying-glass'></i>,
    searchRight: <i className='fa-solid fa-magnifying-glass-arrow-right'></i>,
};

interface ISearchBarProps {
    isLoading: boolean;
    isError: boolean;
    filterData: [object[], object[], Dispatch<SetStateAction<object[]>>];
    searchBarName: string;
}

const SearchBar = ({ isLoading, isError, filterData, searchBarName }: ISearchBarProps) => {
    const [data, filteredData, setFilteredData] = filterData;

    const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;

        if (target) {
            const filteredRockets = data?.filter((item) => {
                return Object.values(item).some((itemValue) => {
                    return itemValue?.toString().toLowerCase().includes(target.value.toString().toLowerCase());
                });
            });

            if (filteredRockets) setFilteredData(() => filteredRockets as IRocketMapped[]);
        }
    };
    return (
        <StyledSearchBarWrapper>
            <StyledSearchBarLogo>{searchBarName}</StyledSearchBarLogo>
            {filteredData && <StyledSearchBarResults>{filteredData.length} results</StyledSearchBarResults>}
            <Input action={handleSearchInput} icon={ICONS.search} isLoading={isLoading} isError={isError} />
        </StyledSearchBarWrapper>
    );
};

export default SearchBar;

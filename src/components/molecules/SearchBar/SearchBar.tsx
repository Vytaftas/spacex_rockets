import { ICONS } from '../../../assets/icons';
import Input from '../../atoms/Input';
import { StyledSearchBarLogo, StyledSearchBarResults, StyledSearchBarWrapper } from './styles';
import { ChangeEvent } from 'react';

interface ISearchBarProps {
    isLoading: boolean;
    isError: boolean;
    action: (e: ChangeEvent<HTMLInputElement>) => void;
    numResults: number | string | undefined;
}

const SearchBar = ({ isLoading, isError, action, numResults }: ISearchBarProps) => {
    return (
        <StyledSearchBarWrapper>
            <StyledSearchBarLogo>SpaceX rockets</StyledSearchBarLogo>
            <StyledSearchBarResults>{numResults} results</StyledSearchBarResults>
            <Input action={action} icon={ICONS.search} isLoading={isLoading} isError={isError} />
        </StyledSearchBarWrapper>
    );
};

export default SearchBar;

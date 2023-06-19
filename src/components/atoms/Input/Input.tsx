import { StyledInput, StyledInputIcon, StyledInputWrapper } from './styles';
import { ICONS } from '../../../assets/icons';
import { ChangeEvent } from 'react';

interface IInputProps {
    type?: string;
    placeholder?: string;
    icon?: JSX.Element | typeof ICONS;
    isLoading: boolean;
    isError: boolean;
    action: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ type, placeholder, icon, action, isError, isLoading }: IInputProps) => {
    return (
        <StyledInputWrapper>
            {icon && <StyledInputIcon>{icon}</StyledInputIcon>}

            <StyledInput
                disabled={isError || isLoading ? true : false}
                onChange={action}
                type={type ? type : 'text'}
                placeholder={placeholder ? placeholder : 'Search'}
            />
        </StyledInputWrapper>
    );
};

export default Input;

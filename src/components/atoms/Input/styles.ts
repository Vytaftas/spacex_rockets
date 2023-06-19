import { styled } from 'styled-components';

export const StyledInputWrapper = styled.div`
    background-color: #f5f5fa;
    border-radius: 50px;
    padding: 10px 15px;
    display: flex;
    align-items: center;
    width: 100%;
    gap: 13px;
`;
export const StyledInputIcon = styled.div`
    i {
        font-size: 14px;
        color: var(--search-icon-clr);
    }
`;
export const StyledInput = styled.input`
    width: 100%;
    background-color: transparent;
    border: none;
    outline: none;

    font-weight: 400;
    font-size: 16px;
    line-height: 100%;
    letter-spacing: 0.5px;

    color: var(--logo-text-clr);

    &::placeholder {
        color: var(--search-placeholder-text-clr);
    }
`;

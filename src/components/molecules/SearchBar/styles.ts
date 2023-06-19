import { styled } from 'styled-components';

export const StyledSearchBarWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 17px 10px 24px;
    background-color: #ffffff;
    border-radius: 8px;
    width: 100%;
    gap: 40px;
`;
export const StyledSearchBarLogo = styled.h1`
    font-family: 'Barlow';
    font-weight: 500;
    font-size: 24px;
    line-height: 100%;
    min-width: fit-content;
    color: var(--logo-text-clr);
`;
export const StyledSearchBarResults = styled.p`
    font-weight: 300;
    font-size: 14px;
    line-height: 20px;
    min-width: fit-content;
`;

import { styled } from 'styled-components';

export const StyledSearchBarWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #ffffff;
    border-radius: 8px;
    width: 100%;

    flex-wrap: wrap;
    padding: 18px;
    gap: 20px;

    @media (min-width: 768px) {
        gap: 40px;
        padding: 10px 17px 10px 24px;
        flex-wrap: initial;
    }
`;
export const StyledSearchBarLogo = styled.h1`
    font-family: 'Barlow';
    font-weight: 500;
    font-size: 24px;
    line-height: 100%;
    min-width: fit-content;
    color: var(--logo-text-clr);
    width: 100%;
    text-align: center;

    @media (min-width: 768px) {
        text-align: initial;
        width: initial;
    }
`;
export const StyledSearchBarResults = styled.p`
    font-weight: 300;
    font-size: 14px;
    line-height: 20px;
    min-width: fit-content;
    order: 1;
    text-align: center;
    width: 100%;

    @media (min-width: 768px) {
        text-align: initial;
        order: initial;
        width: initial;
    }
`;

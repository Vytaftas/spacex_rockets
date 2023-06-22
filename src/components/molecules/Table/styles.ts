import { styled } from 'styled-components';

export const StyledTableWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 10px;

    @media (min-width: 768px) {
        gap: 3px;

        .align-left {
            justify-content: start;
            text-align: left;
            max-width: 185px;
        }

        .align-right {
            justify-content: right;
            text-align: right;
        }
    }
`;

export const StyledTableHeadingsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    row-gap: 10px;
    column-gap: 40px;
    padding: 18px;

    @media (min-width: 768px) {
        justify-content: space-between;
        align-items: center;
        padding: 18px 30px;
        gap: initial;
        flex-wrap: initial;
    }
`;

export const StyledHeadingWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    width: fit-content;

    p {
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        letter-spacing: 0.1px;
        text-align: left;
        cursor: pointer;
        position: relative;

        &:hover {
            text-decoration: underline;
        }
    }

    &.active p {
        text-decoration: underline;
    }

    i {
        position: absolute;
        top: 50%;
        left: -15px;
        transform: translateY(-50%);
        opacity: 0;
    }

    &.active i {
        opacity: 1;
    }

    @media (min-width: 768px) {
        width: 100%;
    }
`;

export const StyledTableRow = styled.ul`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    padding: 18px;
    align-items: center;
    background-color: #ffffff;
    border-radius: 8px;
    gap: 10px;

    li {
        display: flex;
        align-items: center;
        width: 100%;
        justify-content: space-between;
        font-weight: 400;
        font-size: 14px;
        line-height: 100%;
        letter-spacing: 0.25px;
        width: 100%;
    }

    .mobile-heading {
        font-weight: 500;
    }

    @media (min-width: 768px) {
        flex-direction: row;
        padding: 18px 30px;
        gap: initial;

        .mobile-heading {
            display: none;
        }

        li {
            text-align: left;
        }
    }
`;

import { styled } from 'styled-components';

export const StyledTableWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const StyledTableHeadingsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 18px 30px;
`;

export const StyledHeadingWrapper = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    gap: 5px;

    p {
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        letter-spacing: 0.1px;
        /* width: 100%; */
        text-align: left;
        cursor: pointer;
    }
`;

export const StyledTableRow = styled.ul`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 18px 30px;
    background-color: #ffffff;
    border-radius: 8px;

    li {
        font-weight: 400;
        font-size: 14px;
        line-height: 100%;
        letter-spacing: 0.25px;
        width: 100%;
        text-align: left;
    }
`;

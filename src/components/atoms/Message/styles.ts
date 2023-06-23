import { styled } from 'styled-components';
import { IMesssage } from './Message';

export const StyledMessageWrapper = styled.div<IMesssage>`
    display: flex;
    align-items: center;
    justify-content: ${(props) => (props.textAlign ? props.textAlign : 'center')};
    font-size: ${(props) => (props.fontSize ? props.fontSize : '18px')};
    font-weight: ${(props) => (props.fontWeight ? props.fontWeight : '400')};
    background-color: white;
    padding: 18px 30px;
    border-radius: 8px;
`;

import { StyledMessageWrapper } from './styles';

export interface IMesssage {
    textAlign?: string;
    message?: string;
    fontSize?: string;
    fontWeight?: string;
}

const Message = ({ textAlign, message, fontSize, fontWeight }: IMesssage) => {
    return (
        <StyledMessageWrapper textAlign={textAlign} fontSize={fontSize} fontWeight={fontWeight}>
            {message ? message : 'Enter message text..'}
        </StyledMessageWrapper>
    );
};

export default Message;

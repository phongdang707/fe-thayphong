import styled from "styled-components";
import { ToastProvider } from "react-toast-notifications";

export const Wrapper = styled.div`
  margin-top: 15px;
`;
export const ToastProviderStyle = styled(ToastProvider)`
  top: 65px;
`;
export const WrapperContent = styled.div`
  /* border: 1px solid gray; */
  /* border-radius: 5px; */
  padding: 20px;
  margin-bottom: 20px;
  &:hover {
    cursor: pointer;
  }
`;
export const Title = styled.div`
  border: 1px solid gray;
`;

export const Content = styled.div`
  border: 1px solid gray;
`;

export const Link = styled.div`
  border: 1px solid gray;
`;

export const WrapperExam = styled.div`
  /* border: 1px solid gray; */
  /* border-radius: 5px; */
  border-radius: 5px;
  background-color: white;
  box-shadow: 2px 1px 5px #80808052;
  padding-bottom: 5px;
`;

export const HeaderExam = styled.div`
  font-size: 20px;
  color: white;
  background-color: #2196f3;
  text-align: center;
  padding: 10px;
  font-weight: 700;
`;

export const WrapperContentExam = styled.div`
  padding: 10px;
`;

export const WrapperBodyContent = styled.div`
  background-color: rgba(128, 128, 128, 0.08);
`;

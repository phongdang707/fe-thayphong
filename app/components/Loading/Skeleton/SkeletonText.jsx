import styled from 'styled-components';
import { SkeletonBaseText } from './SkeletonBase';

export const SkeletonText = styled.div`
  background: #f5f8fa;
  background: linear-gradient(to right, #f5f8fa, #eaf0f6 20%, #f5f8fa 40%);
  background-size: 1200px;
  -webkit-animation: gnORWi 1s linear 0s infinite forwards;
  animation: gnORWi 1s linear 0s infinite forwards;

  ${SkeletonBaseText};
`;

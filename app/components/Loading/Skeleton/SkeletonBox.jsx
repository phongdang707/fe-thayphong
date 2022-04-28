import styled from 'styled-components';
import { SkeletonBaseBox } from './SkeletonBase';

export const SkeletonBox = styled.div`
  background: #eaf0f6;
  background: linear-gradient(to right, #eaf0f6, #f5f8fa 20%, #eaf0f6 40%);
  background-size: 1200px;
  -webkit-animation: gnORWi 1s linear 0s infinite forwards;
  animation: gnORWi 1s linear 0s infinite forwards;
  ${SkeletonBaseBox};
`;

export const SkeletonBoxDetail = styled.div`
  background: #f5f8fa;
  background: linear-gradient(to right, #f5f8fa, #eaf0f6 20%, #f5f8fa 40%);
  background-size: 1200px;
  -webkit-animation: gnORWi 1s linear 0s infinite forwards;
  animation: gnORWi 1s linear 0s infinite forwards;
  ${SkeletonBaseBox};
`;

import { css } from 'styled-components';

export const SkeletonBaseBox = css`
  width: ${props => props.width};
  height: ${props => props.height};
  min-width: ${props => props.width};
`;

export const SkeletonBaseText = css`
  height: ${props => props.height};
  left: 0;
  position: absolute;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  width: ${props => props.width};
`;

export const SkeletonBaseCircle = css`
  border-radius: 50%;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  min-width: ${props => props.size}px;
`;

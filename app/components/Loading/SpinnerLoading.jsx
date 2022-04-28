import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// const SpinnerLoading = props => {
//   return (
//     <div
//       className="private-spinner private-spinner--link"
//       data-loading="true"
//       role="status"
//     >
//       <div
//         className="UILoadingSpinner__SpinnerInner"
//         style={{ width: `${props.width}`, height: `${props.height}` }}
//       >
//         <div className="private-spinner-wrapper">
//           <svg
//             className="private-spinner__ring"
//             height={40}
//             viewBox="0 0 50 50"
//             width={40}
//           >
//             <circle
//               className="private-spinner__ring-background"
//               cx={25}
//               cy={25}
//               r="22.5"
//               fill="none"
//               strokeWidth={5}
//             />
//             <circle
//               className="private-spinner__ring-path"
//               cx={25}
//               cy={25}
//               r="22.5"
//               fill="none"
//               strokeWidth={5}
//             />
//           </svg>
//         </div>
//         <div className="private-spinner__result">
//           <span
//             className="UIIconHolder__Outer-hzqcnT gvrcCm"
//             rotate={0}
//             size={24}
//           >
//             <span
//               aria-hidden="true"
//               className="private-icon private-icon__high UIIconHolder__Icon-guunxD cZAisQ"
//               style={{
//                 color: 'rgb(0, 164, 189)',
//                 lineHeight: 'inherit',
//                 verticalAlign: 'middle',
//                 fontSize: '24px',
//               }}
//             >
//               success
//             </span>
//           </span>
//         </div>
//       </div>
//       <span className="sr-only">Loading</span>
//     </div>
//   );
// };

const SpinnerLoading = props => {
  return (
    <div className="private-spinner private-spinner--link private-spinner--huge">
      <div className="private-spinner-wrapper">
        <svg
          height={32}
          width={32}
          className="private-spinner__ring"
          viewBox="0 0 50 50"
        >
          <circle
            className="private-spinner__ring-background"
            cx={25}
            cy={25}
            r="22.5"
            fill="none"
            strokeWidth={5}
          />
          <circle
            className="private-spinner__ring-path"
            cx={25}
            cy={25}
            r="22.5"
            fill="none"
            strokeWidth={5}
          />
        </svg>
      </div>
    </div>
  );
};

SpinnerLoading.defaultProps = {
  width: '100%',
  height: '40px',
};
SpinnerLoading.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

export const WrapperSpinnerLoading = styled.div`
  position: absolute;
  left: 0px;
  right: 0px;
  bottom: 0px;
  top: 50%;
`;
export default SpinnerLoading;

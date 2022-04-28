/* eslint-disable no-else-return */
/* eslint-disable react/prop-types */
import React from 'react';
import Loading from '../Loading';

function LoadingLoadable(props) {
  // return (
  //   <h2>Loading...</h2>
  // )
  // return null;
  if (props.use === 'init') {
    return null;
  }
  return <Loading isLoading isWhite />;
  // if (props.error) {
  //   return (
  //     <div>
  //       Error! <button onClick={props.retry}>Retry</button>
  //     </div>
  //   );
  // } else if (props.pastDelay) {
  //   return <Loading isLoading isWhite />;
  //   // return (
  //   //   <div className="private-overlay--light private-overlay uiOverlay-backdrop private-overlay--contextual">
  //   //     <div
  //   //       className="private-modal__container"
  //   //       style={{ maxWidth: props.maxWidth }}
  //   //     >
  //   //       <div
  //   //         className="uiLoading uiLoading-grow"
  //   //         data-loading="true"
  //   //         title="Loading…"
  //   //       >
  //   //         <div className="uiLoadingDot dot-1 loading-blue" />
  //   //         <div className="uiLoadingDot dot-2 loading-blue" />
  //   //         <div className="uiLoadingDot dot-3 loading-blue" />
  //   //       </div>
  //   //     </div>
  //   //   </div>
  //   // );
  // }
  // return null;
}

// const LoadingLoadable2 = props => {
//   // return (
//   //   <h2>Loading...</h2>
//   // )
//   if (props.error) {
//     return (
//       <div>
//         Error! <button onClick={props.retry}>Retry</button>
//       </div>
//     );
//   } else if (props.pastDelay) {
//     return (
//       <div className="" style={props.style !== null ? props.style : {}}>
//         <div
//           className="private-modal__container"
//           style={{ maxWidth: props.maxWidth }}
//         >
//           <div
//             className="uiLoading uiLoading-grow"
//             data-loading="true"
//             title="Loading…"
//           >
//             <div className="uiLoadingDot dot-1 loading-blue" />
//             <div className="uiLoadingDot dot-2 loading-blue" />
//             <div className="uiLoadingDot dot-3 loading-blue" />
//           </div>
//         </div>
//       </div>
//     );
//   }
//   return null;
// };

export default LoadingLoadable;
// export { LoadingLoadable2 };

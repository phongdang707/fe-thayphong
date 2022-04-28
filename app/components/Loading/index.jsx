/* eslint-disable react/prop-types */
/* eslint-disable react/default-props-match-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// import styled from 'styled-components';
// import SpinnerLoading from './SpinnerLoading';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(() => ({
  colorPrimary: {
    color: 'red',
  },
}));
// const Image = styled.img`
//   height: 40px;
// `;
const Loading = props => {
  const className = classNames(
    'private-overlay--light private-overlay uiOverlay-backdrop private-overlay--contextual',
    {
      'private-overlay--white': props.isWhite,
    },
  );

  if (props.isLoading) {
    return (
      <div className={className}>
        <div
          className="private-modal__container"
          style={{ maxWidth: props.maxWidth }}
        >
          <div
            className="uiLoading uiLoading-grow"
            data-loading="true"
            title="Loading…"
          >
            {/* <div className="uiLoadingDot dot-1 loading-blue" />
            <div className="uiLoadingDot dot-2 loading-blue" />
            <div className="uiLoadingDot dot-3 loading-blue" /> */}
            {/* <Image src="//e.antsomi.com/cdp/default/Antsomi-Loading-tini.png" /> */}
            {/* <SpinnerLoading /> */}
            <CircularProgress size={props.size} />
          </div>
        </div>
      </div>
    );
  }
  return null;
};

Loading.defaultProps = {
  isLoading: false,
  isWhite: false,
  size: 30,
};
Loading.propTypes = {
  isWhite: PropTypes.bool,
  isLoading: PropTypes.bool,
  maxWidth: PropTypes.string,
};
export default Loading;

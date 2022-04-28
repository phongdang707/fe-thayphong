/**
 *
 * Button.js
 *
 * A common button, if you pass it a prop "route" it'll render a link to a react-router route
 * otherwise it'll render a link with an onclick
 */

import React, { Children } from "react";
import Button from "@material-ui/core/Button";

function UIButton(props, { className }) {
  const {
    content,
    type,
    style,
    startIcon,
    endIcon,
    color,
    disabled,
    variant,
    onClick,
  } = props;

  return (
    // <Wrapper >
    <Button
      disabled={disabled}
      variant={variant}
      color={color}
      startIcon={startIcon}
      endIcon={endIcon}
      onClick={onClick}
      style={style}
      type={type}
      className={className}
    >
      {content}
    </Button>
    // </Wrapper>
  );
}
UIButton.defaultProps = {
  variant: "contained",
  disabled: false,
  color: "primary",
  startIcon: null,
  endIcon: null,
};
UIButton.propTypes = {};

export default UIButton;

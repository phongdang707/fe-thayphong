import React, { useEffect, useState, forwardRef } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { useSpring, animated } from "react-spring/web.cjs"; // web.cjs is required for IE 11 support
// import Button from "components/Common/Button";
import { WrapperFooter, WrapperBody, WrapperHeader, Button } from "./styled";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    "&:focus": {
      outline: "none",
    },
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    maxHeight: "90%",
    overflow: "auto",
  },
  cancel: {
    marginRight: "6px",
  },
}));

const Fade = forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};

function SpringModal(props, { className }) {
  const classes = useStyles();
  // const [open, setOpen] = useState(props.modalOpenState);

  const {
    // buttonName,
    header,
    body,
    // buttonNegative,
    // buttonPositive,
    customStyles,
    // onPositiveClick,
    // modalOpen,
    // modalClose,
    buttonPositiveDisable,
    hidePositiveButton,
    contentCancel,
    contentSubmit,
    openModal,
    callback,
  } = props;

  // useEffect(() => {
  //   setOpen(props.modalOpenState);
  // }, [props.modalOpenState]);

  return (
    <>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={openModal}
        style={customStyles}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <div className={classes.paper}>
          <WrapperHeader>
            <h2 id="spring-modal-title">{header}</h2>
          </WrapperHeader>
          <WrapperBody>{body}</WrapperBody>
          <WrapperFooter>
            <Button
              content={contentCancel}
              variant="outlined"
              onClick={() => callback("CANCEL")}
              style={{ marginRight: "6px" }}
            />
            {!hidePositiveButton?(
              <Button
                content={contentSubmit}
                onClick={() => callback("SUBMIT")}
                disabled={props.buttonPositiveDisable}
              />
            ):null}
          </WrapperFooter>
        </div>
      </Modal>
    </>
  );
}

SpringModal.defaultProps = {
  buttonName: "spring",
  header: "ahihi",
  body: null,
  buttonPositive: null,
  buttonNegative: null,
  customStyles: null,
  onPositiveClick: () => {},
  buttonPositiveDisable: false,
  hidePositiveButton:false,
};
SpringModal.propTypes = {};
export default SpringModal;

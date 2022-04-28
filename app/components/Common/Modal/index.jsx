import React, { useEffect, useState, forwardRef } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { useSpring, animated } from "react-spring/web.cjs"; // web.cjs is required for IE 11 support
import Button from "components/Common/Button";
import { WrapperFooter, WrapperBody, WrapperHeader } from "./styled";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    maxHeight: "90%",
    overflow: "auto"
  },
  paddingLeft: {
    paddingRight: "20px",
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

function SpringModal(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(props.modalOpenState);

  const {
    buttonName,
    header,
    body,
    buttonNegative,
    buttonPositive,
    customStyles,
    onPositiveClick,
    modalOpen,
    modalClose,
    buttonPositiveDisable,
  } = props;

  useEffect(() => {
    setOpen(props.modalOpenState);
  }, [props.modalOpenState]);

  // const handleOpen = () => {
  //   modalOpen(true);
  // };
  //
  // const handleClose = () => {
  //   setOpen(false);
  // };

  return (
    <div>
      <Button content={buttonName} onClick={modalOpen} />
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={open}
        style={customStyles}
        onClose={modalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        {/* <Fade in={open}> */}
        <div className={classes.paper}>
          <WrapperHeader>
            <h2 id="spring-modal-title">{header}</h2>
          </WrapperHeader>
          <WrapperBody>{body}</WrapperBody>
          <WrapperFooter>
            {buttonNegative ? (
              <Button
                classes={classes.paddingLeft}
                content={buttonNegative}
                variant="outlined"
                onClick={modalClose}
                style={{ marginRight: "20px" }}
              />
            ) : null}
            {buttonPositive ? (
              <Button
                content={buttonPositive}
                onClick={onPositiveClick}
                disabled={props.buttonPositiveDisable}
              />
            ) : null}
          </WrapperFooter>
        </div>
        {/* </Fade> */}
      </Modal>
    </div>
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
};
SpringModal.propTypes = {};
export default SpringModal;

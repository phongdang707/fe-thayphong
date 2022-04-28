

import React, { useState,useEffect } from "react";
import PropTypes from "prop-types";
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';

function ConfirmDialog(props) {
  const {
    isOpenDialog,
    onCloseDialog,
    onPositiveChoice,
    title,
    content
  } = props;
  const [open, setOpen] = useState(isOpenDialog);

  useEffect(() => {
    setOpen(isOpenDialog);
  },[isOpenDialog])

  const handleCancel = () => {
    onCloseDialog()
   };

   const handleOk = () => {
     onPositiveChoice()
     onCloseDialog()
   };

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xs"
      aria-labelledby="confirmation-dialog-title"
      open={open}
    >
      <DialogTitle id="confirmation-dialog-title">{title}</DialogTitle>
      <DialogContent>
        {content}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel} color="primary">
          Hủy
        </Button>
        <Button onClick={handleOk} color="primary">
          Xác nhận
        </Button>
      </DialogActions>
    </Dialog>
  );
}
ConfirmDialog.defaultProps = {
  isOpenDialog:false,
  onCloseDialog:()=>{},
  onPositiveChoice:()=>{},
  content: "",
  title:""
};
ConfirmDialog.propTypes = {};

export default ConfirmDialog;

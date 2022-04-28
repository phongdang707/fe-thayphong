import React, { useEffect,useState, memo } from "react";
import { useInjectReducer } from "utils/injectReducer";
import { useInjectSaga } from "utils/injectSaga";
import { compose } from "redux";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { useToasts } from "react-toast-notifications";
import { Helmet } from "react-helmet";
import Loading from "components/Loading";
import Modal from "components/Common/ModalCallback";
import Input from "components/Common/Input";
import Selector from "components/Common/UISelector";
import ConfirmDialog from "components/Common/ConfirmDialog";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { Breadcrumbs, Divider, Link, Typography, Grid ,IconButton, Tooltip} from "@material-ui/core";
import { PostAdd ,NavigateBefore,NavigateNext,} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { Editor } from "@tinymce/tinymce-react";
import parse from "html-react-parser";
import reducer from "./reducer";
import saga from "./saga";
import {
  getContentCourse,
  onChange,
  addContentRequest,
  modalOpen,
  modalClose,
  onDeleteContent,
  reset,
  onCloseDialog,
  onOpenDialog,
} from "./action";
import { makeSelectData } from "./selectors";
import { URL_API } from "../../../../config/common";

const useStyles = makeStyles({
  popup: {
    width: (window.innerWidth * 80) / 100,
  },
  heading: {
    fontWeight: "600",
  },
  hr: {
    margin: "24px 0",
  },
  breadCrumbs: {
    fontSize: "13px",
  },
  content: {
    margin: "1em 0",
    width: "100%",
  },
  header: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginRight: "1em",
  },
  headDiv: {
    display: "flex",
    justifyContent: "space-between",
    // padding: "1em ",
  },
  boderLeft: {
    borderLeft: "5px solid #376fd0",
    margin: "20px 0",
    paddingLeft: "5px",
    fontWeight: "600",
  },
  contentChapter:{
    display:'flex',
    flexDirection:'column',
    alignItems:'center'
  },
  divButtonItemPage: {
    display: "flex",
    alignItems:'center',
    marginTop:'2em'
  },
  divButtonPage: {
    display: "flex",
    justifyContent: "center",
    alignItems:'center',
    width:'100%'
  },
  selectDrop: {
    whiteSpace: "nowrap",
    position:'absolute'
  },
});

function AddContent(props) {
  const classes = useStyles();
  const { addToast } = useToasts();
  const [openModal, setOpenModal] = useState(false);
  const [flag, setFlag] = useState(false);

  useInjectReducer({ key: "addContent", reducer });
  useInjectSaga({ key: "addContent", saga });

  useEffect(() => {
    if (props.dataContent.isSucess === true) {
      addToast(props.dataContent.messageToast.mess, {
        appearance: props.dataContent.messageToast.type,
        autoDismiss: true,
      });
      setFlag(!flag)
    }
    return () => {
      props.onReset();
    };
  }, [props.dataContent.isSucess]);

  useEffect(() => {
    props.onGetContentCourse();
  }, [
    props.dataContent.page,
    props.dataContent.rowsPerPage,
    flag
  ]);

  const callback = (type, data) => {
    switch (type) {
      case "CANCEL":
        props.modalClose()
        setOpenModal(!openModal);
        break;
      case "SUBMIT":
        setOpenModal(!openModal);
        props.onSubmit();
        break;
      default:
        break;
    }
  };


  return (
    <div>
      <Loading isLoading={props.dataContent.loading} />
      <Helmet defaultTitle={props.dataContent.helmet}>
        <meta name="description" content="REACT" />
      </Helmet>
      <Typography variant="h6" className={classes.heading}>
        {props.dataContent.helmet}
      </Typography>
      <Breadcrumbs aria-label="breadcrumb" className={classes.breadCrumbs}>
        <Link
          color="inherit"
          //to='/admin/dashboard/'
        >
          Admin
        </Link>
        <Link
          color="inherit"
          //to="/admin/courses/"
        >
          Khóa học
        </Link>
        <Link color="textPrimary" aria-current="page">
          {props.dataContent.helmet}
        </Link>
      </Breadcrumbs>
      <Divider className={classes.hr}></Divider>
      <div className={classes.headDiv}>
        <Typography variant="h6" gutterBottom className={classes.boderLeft}>
          Nội dung khóa học
        </Typography>
        <Tooltip title="Thêm nội dung">
          <IconButton
            onClick={() =>
              setOpenModal(!openModal)
            }
          >
            <PostAdd fontSize="large"/>
          </IconButton>
        </Tooltip>
      </div>
      {props.dataContent.content_list.map((itemChapter, index) => (
        <div key={index} className={classes.contentChapter}>
          <Typography variant="h6" gutterBottom >
            Chương {itemChapter[0].chapter}
          </Typography>
          {itemChapter.map((item, index) => (
            <Card className={classes.content} key={index}>
              <CardActionArea>
                <CardContent>
                  <div className={classes.header}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      color="primary"
                      className={classes.text}
                    >
                      {item.title}
                    </Typography>
                    {(() => {
                      const date = new Date(item.create_at);
                      return (
                        <Typography variant="subtitle2" gutterBottom>
                          {date.getHours()}:{date.getMinutes()} ngày{" "}
                          {date.getDate()}/{date.getMonth() + 1}/
                          {date.getFullYear()}
                        </Typography>
                      );
                    })()}
                  </div>
                  {item.content ? parse(item.content) : null}
                  <Typography variant="body2" color="textSecondary" component="p">
                    {item.link_file}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <Divider />
              <CardActions>
                <Button
                  onClick={() => props.onOpenDialog(item._id)}
                  size="small"
                  color="default"
                >
                  Xóa
                </Button>
                <Button
                  onClick={() => {setOpenModal(!openModal); props.modalOpen(item)}}
                  size="small"
                  color="primary"
                >
                  Chỉnh sửa
                </Button>
              </CardActions>
            </Card>
          ))}
        </div>
      ))}
      <div className={classes.divButtonItemPage}>
        <Selector
          className={classes.selectDrop}
          onChange={(event) => {
            props.onChange({ changeItem: event });
          }}
          valueItem={[
            {value:5,lable:"5"},
            {value:10,lable:"10"},
            {value:20,lable:"20"}
          ]}
          label="Hiển thị"
          value={props.dataContent.rowsPerPage}
        />
        <div className={classes.divButtonPage}>
          {props.dataContent.page != 0 ? (
            <IconButton onClick={() => props.onChange({ back: true })}>
              <Tooltip title="Trang trước">
                <NavigateBefore />
              </Tooltip>
            </IconButton>
          ) : (
            <IconButton disabled>
                <NavigateBefore />
            </IconButton>
          )}
          <Typography>
            Trang {props.dataContent.page +1}
          </Typography>
          {props.dataContent.page * props.dataContent.rowsPerPage + props.dataContent.rowsPerPage  <
          props.dataContent.totalItems ? (
            <IconButton onClick={() => props.onChange({ next: true })}>
              <Tooltip title="Trang sau">
                <NavigateNext />
              </Tooltip>
            </IconButton>
          ) : (
            <IconButton disabled>
                <NavigateNext />
            </IconButton>
          )}
        </div>
      </div>
      <Modal
        header="Nội dung"
        contentCancel="Thoát"
        contentSubmit="Xác nhận"
        openModal={openModal}
        buttonPositiveDisable={
          props.dataContent.title.value == "" || props.dataContent.content == "" || !props.dataContent.chapter.value || props.dataContent.chapter.error
        }
        body={
          <div className={classes.popup}>
            <Loading isLoading={props.dataContent.loadingModal} />
            <Grid container spacing={2} >
              <Grid xs={12} md={8} item>
                <Input
                  label="Tiêu đề"
                  value={props.dataContent.title.value}
                  fullWidth
                  onChange={(event) => {
                    const { value } = event.target;
                    props.onChange({ title: value });
                  }}
                  helperText={props.dataContent.title.listErros}
                  error={props.dataContent.title.error}
                />
              </Grid>
              <Grid xs={12} md={4} item>
                <Input
                  type="number"
                  label="Chương số"
                  value={props.dataContent.chapter.value}
                  fullWidth
                  onChange={(event) => {
                    const { value } = event.target;
                    props.onChange({ chapter: value });
                  }}
                  helperText={props.dataContent.chapter.listErros}
                  error={props.dataContent.chapter.error}
                  inputProps={{ min: 1}}
                />
              </Grid>
              <Grid xs={12} item>
                <Input
                  label="Link file đính kèm"
                  value={props.dataContent.link_file}
                  fullWidth
                  onChange={(event) => {
                    const { value } = event.target;
                    props.onChange({ link_file: value });
                  }}
                />
              </Grid>
            </Grid>
            <Typography>Nội dung chính</Typography>
            <Editor
              selector="textarea"
              apiKey="mj0yktmn49wns1bzkfibtier34b0oa0u8ajnd43vdnffb41g"
              init={{
                height: 250,
                selector: "textarea#myTextArea",
                plugins: [
                  "lists link image paste help wordcount tinydrive media",
                ],
                toolbar:
                  "insertfile image undo redo | formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent link",
                dialog_type: "modal",
                tinydrive_token_provider: `${URL_API}/users/tinymce`,
              }}
              value={props.dataContent.content}
              onEditorChange={(event) => {
                props.onChange({ content: event });
              }}
            />
          </div>
        }
        callback={callback}
      ></Modal>
      <ConfirmDialog
        isOpenDialog={props.dataContent.openDialogConfirm}
        onCloseDialog={props.onCloseDialog}
        onPositiveChoice={props.onDeleteContent}
        title="Xóa nội dung"
        content={`Xác nhận xóa nội dung?`}
      />
    </div>
  );
}
const mapStateToProps = createStructuredSelector({
  dataContent: makeSelectData(),
});
export function mapDispatchToProps(dispatch) {
  return {
    onGetContentCourse: (params) => dispatch(getContentCourse(params)),
    onChange: (params) => dispatch(onChange(params)),
    onSubmit: (params) => dispatch(addContentRequest(params)),
    modalOpen: (params) => dispatch(modalOpen(params)),
    modalClose: (params) => dispatch(modalClose(params)),
    onDeleteContent: (params) => dispatch(onDeleteContent(params)),
    onReset: (params) => dispatch(reset(params)),
    onCloseDialog: (params) => dispatch(onCloseDialog(params)),
    onOpenDialog: (params) => dispatch(onOpenDialog(params)),
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, memo)(AddContent);

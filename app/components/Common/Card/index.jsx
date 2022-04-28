import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    // maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function MediaCard(props) {
  const classes = useStyles();
  const { content, banner, des, callback, id } = props;
  // console.log("banner", banner);
  return (
    <Card className={classes.root} onClick={() => callback("CLICK_DETAIL", id)}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={
            banner ? banner : "https://costaseafood.com.vn/uploads/no-image.jpg"
          }
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {content}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {des}
          </Typography>
        </CardContent>
      </CardActionArea>
      {/* <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions> */}
    </Card>
  );
}

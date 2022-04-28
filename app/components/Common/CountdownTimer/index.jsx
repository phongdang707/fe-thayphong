import React ,{useEffect, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import moment from 'moment';

const useStyles = makeStyles({
  countdownWrapper:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  countdownItem:{
    fontSize: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "column",
    lineHeight: '30px',
    margin: '10px',
    paddingTop: '10px',
    position: 'relative',
    height: '100px',
    width:'50px',
    borderRadius: '10px',
    backgroundColor:'#e3e3e3'
}
});

function CountdownTimer(props) {
  const classes = useStyles();

  const { time_start, time , onFinish} = props;
  const [remainHour, setRemainHour] = useState(undefined);
  const [remainMinute, setRemainMinute] = useState(undefined);
  const [remainSecond, setRemainSecond] = useState(undefined);
  let duration = null;
  useEffect(() => {
    if(time_start){
      const time1 = moment(time_start).add(time, 'minutes');
      const time2 =moment(Date.now());
      duration = moment.duration(moment.duration(time1.diff(time2)).asMilliseconds(), 'ms');
      const intervalId = setInterval(() => {
        duration.subtract(1, "s");
        setRemainHour(duration._data.hours);
        setRemainMinute(duration._data.minutes);
        setRemainSecond(duration._data.seconds);
        const inMilliseconds = duration.asMilliseconds();
        if (inMilliseconds > 0) return;
        clearInterval(intervalId);
        // sau khi het time
        onFinish();
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [time_start]);


  return (
    <div className={classes.countdownWrapper}>
      <div className={classes.countdownItem}>
        {remainHour}
        <span>giờ</span>
      </div>
      :
      <div className={classes.countdownItem}>
        {remainMinute}
        <span>phút</span>
      </div>
      :
      <div className={classes.countdownItem}>
        {remainSecond}
        <span>giây</span>
      </div>
    </div>
  );
}

CountdownTimer.defaultProps = {
  time_start: null,
  time: 0,
  onFinish:()=>{}
};

export default CountdownTimer;

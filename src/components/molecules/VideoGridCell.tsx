import VideoEntry from '../../VideoEntry'
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CardProps,
  makeStyles,
  Typography,
} from '@material-ui/core'
import Video from '../atoms/Video'

interface Props extends CardProps {
  videoEntry: VideoEntry
}

const useStyles = makeStyles({
  videoEntry: {
    width: 'inherit',
  },
})

const VideoGridCell = (props: Props) => {
  const { videoEntry } = props
  const { stream, title, description } = videoEntry
  const classes = useStyles()

  return (
    <Card>
      <CardActionArea>
        <CardMedia
          className={classes.videoEntry}
          component={Video}
          srcObject={stream}
          autoPlay
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default VideoGridCell

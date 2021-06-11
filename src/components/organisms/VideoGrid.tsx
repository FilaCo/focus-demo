import VideoEntry from '../../VideoEntry'
import { map } from 'ramda'
import VideoGridCell from '../molecules/VideoGridCell'
import { Grid, GridProps, makeStyles } from '@material-ui/core'

interface Props extends GridProps {
  videos: VideoEntry[]
}

const useStyles = makeStyles({
  videoCell: {
    width: 'inherit',
  },
})

const VideoGrid = (props: Props) => {
  const { videos, ...rest } = props
  const classes = useStyles()

  return (
    <Grid container {...rest}>
      {map((videoEntry) => {
        return (
          <Grid
            key={videoEntry.title}
            item
            md={4}
            className={classes.videoCell}
          >
            <VideoGridCell videoEntry={videoEntry} />
          </Grid>
        )
      }, videos)}
    </Grid>
  )
}

export default VideoGrid

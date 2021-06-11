import {
  AppBar,
  AppBarProps,
  Grid,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core'
import CustomSelect from '../components/molecules/CustomSelect'
import InputSlider from '../components/molecules/InputSlider'
import { useDispatch, useSelector } from 'react-redux'
import { setBandWidth } from '../reducers/root'
import { RootState } from '../reducers/store'

interface Props extends AppBarProps {
  appTitle: string
}

const useStyles = makeStyles({
  root: {
    padding: 15,
  },
  roiExportersSelector: {
    color: 'inherit',
  },
  rateControllersSelector: {
    color: 'inherit',
  },
  bandwidthSlider: {
    color: 'inherit',
    width: '100%',
  },
})

const Footer = (props: Props) => {
  const { appTitle, className, ...rest } = props

  const classes = useStyles()

  const bandWidth = useSelector((state: RootState) => state.root.bandWidth)

  const dispatch = useDispatch()

  const roiExportersItems = [
    {
      name: 'segment',
      isCategoryHeader: true,
    },
    {
      name: 'deeplab',
    },
    {
      name: 'bbox',
      isCategoryHeader: true,
    },
    {
      name: 'yolo',
    },
    {
      name: 'depth',
      isCategoryHeader: true,
    },
    {
      name: 'kmeans',
    },
    {
      name: 'vid2depth',
    },
  ]

  const rateControllersItems = [
    { name: 'one' },
    { name: 'two' },
    { name: 'three' },
  ]

  return (
    <AppBar
      className={`${classes.root} ${className}`}
      position="static"
      {...rest}
    >
      <Toolbar>
        <Grid container spacing={4} justify="space-between" alignItems="center">
          <Grid item md>
            <Typography variant="h6">{appTitle}</Typography>
          </Grid>
          <Grid item md>
            <CustomSelect
              className={classes.roiExportersSelector}
              label="ROIs exporter"
              description="Choose ROIs exporter"
              items={roiExportersItems}
              defaultValue={roiExportersItems[1].name}
              autoWidth
            />
          </Grid>
          <Grid item md>
            <CustomSelect
              className={classes.rateControllersSelector}
              label="Rate controller"
              description="Choose rate controller"
              items={rateControllersItems}
              defaultValue={rateControllersItems[0].name}
              autoWidth
            />
          </Grid>
          <Grid item md>
            <InputSlider
              initialValue={bandWidth}
              label="Bandwidth"
              className={classes.bandwidthSlider}
              onSliderChanged={(event, newValue) => {
                dispatch(setBandWidth(newValue))
              }}
              onInputChanged={(event) => {
                dispatch(setBandWidth(Number(event.target.value)))
              }}
            />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default Footer

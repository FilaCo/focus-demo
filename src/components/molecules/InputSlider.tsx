import { Grid, Input, makeStyles, Slider, Typography } from '@material-ui/core'
import { ChangeEvent, useState } from 'react'

interface Props {
  className?: string
  initialValue?: number
  label?: string
  onSliderChanged?: (event: any, newValue: number | number[]) => void
  onInputChanged?: (event: ChangeEvent<HTMLInputElement>) => void
}

const useStyles = makeStyles({
  root: {
    width: 250,
    color: 'inherit',
  },
  input: {
    width: 42,
    color: 'inherit',
  },
})

const InputSlider = (props: Props) => {
  const { className, initialValue, label, onSliderChanged, onInputChanged } =
    props

  const [value, setValue] = useState<number | string | Array<number | string>>(
    initialValue ?? 0,
  )
  const classes = useStyles()

  const handleSliderChange = (event: any, newValue: number | number[]) => {
    if (onSliderChanged) onSliderChanged(event, newValue)
    setValue(newValue)
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onInputChanged) onInputChanged(event)
    setValue(Number(event.target.value))
  }

  const sliderLabelId = 'input-slider-label'
  return (
    <div className={`${classes.root} ${className}`}>
      <Typography id={sliderLabelId} gutterBottom>
        {label}
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            value={typeof value === 'number' ? value : 0}
            aria-labelledby={sliderLabelId}
            color="secondary"
            onChange={handleSliderChange}
          />
        </Grid>
        <Grid item>
          <Input
            className={classes.input}
            value={value}
            margin="dense"
            onChange={handleInputChange}
            inputProps={{
              step: 1,
              min: 0,
              max: 100,
              type: 'number',
              'aria-labelledby': sliderLabelId,
            }}
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default InputSlider

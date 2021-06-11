import {
  FormControl,
  FormHelperText,
  InputLabel,
  ListItemText,
  makeStyles,
  MenuItem,
  Select,
  SelectProps,
} from '@material-ui/core'
import { map } from 'ramda'

interface Item {
  name: string
  isCategoryHeader?: boolean
}

interface Props extends SelectProps {
  items: Item[]
  label?: string
  description?: string
}

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  categoryHeader: {
    color: 'inherit',
  },
  selector: {
    color: 'inherit',
  },
  selectLabel: {
    color: 'inherit',
  },
  selectDescription: {
    color: 'inherit',
  },
})

const CustomSelect = (props: Props) => {
  const { items, label, description, className, ...rest } = props
  const classes = useStyles()
  const labelId = label ? 'custom-select-label' : undefined
  return (
    <FormControl className={classes.root}>
      {label && (
        <InputLabel id={labelId} className={classes.selectLabel}>
          {label}
        </InputLabel>
      )}
      <Select labelId={labelId} className={classes.selector} {...rest}>
        {map((item) => {
          const { name, isCategoryHeader } = item

          const className = isCategoryHeader
            ? classes.categoryHeader
            : undefined

          return (
            <MenuItem key={name} value={name} disabled={isCategoryHeader}>
              <ListItemText primary={name} className={className} />
            </MenuItem>
          )
        }, items)}
      </Select>
      {description && (
        <FormHelperText className={classes.selectDescription}>
          {description}
        </FormHelperText>
      )}
    </FormControl>
  )
}

export default CustomSelect

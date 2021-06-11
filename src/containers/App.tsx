import Home from '../components/pages/Home'
import { makeStyles } from '@material-ui/core'

interface Props {
  appTitle: string
}

const useStyles = makeStyles({
  root: {
    height: '100vh',
  },
})

const App = (props: Props) => {
  const { appTitle } = props

  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Home appTitle={appTitle} />
    </div>
  )
}

export default App

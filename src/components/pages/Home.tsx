import Main from '../../containers/Main'
import Footer from '../../containers/Footer'
import { makeStyles } from '@material-ui/core'

interface Props {
  appTitle: string
}

const useStyles = makeStyles({
  footer: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
  },
  main: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
  },
  home: {
    height: 'inherit',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
})

const Home = (props: Props) => {
  const { appTitle } = props

  const classes = useStyles()

  return (
    <div className={classes.home}>
      <Main className={classes.main} />
      <Footer className={classes.footer} appTitle={appTitle} />
    </div>
  )
}

export default Home

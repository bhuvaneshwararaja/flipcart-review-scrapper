import {AppBar, Typography,Box,withStyles,makeStyles} from "@material-ui/core"
const useStyles = makeStyles((theme) => ({
    nav:{
        padding:"1rem",
        background:"#2874f0"
    }
}))
export const Navbar = () => {
    const classes = useStyles()
    return <>
        <AppBar color="primary" position="fixed" className={classes.nav}>
            <Box>
                <Typography varient="h1" component="h2">Flipkart</Typography>
            </Box>
        </AppBar>
    </>
}
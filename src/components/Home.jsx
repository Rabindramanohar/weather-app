import React, { useState } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Box from '@material-ui/core/Box';
import SelectedCity from "./SelectedCity";
import AllCities from "./AllCities";
import CloudTwoToneIcon from '@material-ui/icons/CloudTwoTone';

const useStyles = makeStyles((theme) => ({
    grow: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        display: "none",
        padding: theme.spacing(2, 6),
        height: "100%",
        [theme.breakpoints.up("sm")]: {
            display: "block"
        }
    },
    icon: {
        padding: theme.spacing(0, 2, 1, 6),
        height: "100%",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    search: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        "&:hover": {
            backgroundColor: fade(theme.palette.common.white, 0.25)
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(3),
            width: "auto"
        }
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    inputRoot: {
        padding: theme.spacing(1, 16),
        height: "100%",
        color: "inherit"
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "20ch"
        }
    }
}));

export default function Home() {

    const [toggleComponent, setToggleComponent] = useState(false);
    const [query, setQuery] = useState("");
    const [city, setCity] = useState("");

    function handleChange(event) {
        if (event.key === 'Enter') {
            setToggleComponent({toggleComponent : true});
            setQuery(city)
            console.log(toggleComponent);
        }
    }

    // console.log(query);

    const classes = useStyles();

    return (
        <div style = {{backgroundColor: 'rgb(151, 214, 233)'}}>
        <div className={classes.grow}>
            <AppBar position="sticky">
                <Toolbar>
                    <Typography className={classes.icon} variant="h6" noWrap>
                        <CloudTwoToneIcon fontSize="large" />
                    </Typography>
                    <Typography className={classes.title} variant="h6" noWrap>
                        Weather Application
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Enter your City..."
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput
                            }}
                            inputProps={{ "aria-label": "search" }}
                            onChange = {event => setCity(event.target.value)}
                            value = {city}
                            onKeyDown = {handleChange}
                        />
                    </div>
                </Toolbar>
            </AppBar>
        </div>

        <Box>
            <Typography>
                {toggleComponent ? <SelectedCity cityName = {query}/> : <AllCities />}
            </Typography>
        </Box>
        </div>
    );
}

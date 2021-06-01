import { Navbar } from "../../Components/Navbar";
import { useState, useEffect } from "react";
import {
  InputBase,
  withStyles,
  makeStyles,
  fade,
  Box,
  TextField,
  Button,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AccordionActions,
  CircularProgress,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import SearchIcon from "@material-ui/icons/Search";
import StarIcon from "@material-ui/icons/Star";
import Typewriter from "typewriter-effect";
import classNames from "classnames";
const useStyles = makeStyles((theme) => ({
  container: {
    top: "4.5rem",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    left: "15%",
  },
  form: {
    width: "100%",
    height: "10vh",
    marginTop: "1rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  common: {
    background: "#fff",
    boxShadow:
      "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
  },
  tileflex: {
    display: "flex",
    width: "100%",
    minHeight: "10vh",
    padding: "1rem",
    alignItems: "center",
    justifyContent: "space-around",
  },
}));
const GlobalCss = withStyles({
  "@global": {
    ".MuiOutlinedInput-input": {
      width: "35rem",
    },
    ".MuiButton-root": {
      position: "relative",
      left: "-4rem",
      padding: "15px 16px",
      borderRadius: "0px",
      borderTopRightRadius: "4px",
      borderBottomRightRadius: "4px",
    },
    ".MuiButton-containedPrimary": {
      background: "#2874f0",
      "&:hover": {
        background: "#1485D5",
      },
    },
    ".MuiFormLabel-root.Mui-focused": {
      color: "#2874f0",
    },
    ".MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#2874f0",
    },
    ".MuiOutlinedInput-notchedOutline": {
      borderColor: "#2874f0",
      borderWidth: "2px",
      "&:hover": {
        borderColor: "#2874f0",
      },
    },
    ".MuiTypography-h4": {
      color: "dimgray",
    },
  },
})(() => null);

export const ReviewPage = () => {
  const [query, setQuery] = useState();
  console.log(query);
  const OnInput = (e) => {
    setQuery(e.target.value);
  };
  const [searchdata, setSearchData] = useState();
  const [productids, setproductids] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const HandleSearch = (e) => {
    setLoading(true);
    setError();
    e.preventDefault();
    fetch(`search/${query}`, {
      headers: {
        method: "get",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        setLoading(false);
        console.log(res);
        if (res.mess) setError(res.mess);
        else if (res) {
          setSearchData(Object.values(res));
          setproductids(Object.keys(res));
        }
      });
  };

  console.log(error);

  const classes = useStyles();

  return (
    <>
      <GlobalCss />
      <Navbar />
      <Box width="70%" minHeight="100vh" className={classes.container}>
        <form className={classNames(classes.common, classes.form)}>
          <TextField
            placeholder="Iphone 11 pro"
            id="outlined-basic"
            label="Search Product"
            variant="outlined"
            onChange={OnInput}
          ></TextField>
          <div>
            <Button color="primary" variant="contained" onClick={HandleSearch}>
              <SearchIcon />
            </Button>
          </div>
        </form>

        {searchdata && productids && !loading && !error ? (
          <>
            <Box
              className={classes.common}
              width="100%"
              minHeight="70vh"
              marginTop="1rem"
            >
              {searchdata.map((item, index) => {
                console.log(item);
                if (index < item.length) {
                  console.log(Object.keys(item[3].prductHighlights[0]));
                  return (
                    <>
                      <div className={classes.tileflex}>
                        <img
                          src={item[2].productImage}
                          style={{ width: "100px" }}
                        ></img>
                        <div style={{ width: "50%" }}>
                          <Typography component="h2" variant="h5">
                            {item[0].productName}
                          </Typography>
                          <Typography variant="body2">
                            <span
                              style={{
                                display: "inline-flex",
                                background: "#388e3c",
                                color: "#fff",
                                padding: "0.1rem .4rem 0rem 0.6rem",
                                borderRadius: "10px",
                              }}
                            >
                              {item[5].productRatings[0].overallRating}{" "}
                              <StarIcon style={{ height: "1.2rem" }} />
                            </span>{" "}
                            {item[5].productRatings[0].ratingCount}{" "}
                            {item[5].productRatings[0].reviewCount}
                          </Typography>
                          <ul style={{ paddingInlineStart: "18px" }}>
                            {Object.values(item[3].prductHighlights[0]).map(
                              (high, index) => {
                                return (
                                  <Typography component="li" key={index}>
                                    {high}
                                  </Typography>
                                );
                              }
                            )}
                          </ul>
                        </div>
                        <div>
                          <Button color="primary">Check Reviews</Button>
                        </div>
                      </div>
                      <hr style={{ opacity: ".2" }}></hr>
                    </>
                  );
                }
              })}
            </Box>
          </>
        ) : (
          <>
            {loading ? (
              <>
                <Box
                  width="100%"
                  minHeight="70vh"
                  marginTop="2rem"
                  display="flex"
                  flexDirection="column"
                  className={classNames(classes.common)}
                >
                  {[1, 2, 3].map((items) => {
                    return (
                      <>
                        <div
                          style={{
                            display: "flex",
                            width: "100%",
                            minHeight: "10vh",
                            justifyContent: "space-around",
                            marginTop: "2rem",
                          }}
                        >
                          <Skeleton
                            variant="rect"
                            width="150px"
                            height="150px"
                          />
                          <div>
                            <Skeleton variant="text" width="200px" />
                            <Skeleton variant="text" width="50px" />
                            <Skeleton variant="text" width="100px" />
                            <Skeleton variant="text" width="100px" />
                            <Skeleton variant="text" width="100px" />
                          </div>
                          <div>
                            <Skeleton variant="button" width="100px" />
                          </div>
                        </div>
                      </>
                    );
                  })}
                </Box>
              </>
            ) : (
              <>
                <Box
                  width="100%"
                  minHeight="70vh"
                  marginTop="2rem"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  className={classNames(classes.common)}
                >
                  {error ? (
                    <Typography variant="h4" component="h5">
                      {error}
                    </Typography>
                  ) : (
                    <Typography variant="h4" component="h5">
                      No product review
                    </Typography>
                  )}
                </Box>
              </>
            )}
          </>
        )}
      </Box>
    </>
  );
};

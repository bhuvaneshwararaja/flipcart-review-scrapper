import { Box, makeStyles,Typography,withStyles,LinearProgress } from "@material-ui/core";
import { useEffect,useState } from "react";
import {useLocation,useParams} from "react-router-dom"
import Pagination from '@material-ui/lab/Pagination';
import { Navbar } from "../../Components/Navbar";
import StarIcon from "@material-ui/icons/Star";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
const useStyles = makeStyles((theme) => ({
   container: {
    width:"100%",
    minHeight:"100vh",
    marginTop:"3.5rem",
    display: "flex",
    flexDirection:"column",
    alignItems: "center"
    
   },
   reviewcontainer:{
       width:"100%",
       minHeight:"inherit",
       background:"#fff",
       display: "flex",
   },
   pagination:{
    width: "80%",
    height: "10vh",
    position: "fixed",
    bottom: "0",
    background: "#fff",
    display:"flex",
    justifyContent:"center",
    alignItems: "center",
   },
   sidecontainer:{
    width: "33% !important", 
    minHeight:"45vh",
    borderBottom: "1px solid rgba(0,0,0,.1)",
    position:"relative",
    top:"10rem"
   },
   details:{
       display:"flex",
       flexDirection:"column",
       alignItems: "center",
       justifyContent:"space-around",
       minHeight:"40vh"
   },
   allreview:{
   width:"80%",
    minHeight:"100vh",
    display:"flex",
    flexDirection:"column",
    borderLeft:"1px solid rgba(0,0,0,.1)"
   },
   ratelist:{
    listStyle: "none",
    width:"25rem",
    display:"flex",
    alignItems:"center",
    justifyContent:"space-around"
   },
   ratting:{
       display:"flex",
       padding:"24px",
       alignItems:"center",
       flexDirection:"column"
   }
}))
const GlobalCss = withStyles({
    '@global':{
        ".MuiPaginationItem-outlinedPrimary.Mui-selected": {
            color:"#fff",
            backgroundColor:"#2874f0"
         },
         ".MuiTypography-h6 ":{
             width:"80%"
         },
         ".MuiLinearProgress-root":{
             width:"15rem !important",
            
         },
         ".MuiLinearProgress-barColorPrimary":{
            backgroundColor:"green"
         }
    }
   
})(() => null)
export const ProductPage = () => {
    const classes = useStyles()
    const currentProduct = useParams().id;
    const [productdata,setProductdata] = useState()
    const [reviews,setReviews] = useState()
    const [page,setPage] = useState(1)
  console.log(currentProduct)
    useEffect(() => {
        fetch(`/product/${currentProduct}`, {
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
             setProductdata(res)
              }
            )
    },[])
    useEffect(() => {
        if(productdata){
            var perpage = 25;
            var totalpages = Math.ceil(productdata[6].productReviews.length/perpage);
            var pagearr = []
            var temparr = []
            for(var i=0;i<productdata[6].productReviews.length;i++){
                temparr.push(productdata[6].productReviews[i]);
              if(temparr.length === perpage){
              pagearr.push(temparr)
              temparr = []
              }
            }
            if(!temparr)
                pagearr.push(temparr)
                temparr = []
            
            setReviews(pagearr)
        }
    },[productdata])
    console.log(reviews)
    console.log(productdata)
    const handleChange = (event,value) => {
        setPage(value)
    }
    return <>
    <GlobalCss />
    <Navbar />
    <Box className={classes.container}>
        <div className={classes.reviewcontainer}>
            <div className={classes.sidecontainer}>
                {productdata &&reviews ? (<>
                    
                   <div className={classes.details}>
                      <div style={{"textAlign":"center"}}>
                      <img src={productdata[2].productImage} width="100px"  alt=""></img>
                      </div>
                   <Typography variant="h6" component="h6" >{productdata[0].productName.slice(0,70)}...</Typography>
                 
                          <div className={classes.ratting}>
                    <div style={{"display":"flex","alignItems":"center"}}>
                        <Typography variant="h5" display="flex" minHeight="5vh" flexDirection="column">{productdata[5].productRatings[0].overallRating} <StarIcon style={{ height: "1.2rem" }} /></Typography>
                        <Typography variant="body2">{productdata[5].productRatings[0].ratingCount}{" "}
                            {productdata[5].productRatings[0].reviewCount}</Typography>
                    </div>
                    <ul>
                    {Object.keys(productdata[5].productRatings[1]).reverse().map((value,index) => {
                        console.log(Math.round(parseFloat(Object.values(productdata[5].productRatings[1]).reverse()[index].split(",").join(""))/parseFloat(Object.values(productdata[5].productRatings[1]).reverse()[0].split(",").join(""))*100))
                        return <> 
                        
                            <li className={classes.ratelist}>
                                <Typography variant="h5">{value} <StarIcon style={{ height: "1.2rem" }} /></Typography>
                                <LinearProgress variant="determinate" value={Math.round(parseFloat(Object.values(productdata[5].productRatings[1]).reverse()[index].split(",").join(""))/parseFloat(Object.values(productdata[5].productRatings[1]).reverse()[0].split(",").join(""))*100)} ></LinearProgress>
                                <Typography variant="body2">{Object.values(productdata[5].productRatings[1]).reverse()[index]}</Typography>
                            </li>
                        </>
                    })}
                    </ul>
                </div> 
                   </div>
                  
                </>):""}
                
            </div>
            <div className={classes.allreview}>
               {productdata && reviews ? (<>
                <div className={classes.header}>
                    <Typography variant="h5" component="h2" style={{"borderBottom":"1px solid rgba(0,0,0,.1)","padding": "24px 0 24px 24px"}}>{productdata[0].productName} Reviews</Typography>

                </div>
                {/* <div className={classes.ratting}>
                    <div style={{"width":"10%"}}>
                        <Typography variant="h5" display="flex" minHeight="5vh" flexDirection="column">{productdata[5].productRatings[0].overallRating} <StarIcon style={{ height: "1.2rem" }} /></Typography>
                        <Typography variant="body2">{productdata[5].productRatings[0].ratingCount}{" "}
                            {productdata[5].productRatings[0].reviewCount}</Typography>
                    </div>
                    <ul>
                    {Object.keys(productdata[5].productRatings[1]).reverse().map((value,index) => {
                        console.log(Math.round(parseFloat(Object.values(productdata[5].productRatings[1]).reverse()[index].split(",").join(""))/parseFloat(Object.values(productdata[5].productRatings[1]).reverse()[0].split(",").join(""))*100))
                        return <> 
                        
                            <li className={classes.ratelist}>
                                <Typography variant="h5">{value} <StarIcon style={{ height: "1.2rem" }} /></Typography>
                                <LinearProgress variant="determinate" value={Math.round(parseFloat(Object.values(productdata[5].productRatings[1]).reverse()[index].split(",").join(""))/parseFloat(Object.values(productdata[5].productRatings[1]).reverse()[0].split(",").join(""))*100)} ></LinearProgress>
                                <Typography variant="body2">{Object.values(productdata[5].productRatings[1]).reverse()[index]}</Typography>
                            </li>
                        </>
                    })}
                    </ul>
                </div> */}
                <div style={{"padding":"24px","marginBottom":"8rem"}}>
                    {productdata && reviews ? (<>
                        {reviews[page-1].map((review,index) => {
                            return <>
                            <div style={{"borderBottom":"1px solid rgba(0,0,0,.1","margin":"1rem 0rem"}}>
                            <div style={{"display":"flex"}}>
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
                              {review.Rating}{" "}
                              <StarIcon style={{ height: "1.2rem" }} />
                            </span>{" "}
                           
                          </Typography>
                            <Typography variant="h5" style={{"fontSize":"1.3rem","marginLeft":"1rem"}}>{review.CommentHead}</Typography>
                            </div>
                            <Typography variant="body2" style={{"fontWeight":"300","fontSize":"1rem","lineHeight":"2rem","margin":".5rem 0rem"}}>{review.Comment}</Typography>
                            <Typography variant="body1" style={{"marginBottom":".5rem","display":"flex","alignItems":"center","color":"dimgray"}}>{review.Name} <CheckCircleIcon style={{ height: "1rem" }} /> certified Buyer</Typography>
                            </div>
                           
                            </>
                        })}
                    
                    </>):""}
                </div>
               </>):""}
            </div>
            
        </div>
        <div className={classes.pagination}>
            {reviews ? (<>
                <Pagination count={reviews.length} page={page} onChange={handleChange} variant="outlined" color="primary" />
            </>):" "}
        </div>
    </Box>
    
    </>
}
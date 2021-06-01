import { useEffect,useState } from "react";
import {useLocation,useParams} from "react-router-dom"
export const ProductPage = () => {
    const currentProduct = useParams().id;
    const [productdata,setProductdata] = useState()
    const [reviews,setReviews] = useState()
    const [currentpage,setcurrentpage] = useState(1)
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
    return <>
        {reviews ?(
            <>
                {reviews[currentpage].map((reviewcontent,i) => {
                    return <>
                    
                        <h1>{reviewcontent.Comment}</h1>
                    </>
                })}
            
            </>
        ):("")}
    </>
}
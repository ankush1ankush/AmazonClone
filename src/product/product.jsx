import React from 'react'
import "./Produc.css";
import { useStateValue } from '../StateProvider/StateProvider';

function Product(props) {
    const {id,title,price,image,rating}=props;
    
    const [state,dispatch] = useStateValue()                        
    // since we pass the basket as the inital object so reducer will set the basket as the inital state;
    // will aslo return the dispatch function
   // console.log(basket.length);
   
   function addToBasket(){
       dispatch({
        type:"ADD_TO_BASKET",
        item:{
            id:id,
            title:title,
            image:image,
            price:price,
            rating:rating
        }
       })  
    }
    //console.log(state)
  return (
    <div className="product">
        <div className="product_info">

            <p>{title}</p>

            <p className="product_price">
                <small>Rs</small>
                <strong>{price}</strong>
            </p>

            <div className="product_rating">

                {Array(rating).fill().map((_,i)=>{
                    return <p key={i}>🌟</p>
                })}
                
            </div>

        </div>

        <img alt="" src={image}/>

        <button onClick={addToBasket}>Add to Basket</button>
    </div>
  )
}

export default Product;

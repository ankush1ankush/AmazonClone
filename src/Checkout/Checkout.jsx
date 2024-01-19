import React from "react";
import "./Checkout.css";
import Subtotal from "../Subtotal/Subtotal";
import { useStateValue } from "../StateProvider/StateProvider";
import CheckoutProduct from "../CheckoutProduct/CheckoutProduct";

 function Checkout()
{    
    const [{basket,user}]=useStateValue();
    //console.log(state.basket)
    //console.log(user.email);
    return (
        <div className="checkout">
            <div className="checkout_left">
                <img src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg" alt="" className="checkout_ad" />
                <div>
                    <h3> Hello ,{user?user.email:"Guest"} </h3>
                    <h2 className="checkout_title">
                       Your shopping Basket
                    </h2>
                    {basket?.map((item,i)=>{
                        return <CheckoutProduct key={i} price={item.price} rating={item.rating} title={item.title} id={item.id} image={item.image} hideButton={false}/>
                    })}
                </div>
                
                    
            </div>
            <div className="checkout_right">
               <Subtotal/>
            </div>
        </div>
      
    )

}


export default Checkout;
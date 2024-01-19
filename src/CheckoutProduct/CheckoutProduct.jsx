import React from 'react'
import './CheckoutProduct.css'
import { useStateValue } from '../StateProvider/StateProvider';
function CheckoutProduct(props) {
    const {id,image,price,title,rating,hideButton}=props;
    const [{basket},dispatch]=useStateValue();
    function RemoveItem(){
        dispatch({
            type:"REMOVE_FROM_BASKET",
            id:id
        })
    }
  return (
   <div className="checkoutProduct">
    <div className="imageContainer">
     <img className='ProductImage' src={image} alt=''/>
     </div> 
    <div className="checkout_info">
        <p className='checkout_title'>{title}</p>
        <p className="checkout_price">Rs {price}</p>
        <div className="product_rating">

                {Array(rating).fill().map((_,i)=>{
                    return <p key={i}>🌟</p>
                })}
                
            </div>
       {!hideButton&& ( <button onClick={RemoveItem} className='RemoveButton'>Remove from basket</button>)
       }
    </div>
   </div>

  )
}

export default CheckoutProduct
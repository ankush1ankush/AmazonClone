import React from 'react';
import './Subtotal.css';
import CurrencyFormat from "react-currency-format";
import { useStateValue } from '../StateProvider/StateProvider';
import { getBasketTotal } from '../StateProvider/Reducer';
import { useNavigate } from 'react-router-dom';

function Subtotal()
{    
  
    const [{basket}]=useStateValue();
    // console.log(basket);
    const Navigate=useNavigate();
    
    function handleCheckout()
    {
      Navigate("/payment");
    }
    
    return (
    <div className="subtotal">
        <CurrencyFormat
          renderText={
            (value)=>(
                <>
                <p>
                    Subtotal ( {basket.length}  items): <strong>{value}</strong>
                </p>
                 <small className="subtotal_gift">
                  <input type="checkbox"/>This order contain a gift
                 </small>
               </>
            )
          }
          decimalScale={2}
          value={getBasketTotal(basket)}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"Rs"}
        />
        <button onClick={handleCheckout}>Proceed to Checkout</button>
    </div>
     
        )
}

export default Subtotal;
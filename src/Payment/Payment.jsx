import React, { useState } from 'react'
import { useStateValue } from '../StateProvider/StateProvider';
import CheckoutProduct from '../CheckoutProduct/CheckoutProduct';
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from '../StateProvider/Reducer';
import { Link } from 'react-router-dom'
import "./Payment.css"
import {CardElement ,useStripe ,useElements} from "@stripe/react-stripe-js";
import { useEffect } from 'react';
import axios from "../Axios/Axios"
import { useNavigate } from 'react-router-dom';


//////////////////////////////////////////////////////////////////////////////////////////////
/*
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZmYazovaaf1DZbbtM3GYwHdIzKHMM6CA",
  authDomain: "clone-295a6.firebaseapp.com",
  projectId: "clone-295a6",
  storageBucket: "clone-295a6.appspot.com",
  messagingSenderId: "278278145914",
  appId: "1:278278145914:web:897c85a87cb450f07338c3",
  measurementId: "G-V5SX8PNWWM",
};
*/
import { getFirestore, collection, setDoc,doc,addDoc} from 'firebase/firestore';
import {app} from "../FirebaseConsole/firebase"

// Initialize 

const db = getFirestore(app);


/////////////////////////////////////////////////////////////////////////////////////////////





function Payment() {
    const navigate=useNavigate();
    const [{basket,user},dispatch]=useStateValue();
    const stripe=useStripe();
    const elements=useElements();

    const [succeeded,setSucceeded]=useState(false);
    const [processing,setProcessing]=useState("");
    const [error,setError]=useState();
    const [disabled,setDisabled]=useState(true);
    const [clientSecret,setClinetSecret]=useState(true);
     
    useEffect(()=>{
      const getClientSecret=async()=>{
        const response=await axios({
          method:'post',
          url:`/payments/create?total=${getBasketTotal(basket)*100}`
        });
        setClinetSecret(response.data.clientSecret);
      }
      getClientSecret();
      
    },[basket]);
  
    //console.log(clientSecret);
    
    async function handleSubmit (e)
    {
         e.preventDefault();
         setProcessing(true);
         const payload=await stripe.confirmCardPayment(clientSecret,{
          payment_method:{
            card: elements.getElement(CardElement)
          }
         }).then(async ({paymentIntent})=>{
          setSucceeded(true);
          setError(null);
          setProcessing(false);

          
          /*db.collection('users')
          .doc(user.uid)
          .collection('orders')
          .doc(paymentIntent.id)
          .set({
              basket: basket,
              amount: paymentIntent.amount,
              created: paymentIntent.created
          });*/
           
          /*try {
            const docRef = await doc(collection(db, "users"), {
              first: "Ada",
              last: "Lovelace",
              born: 1815
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
         */
          await setDoc(doc(db, "users",`${user?.uid}`,"order",`${paymentIntent?.id}`), {
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created
          });

        
          
         });

            setSucceeded(true);
            setError(null);
            setProcessing(false);

            dispatch({
                type: 'EMPTY_BASKET'
            })

            navigate("/orders");
    }
   

    function handleChange(e)
    {
        setDisabled(e.empty); 
        setError(e.error?e.error.message:"") ; 
    }
    
  return (
    <div ClassName="payment">
        < div className="payment_container">
            <h1>Checkout( <Link to="/checkout">{basket?.length} items </Link>)</h1>
          <div className="paymentSection">
             <div className="payment_title">
                Delivary Address
               
             </div>
              <div className="payment_Address">
               <p>{user?.email}</p>
                <p>Khalasi Line</p>
                <p>Saharanpur, UP</p>
              </div>
          </div>
          <div className="paymentSection">
            <div className="payment_title">
                Review items and delivery
               
            </div>
            <div className="payment_items">
            {basket?.map((item,i)=>{
                        return <CheckoutProduct key={i} price={item.price} rating={item.rating} title={item.title} id={item.id} image={item.image}/>
                    })}
            </div>
          </div>
          <div className="paymentSection">
             <div className="payment_title">
               Payment Method
               
             </div>
             <div className="payment_details">
                 <form onSubmit={handleSubmit} >
                  <CardElement onChange={handleChange}/>
                  <div className="payment_priceContainer">
                  <CurrencyFormat
                  renderText={
                  (value)=>(
                    <>
                    <p>
                    Subtotal ( {basket.length}  items): <strong>{value}</strong>
                   </p>
                 
                   </>
            )
          }
          decimalScale={2}
          
          value={getBasketTotal(basket)}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"Rs"}
        />
         <button disabled={processing || disabled || succeeded}>
                                        <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                    </button>
                  </div>
                 </form>
             </div>
          </div>
        </div>
    </div>
  )
}

export default Payment
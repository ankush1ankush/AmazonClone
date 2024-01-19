import React, { useEffect } from 'react'
import "./Orders.css"
import { useState } from 'react'
import { app } from '../FirebaseConsole/firebase'

import { useStateValue } from '../StateProvider/StateProvider';
import {  onSnapshot,orderBy,getFirestore, getDocs, query,collection} from 'firebase/firestore';
import Order from '../Order/Order';
const db = getFirestore(app);


function Orders() {
const [{basket,user},dispatch] = useStateValue([]);
const[orders,setOrders]=useState();
//console.log(user.uid);

/*
async function GetOrder() {
  let q=query( collection(db, "users",`${user.uid}`,"order"));
    
  q=query(q,orderBy("created","desc"));

  //  const querySnapshot = await getDocs(q);

   /* querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
});
   
onSnapshot(q, (snapshot) => {
  setOrders(
    snapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }))
  );
});

}*/

useEffect( ()=>{

 

    async function GetOrder(){
      if(user){
  let q=query( collection(db, "users",`${user?.uid}`,"order"));
    
    q=query(q,orderBy("created","desc"));

  
     await onSnapshot(q, (snapshot) => {
       setOrders(
       snapshot.docs.map((doc) => ({
        id: doc.id,
       data: doc.data(),
       })
       )
       );
    });
  }
  else{
    setOrders([]);
  }
  }
  GetOrder();
},[user])

console.log(orders); 
  
  

  return (
    /*<div className='orders'>
        <h1> your orders</h1>
        <div className="orders_order">
          {orders.map((orderItem,index)=>{
            return <Order key={index} order={orderItem}/>
        })}
        </div>
    </div>*/
    <div className='orders'>
    <h1>Your orders</h1>
    <div className="orders_order">
      {orders && orders.map((orderItem, index) => (
        <Order key={index} order={orderItem} />
      ))}
    </div>
  </div>
    

  )
}

export default Orders
import React from 'react'
import './Header.css'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import { Link } from 'react-router-dom';
import { useStateValue } from '../StateProvider/StateProvider';
import {auth} from "../FirebaseConsole/firebase"
import { signOut } from 'firebase/auth';

function Header() {
  const [{basket,user},dispatch]=useStateValue();
  function handleAuthentication()
  {
     if(user)
     {
       signOut(auth).then(()=>{
           dispatch({type:"SIGN_OUT"});
       }).catch((error)=>{
        console.log(error);
       })
     }
  }
  return (
   
    <div className='header'>

     <Link to="/">
<img  alt='logo' className="header_logo" src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"/>
</Link>
 <div className="header_address">
 <FmdGoodOutlinedIcon className="header_LocationIcon"/>
   <div className="header_addressInfo">
   <span className="header_addressLineOne">Deliver to Suresh</span>
   <span className="header_addressLineTwo">Saharanpur 247001</span>
   </div>
 </div>
 <div className="header_search">
   
 <input className="header_searchInput" type="text"/>
 <SearchIcon className='header_searchIcon'/>
 </div>
 <div className="header_nav">
  <Link to={!user&&"/login"}>
   <div onClick={handleAuthentication} className="header_option">
   <span className="header_optionLineOne">
     Hello {user?user.email:'Guest'}
   </span>
   <span className="header_optionLineTwo">
   {user?"Sign Out":"Sign In"}
   </span>
   </div>
   </Link>
   <div className="header_option">
   <span className="header_optionLineOne">
     Returns
   </span>
   <span className="header_optionLineTwo">
    & Orders
   </span>
   </div>
   <div className="header_option">
   <span className="header_optionLineOne">
     Your
   </span>
   <span className="header_optionLineTwo">
     Prime
   </span>
   </div>
   
   <Link to="/checkout">
   <div className="header_optionBasket">
          <ShoppingCartIcon/>
            <span className="header_optionLineTwo header_basketCount"> {basket.length } </span>
       
   </div>
   </Link>
  
 </div>
</div>
   
  
  )
}

export default Header
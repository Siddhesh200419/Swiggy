import { Routes, Route } from 'react-router-dom';
import Head from './Components/Head';
import Body from './Components/body';
import Cart from './Components/Cart';
import Search from './Components/Search';
import RestaurantMenu from './Components/RestaurantMenu';
import { CartContext, Coordinates, Visibility } from './context/contextApi';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SigninPage from './Components/SigninPage';


function App() {
  // const [visible, setVisible] = useState(false);
  const visible = useSelector((state)=>state.toggleSlice.searchBarToogle)
  const [coord, setCoord] = useState({ lat: 28.65200, lng: 77.16630 })
  // const [cartData,setCartData] = useState([])
  
//   function  get_Data_From_Local_Storage() {
//     let data = JSON.parse(localStorage.getItem("cartData")) || []
//     setCartData(data)
//   }
// useEffect(() => {
//   get_Data_From_Local_Storage()
// },[])

  return (
    // <CartContext.Provider value={{cartData,setCartData}}>
    <Coordinates.Provider value={{coord,setCoord}}>
      {/* <Visibility.Provider value={{ visible, setVisible }}> */}
        <div className={visible ? "max-h-screen overflow-hidden" : " "}>
          <Routes>
            <Route path="/" element={<Head />}>
              <Route path="/" element={<Body />} />
              <Route path="/restaurantMenu/:id" element={<RestaurantMenu />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/signin" element={<SigninPage />} />
              <Route path="/search" element={<Search />} />

              <Route path="*" element={<h1>Coming soon... </h1>} />
            </Route>
          </Routes>
        </div>
      {/* </Visibility.Provider> */}
    </Coordinates.Provider>
    // </CartContext.Provider>
  );
}

export default App;

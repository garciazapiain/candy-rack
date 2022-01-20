import React from "react";
import "./index.css";
import PopupWindow from "./components/PopupWindow";

function App() {
  const [showPopup, setShowPopup] = React.useState(false)
  const [cartIds, setCartIds] = React.useState([]) 
  const [offersData, setOffersData] = React.useState({}) 
  const [cartPrice, setCartPrice] = React.useState(0)
  const [cartSubmitted, setCartSubmitted] = React.useState(false)

  function togglePopup(){
    setShowPopup(prev => !prev)
  }

  function alertWindow(){
    togglePopup()
    setCartSubmitted(true)
  }

  React.useEffect(() => {
    async function alertWindow() {
      return cartSubmitted? alert("selected id's:" + cartIds) : ""
    }
      setCartSubmitted(false)
      alertWindow()
    }, [cartSubmitted])


  function updateCartAdd(id) {
    if(cartIds.indexOf(id)==-1){
      setCartIds(prev =>{
        return [...prev, id]
      })
    }
  }

  function updateCartRemove(id) {
    const array = [...cartIds]
    const index = array.indexOf(id)
    array.splice(index,1)
    setCartIds(array)
  }

  function updatePrice(newItem) {
    setCartPrice(prev=> prev +newItem)
  }

  React.useEffect(() => {
    async function getOffers() {
      const res = await fetch("https://private-803503-digismoothietest.apiary-mock.com/offers")
      const data = await res.json()
      setOffersData(data.offers)
    }
      getOffers()
    }, [])

  React.useEffect(() => {
    async function getPrice() {
      setCartPrice(0)
        offersData.map(offer => 
          cartIds.map(cartId => {
            if(cartId == offer.id){
              return (offer.discounted_price!=null ? updatePrice(offer.discounted_price) : updatePrice(offer.original_price))
            }
          })
        )}
    getPrice()
  }, [cartIds])

  return (
    <div className={!showPopup? "main-page-without-popup group" : "main-page-with-popup group" }>
      {!showPopup && <button onClick = {togglePopup} datatestid="mainPageButton" className="show-cart-button group">Show the Cart</button>}
      {showPopup && <PopupWindow
        togglePopup={togglePopup}
        alertWindow={alertWindow}
        updateCartAdd={updateCartAdd}
        updateCartRemove={updateCartRemove}
        offersData={offersData}
        cartPrice={cartPrice}
        cartIds={cartIds}
      />}
    </div>
  )
}

export default App;

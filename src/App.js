import React from "react";
import "./index.css";
import PopupWindow from "./components/PopupWindow";

function App() {
  const [showPopup, setShowPopup] = React.useState(false)
  const [cartIds, setCartIds] = React.useState([]) 
  const [offersData, setOffersData] = React.useState({}) 
  const [cartPrice, setCartPrice] = React.useState(0)
  const [cartSubmitted, setCartSubmitted] = React.useState(false)

  React.useEffect(() => {
    async function getOffers() {
      const res = await fetch("https://private-803503-digismoothietest.apiary-mock.com/offers")
      const data = await res.json()
      setOffersData(data.offers)
    }
      getOffers()
    }, [])

  // Condition that toggles if Popup Window modal should appear
  function togglePopup(){
    setShowPopup(prev => !prev)
  }
  
  // State controller of cart id's the user has added
  function updateCartAdd(id) {
    if(cartIds.indexOf(id)==-1){
      setCartIds(prev =>{
        return [...prev, id]
      })
    }
  }

  // State controller of cart id's the user has removed
  function updateCartRemove(id) {
    const array = [...cartIds]
    const index = array.indexOf(id)
    array.splice(index,1)
    setCartIds(array)
  }

  // Function that goes through all offers data and compares with cart id's to see what is currently selected. This in order to calculate price
  React.useEffect(() => {
    async function getPrice() {
      setCartPrice(0)
        for (const [key, offer] of Object.entries(offersData)) {
          console.log(offer)
          // console.log(offersData[key].id)
          cartIds.map(cartId => {
            if(cartId == offer.id){
              return (offer.discounted_price!=null ? updatePrice(offer.discounted_price) : updatePrice(offer.original_price))
            }
          })
        }
      }
    getPrice()
  }, [cartIds])

   // Function that updates current value price of the cart
  function updatePrice(newItem) {
    setCartPrice(prev=> prev +newItem)
  }

  // Function that after submission triggers the alert window
  function submission(){
    togglePopup()
    setCartSubmitted(true)
  }

  // Alert Window Function
  React.useEffect(() => {
    async function alertWindow() {
      return cartSubmitted? alert("selected id's:" + cartIds) : ""
    }
      setCartSubmitted(false)
      alertWindow()
    }, [cartSubmitted])

  return (
    <div className={!showPopup? "main-page-without-popup group" : "main-page-with-popup group" }>
      {!showPopup && <button onClick = {togglePopup} datatestid="mainPageButton" className="show-cart-button group">Add To Cart</button>}
      {showPopup && <PopupWindow
        togglePopup={togglePopup}
        submission={submission}
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

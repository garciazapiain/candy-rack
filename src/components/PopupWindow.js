import React from "react";
import OffersList from "./OfferList";

function PopupWindow(props) {
    return (
        <div className="popup-window group" datatestid="popUpWindow" >
            <div className="popup-window-headline">
                <h1 className="font-bold sm:text-3xl m-[10px]">Wait, dont miss our deals, today only!</h1>
                <span onClick={props.togglePopup}> X </span>
            </div>
            <br></br>
            <div className="popup-window-cart">
                <div className="flex">
                    <img className="popup-window-images" src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-cart-shopping-actions-those-icons-lineal-those-icons-3.png"/>
                    <strong className="self-center"><p>Your Cart</p></strong>
                </div>
                <strong className="self-center"><p datatestid="cartPrice">{props.cartPrice} US$</p></strong>
            </div>
            <div className="popup-window-offers">
                <OffersList
                    offersData={props.offersData}
                    updateCartAdd={props.updateCartAdd}
                    updateCartRemove={props.updateCartRemove}
                    cartIds={props.cartIds}
                />
            </div>
            <div className="popup-window-submission-section group">
                <button className="popup-window-submission-section-button group" datatestid="confirmSubmission" onClick={props.submission}>Confirm Submission</button>
            </div>
        </div> 
    );
}

export default PopupWindow;


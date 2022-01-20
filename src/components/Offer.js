import React from "react";

function Offer (props) {
    let discount = false
    if (props.discountedPrice!= null){
        discount=true
    }

    return (
        <div className="popup-window-offers-offer group">
            <div className="flex">
                <img className= "popup-window-images group" src={props.image}></img>
                <div className="popup-window-offers-offer-info group">
                    <div className="flex m0"> 
                        <strong className="popup-window-offers-offer-p"><p>{props.title} </p></strong>
                        <p className={`${discount? "text-slate-500 line-through mr-2 self-center" : "self-center" }`}>{props.originalPrice} US$</p>
                        {props.discountedPrice != null && <p className="self-center">{props.discountedPrice} US$</p>}
                    </div> 
                    <p className="flex ml-3">{props.desc}</p> 
                </div>
            </div>
            {props.offerSelected==-1?
                <button datatestid={`offer${props.id}`} onClick={() => props.updateCartAdd(props.id)} className="popup-window-offers-offer-add-button group">
                    + Add
                </button> 
                : 
                <button datatestid={`offer${props.id}`} onClick={() => props.updateCartRemove(props.id)} className="popup-window-offers-offer-remove-button group">
                    - Remove
                </button> 
            }       
        </div>
    )
}

export default Offer
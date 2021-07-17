import classes from '../../styling/Cart.module.css'
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import {Fragment, useContext, useState} from "react";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = props => {
    const cartCtx = useContext(CartContext);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const [isCheckingOut, setIsCheckingOut] = useState(false);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

    const hasItems = cartCtx.items.length > 0;

    const cartItemAddHandler = item => {
        cartCtx.addItem({...item, amount: 1});
    };

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    };

    const orderHandler = event => {
        setIsCheckingOut(true);
    };

    const submitOrderHandler = async userData => {
        setIsSubmitting(true);
        await fetch('https://tj-react-project-default-rtdb.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            })
        });
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
    };

    const modalActions = (
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
            {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
        </div>
    );


    const isSubmittingModalContent = <p>Sending order...</p>;

    const didSubmitModalContent =
        <Fragment>
            <p>Order submitted successfully! :)</p>
            <div className={classes.actions}>
                <button className={classes.button} onClick={props.onClose}>Close</button>
            </div>
        </Fragment>

    const cartItems = <ul className={classes['cart-items']}>{cartCtx.items.map(item =>
        <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
        />)}</ul>;

    const cartModalContent =
        <Fragment>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckingOut && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose}/>}
            {!isCheckingOut && modalActions}
        </Fragment>;

    return <Modal onClose={props.onClose}>
        {!isSubmitting && !didSubmit && cartModalContent}
        {isSubmitting && isSubmittingModalContent}
        {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
};

export default Cart;
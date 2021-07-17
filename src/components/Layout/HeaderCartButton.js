import classes from '../../styling/HeaderCartButton.module.css';
import CartIcon from "../Cart/CartIcon";
import {useContext, useEffect, useState} from "react";
import CartContext from "../../store/cart-context";

const HeaderCartButton = props => {
    const cartCtx = useContext(CartContext);
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

    const numCartItems = cartCtx.items.reduce((curNumber, item) => {
        return curNumber + item.amount;
    }, 0);

    const {items} = cartCtx;

    const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;

    useEffect(() => {
        if (cartCtx.items.length === 0) {
            return;
        }
        setBtnIsHighlighted(true);

        const animationTimer = setTimeout(() => {
            setBtnIsHighlighted(false);
        }, 300);

        return () => {
            clearTimeout(animationTimer);
        };
    }, [items, cartCtx]);

    return <button className={btnClasses} onClick={props.onClick}>
        <span className={classes.icon}>
            <CartIcon/>
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>
            {numCartItems}
        </span>
    </button>
};

export default HeaderCartButton;
import {Fragment} from 'react';

import classes from '../../styling/Header.module.css';
import mealsImg from '../../assets/meals.jpeg';
import HeaderCartButton from '../Layout/HeaderCartButton';

const Header = props => {
    
    return (
        <Fragment>
            <header className={classes.header}>
                <h1>ReactMeals</h1>
                <HeaderCartButton onClick={props.onShowCart}>Cart</HeaderCartButton>
            </header>
            <div className={classes['main-image']}>
                <img src={mealsImg} alt="A table full of delicious food!"/>
            </div>
        </Fragment>
    );
};

export default Header;
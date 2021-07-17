import classes from '../../styling/Checkout.module.css';

const Checkout = props => {
    const confirmHandler = event => {
        event.preventDefault();

    };

    return <form onSubmit={confirmHandler}>
        <div className={classes.control}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name"/>
        </div>
        <div className={classes.control}>
            <label htmlFor="address">Address</label>
            <input type="text" id="address"/>
        </div>
        <div className={classes.control}>
            <label htmlFor="city">City</label>
            <input type="text" id="city"/>
        </div>
        <div className={classes.control}>
            <label htmlFor="state">State</label>
            <input type="text" id="state"/>
        </div>
        <div className={classes.control}>
            <label htmlFor="zip">Zipcode</label>
            <input type="text" id="zip"/>
        </div>
        <div className={classes.actions}>
            <button type="button" onClick={props.onCancel}>Cancel</button>
            <button type="submit" className={classes.submit}>Confirm</button>
        </div>
    </form>
};

export default Checkout;
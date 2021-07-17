import classes from '../../styling/Checkout.module.css';
import {useRef, useState} from "react";

const isEmpty = value => value.trim() === '';

const is5Chars = zip => zip.trim().length === 5;

const Checkout = props => {
    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        address: true,
        city: true,
        state: true,
        zipcode: true
    });

    const nameInputRef = useRef();
    const addressInputRef = useRef();
    const cityInputRef = useRef();
    const stateInputRef = useRef();
    const zipcodeInputRef = useRef();

    const confirmHandler = event => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredAddress = addressInputRef.current.value;
        const enteredCity = cityInputRef.current.value;
        const enteredState = stateInputRef.current.value;
        const enteredZipcode = zipcodeInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredAddressIsValid = !isEmpty(enteredAddress);
        const enteredCityIsValid = !isEmpty(enteredCity);
        const enteredStateIsValid = !isEmpty(enteredState);
        const enteredZipcodeIsValid = is5Chars(enteredZipcode);

        setFormInputsValidity({
            name: enteredNameIsValid,
            address: enteredAddressIsValid,
            city: enteredCityIsValid,
            state: enteredStateIsValid,
            zipcode: enteredZipcodeIsValid
        });

        const formIsValid =
                enteredName &&
                enteredAddress &&
                enteredCity &&
                enteredState &&
                enteredZipcode;

        if (formIsValid) {
            props.onConfirm({
                name: enteredName,
                address: enteredAddress,
                city: enteredCity,
                state: enteredState,
                zipcode: enteredZipcode
            });
        }
    };

    return <form className={classes.form} onSubmit={confirmHandler}>
        <div className={`${classes.control} ${formInputsValidity.name ? '' : classes.invalid}`}>
            <label htmlFor="name">Name</label>
            <input ref={nameInputRef} type="text" id="name"/>
            {!formInputsValidity.name && <p>Please enter a valid name.</p>}
        </div>
        <div className={`${classes.control} ${formInputsValidity.address ? '' : classes.invalid}`}>
            <label htmlFor="address">Address</label>
            <input ref={addressInputRef} type="text" id="address"/>
            {!formInputsValidity.address && <p>Please enter a valid address.</p>}
        </div>
        <div className={`${classes.control} ${formInputsValidity.city ? '' : classes.invalid}`}>
            <label htmlFor="city">City</label>
            <input ref={cityInputRef} type="text" id="city"/>
            {!formInputsValidity.city && <p>Please enter a valid city name.</p>}
        </div>
        <div className={`${classes.control} ${formInputsValidity.state ? '' : classes.invalid}`}>
            <label htmlFor="state">State</label>
            <input ref={stateInputRef} type="text" id="state"/>
            {!formInputsValidity.state && <p>Please enter a valid state.</p>}
        </div>
        <div className={`${classes.control} ${formInputsValidity.zipcode ? '' : classes.invalid}`}>
            <label htmlFor="zip">Zipcode</label>
            <input ref={zipcodeInputRef} type="text" id="zip"/>
            {!formInputsValidity.zipcode && <p>Please enter a valid zipcode.</p>}
        </div>
        <div className={classes.actions}>
            <button type="button" onClick={props.onCancel}>Cancel</button>
            <button type="submit" className={classes.submit}>Confirm</button>
        </div>
    </form>
};

export default Checkout;
import React from 'react';

import DUMMY_MEALS from '../../assets/dummy-meals';
import classes from '../../styling/AvailableMeals.module.css';

const AvailableMeals = () => {
    const mealsList = DUMMY_MEALS.map(meal => <li>{meal.name}</li>);

    return (
        <section className={classes.meals}>
            <ul>
                {mealsList}
            </ul>
        </section>
    );
};

export default AvailableMeals;
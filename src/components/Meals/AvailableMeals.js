import DUMMY_MEALS from '../../assets/dummy-meals';
import classes from '../../styling/AvailableMeals.module.css';
import Card from "../UI/Card";

const AvailableMeals = () => {
    const mealsList = DUMMY_MEALS.map(meal => <li>{meal.name}</li>);

    return (
        <section className={classes.meals}>
            <Card>
                <ul>
                    {mealsList}
                </ul>
            </Card>
        </section>
    );
};

export default AvailableMeals;
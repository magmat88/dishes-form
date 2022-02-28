import React from 'react';
// import { reduxForm, Field } from 'redux-form';

interface DishesFormProps {

}

export function DishesForm({}: DishesFormProps): JSX.Element {
    return (
    <form> 
        <div>
            <label htmlFor="name">Dish name</label>
            <input type="text" name="name" id="name" required  />
        </div>

        <div>
            <label htmlFor="preparation_time">Preparation time</label>
            <input type="time" name="preparation_time" id="preparation_time" required />
        </div>

        <div>
            <label htmlFor="type">Dish type:</label>
            <select name="type" id="type" required >
                <option value="pizza">Pizza</option>
                <option value="soup">Soup</option>
                <option value="sandwich">Sandwich</option>
            </select>
        </div>

        {/* TODO: input fields below required conditionally */}
        {"if pizza selected"}
        <div>
            <label htmlFor="no_of_slices"># of slices</label>
            <input type="number" step="1" name="no_of_slices" id="no_of_slices" required />
        </div>

        <div>
            <label htmlFor="diameter">Diameter</label>
            <input type="number" step="0.01" name="diameter" id="diameter" required />
        </div>

        {"if soup selected"}
        <div>
            <label htmlFor="spiciness_scale">Spiciness scale (1-10)</label>
            <input type="range" min="1" max="10" step="1" name="spiciness_scale" id="spiciness_scale" required />
        </div>

        {"if sandwich selected"}
        <div>
            <label htmlFor="slices_of_bread">Number of slices of bread required</label>
            <input type="number" step="1" name="slices_of_bread" id="slices_of_bread" required />
        </div>
        

    </form>
    );
}
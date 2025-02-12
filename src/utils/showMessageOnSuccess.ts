import {
	DISH_TYPE_PIZZA,
	DISH_TYPE_SANDWICH,
	DISH_TYPE_SOUP,
	FIELD_NAME_DIAMETER,
	FIELD_NAME_NAME,
	FIELD_NAME_NO_OF_SLICES,
	FIELD_NAME_PREPARATION_TIME,
	FIELD_NAME_SLICES_OF_BREAD,
	FIELD_NAME_SPICINESS_SCALE,
	FIELD_NAME_TYPE
} from '../config/constants';

export function showMessageOnSuccess(response: any) {
	// let details = '';
	//
	// if (response.data.type === DISH_TYPE_PIZZA) {
	//   details = `${FIELD_NAME_NO_OF_SLICES}: ${response.data[FIELD_NAME_NO_OF_SLICES]}
	//     ${FIELD_NAME_DIAMETER}: ${response.data[FIELD_NAME_DIAMETER]}`;
	// } else if (response.data.type === DISH_TYPE_SOUP) {
	//   details = `${FIELD_NAME_SPICINESS_SCALE}: ${response.data[FIELD_NAME_SPICINESS_SCALE]}`;
	// } else if (response.data.type === DISH_TYPE_SANDWICH) {
	//   details = `${FIELD_NAME_SLICES_OF_BREAD}: ${response.data[FIELD_NAME_SLICES_OF_BREAD]}`;
	// }
	//
	// const messageOnSuccess = `
	//     Submitted successfully.
	//
	//     Selected dish:
	//
	//     id: ${response.data.id}
	//     name: ${response.data[FIELD_NAME_NAME]}
	//     preparation time: ${response.data[FIELD_NAME_PREPARATION_TIME]}
	//     dish type: ${response.data[FIELD_NAME_TYPE]}
	//     ${details}
	//     `;
	//
	// return messageOnSuccess;

	const {name, preparation_time, type, no_of_slices, diameter, spiciness_scale, slices_of_bread} = response;

	if (!type) {
		return "Dish type was not selected. Please choose a valid dish type.";
	}

	let message = `The dish is ready to be ordered:\n\n`;
	message += `- Name: ${name || "---"}\n`;
	message += `- Preparation Time: ${preparation_time || "0:00:00"}\n`;
	message += `- Type: ${type}\n`;

	if (type === "pizza") {
		if (no_of_slices == null || diameter == null) {
			message += "- Missing data for pizza: Number of slices or Diameter.\n";
		} else {
			message += `- Number of Slices: ${no_of_slices || "0"}\n`;
			message += `- Diameter: ${diameter || "0.0"} cm\n`;
		}
	} else if (type === "soup") {
		if (spiciness_scale == null) {
			message += "- Missing data for soup: Spiciness scale.\n";
		} else {
			message += `- Spiciness Scale: ${spiciness_scale || "---"}/10\n`;
		}
	} else if (type === "sandwich") {
		if (slices_of_bread == null) {
			message += "- Missing data for sandwich: Number of slices of bread.\n";
		} else {
			message += `- Number of Slices of Bread: ${slices_of_bread || "0"}\n`;
		}
	} else {
		message += "- Invalid dish type selected.\n";
	}

	return message;
}

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
	let message = `Successfully submitted the dish:\n\n`;
	message += `- Name: ${name}\n`;
	message += `- Preparation Time: ${preparation_time}\n`;
	message += `- Type: ${type}\n`;

	if (type === "pizza") {
		message += `- Number of Slices: ${no_of_slices}\n`;
		message += `- Diameter: ${diameter} cm\n`;
	} else if (type === "soup") {
		message += `- Spiciness Scale: ${spiciness_scale}/10\n`;
	} else if (type === "sandwich") {
		message += `- Number of Slices of Bread: ${slices_of_bread}\n`;
	}

	return message;
}

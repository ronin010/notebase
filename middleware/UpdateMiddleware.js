
const validator = require("validator");
const isEmpty = require("is-empty");

module.exports = (req, res, next) => {
	let {title, content} = req.body;
	let errorMessage = "";

	title = title.isEmpty ? "" : title;
	content = content.isEmpty ? "" : content;

	if (validator.isEmpty(title)) {
		errorMessage = "Title field cannot be empty";
	} else if (validator.isEmpty(content)) {
		errorMessage = "Content field cannot be empty";
	}

	if (errorMessage) {
		res.status(400).json({message: errorMessage});
	}
}
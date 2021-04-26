const db = require("./db");
const Publisher = require("./models/publisher");
const Book = require("./models/book");
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const createPublisher = async () => {
	const shafee = await Publisher.insertMany({
		name: "shafee",
		location: "new york",
		url: "www.shafeeahmed.doesntexist",
	});
	console.log("All publishers", shafee);
};

const createBookofshafee = async () => {
	const shafee = await Publisher.find({ name: "shafee" });
	const shafeeBook = await Book.insertMany({
		title: "NYC",
		author: "shafee ahmed",
		published_date: "2005",
		publisher_id: shafee[0]._id,
	});

	console.log("book of shafee", shafeeBook);
};

const updatingBook = async () => {
	const newUpdate = await Book.updateMany({ title: "Zen and the Art of Motorcycle Maintenance" }, { $set: { author: "Robert M. Pirsig" } });
	console.log("This is an update", newUpdate);
};

const deletingBook = async () => {
	const deleteOneBook = await Book.deleteMany({
		title: "NYC",
	});

	console.log("Book deleted.", deleteOneBook);
};

const findAllBook = async () => {
	const allbook = await Book.find({});
	console.log("All books", allbook);
};

const run = async () => {
	await createPublisher();
	await createBookofshafee();
	await updatingBook();
	await deletingBook();
	await findAllBook();
	db.close();
};

run();

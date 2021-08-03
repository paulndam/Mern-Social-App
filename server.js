const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./server/express");

dotenv.config({ path: "./.env" });

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

const Port = process.env.PORT || 8000;

const server = app.listen(Port, () => {
  console.log(`App Running On Port ----> ${Port} ☄️ 🏃🏼‍♂️ 🏃🏻 🤠  🚘`);
});

process.on("unhandledRejection", (error) => {
  console.log(`------ Unhandled Rejection 😤 😤 😤 Shutting Down ------`);
  console.log(error.name, error.message);
  server.close(() => {
    process.exit(1);
  });
});

// Database Connection URL
mongoose
  // .connect(process.env.DATABASE_LOCAL)
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    //console.log(connect.connections);
    console.log(`Connection with DataBase successfull  🦾 🤠`);
  });

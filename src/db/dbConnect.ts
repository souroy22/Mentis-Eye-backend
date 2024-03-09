import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connection1 = mongoose.createConnection(process.env.MONGO_URI_1 || "");
const connection2 = mongoose.createConnection(process.env.MONGO_URI_2 || "");
const connection3 = mongoose.createConnection(process.env.MONGO_URI_3 || "");
const connection4 = mongoose.createConnection(process.env.MONGO_URI || "");

connection1.on("error", console.error.bind(console, "Connection error:"));
connection2.on("error", console.error.bind(console, "Connection error:"));
connection3.on("error", console.error.bind(console, "Connection error:"));
connection4.on("error", console.error.bind(console, "Connection error:"));

connection1.once("open", () =>
  console.log(`Successfully connected to DATABASE 1`)
);
connection2.once("open", () =>
  console.log(`Successfully connected to DATABASE 2`)
);
connection3.once("open", () =>
  console.log(`Successfully connected to DATABASE 3`)
);
connection4.once("open", () =>
  console.log(`Successfully connected to DATABASE 4`)
);

export { connection1, connection2, connection3, connection4 };

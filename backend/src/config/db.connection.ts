import mongoose from "mongoose";

const databaseUrl =
  process.env.DATABASE_URL ?? "mongodb://localhost:27017/organicdb";

console.log(process.env.DATABASE_URL);
const connectDB = async () => {
  await mongoose.connect(databaseUrl);
  console.log("DB Connection Successful");
};

export { connectDB };

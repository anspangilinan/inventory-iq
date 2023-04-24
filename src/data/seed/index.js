import mongoose from "mongoose";
import { UserSeeder } from "./strategies/user.seed";
import { EquipmentSeeder } from "./strategies/equipment.seed";

console.log({
  MONGODB_URL: process.env.MONGODB_URL,
  MONGODB_NAME: process.env.MONGODB_NAME,
});
mongoose.connect(process.env.MONGODB_URL, {
  dbName: process.env.MONGODB_NAME,
  ssl: false,
  sslValidate: false,
});

const db = mongoose.connection;

db.on("error", (err) => {
  console.error({ err });
});
db.on("connected", (err, res) => {
  console.log("\n\n");
  console.log("Seeding MongoDB Documents...");
  const seeders = [UserSeeder, EquipmentSeeder];
  let seedCalls = seeders.map((seeder) => {
    return new Promise((resolve) => {
      seeder.seed(resolve);
    });
  });

  Promise.all(seedCalls).then(() => {
    console.log("Done...");
    console.log("\n\n");
    process.exit();
  });
});

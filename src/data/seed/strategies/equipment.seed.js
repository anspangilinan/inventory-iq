import Equipment from "../../models/equipment";
import EquipmentCategory from "../../models/equipmentCategory";
import ballsJson from "./json/equipment/balls.json";
import gearJson from "./json/equipment/gear.json";
import netsJson from "./json/equipment/nets.json";
import racketsJson from "./json/equipment/rackets.json";
import technologyJson from "./json/equipment/technology.json";

// prettier-ignore
const categorySeeds = [
  {
    "name": "Balls",
    "description": "This category includes various types of balls used in different sports. Balls are typically made of rubber, leather, or synthetic materials, and are designed for specific sports, such as soccer, basketball, or volleyball.",
    "equipments": ballsJson
  },
  {
    "name": "Gear",
    "description": "This category includes a wide range of equipment used in various sports. Gear can include things like helmets, pads, gloves, shoes, and other protective or specialized equipment.",
    "equipments": gearJson
  },
  {
    "name": "Nets",
    "description": "This category includes various types of nets used in different sports, such as basketball nets, volleyball nets, tennis nets, and soccer nets. Nets are typically made of mesh or other materials that allow for the passage of a ball or other object.",
    "equipments": netsJson
  },
  {
    "name": "Rackets",
    "description": "This category includes various types of rackets used in different sports, such as tennis, badminton, squash, and racquetball. Rackets are typically made of lightweight materials like graphite or aluminum.",
    "equipments": racketsJson
  },
  {
    "name": "Technology",
    "description": "This category includes various types of technology used in sports, such as heart rate monitors, GPS watches, fitness trackers, and other devices that can help athletes track their performance and health metrics.",
    "equipments": technologyJson
  }
]

class EquipmentSeeder {
  static async seed(resolve) {
    await EquipmentSeeder.backward();
    let equipmentsCount = 0;
    for (const { name, description, equipments } of categorySeeds) {
      const category = await EquipmentCategory.create({ name, description });
      equipmentsCount += equipments.length;
      for (const equipment of equipments) {
        await Equipment.create({
          category,
          ...equipment,
        });
      }
    }
    console.log(
      `Upserted ${categorySeeds.length} EquipmentCategory documents.`
    );
    console.log(`Upserted ${equipmentsCount} Equipment documents.`);
    resolve();
  }

  static async backward(resolve = null) {
    const categoryNames = categorySeeds.map(({ name }) => name);
    await EquipmentCategory.deleteMany({ name: { $in: categoryNames } });
    const equipmentNames = categorySeeds
      .map(({ equipments }) => equipments.map(({ name }) => name))
      .flat();
    await EquipmentCategory.deleteMany({ name: { $in: categoryNames } });
    await Equipment.deleteMany({ name: { $in: equipmentNames } });
    resolve && resolve();
  }
}

export { EquipmentSeeder };

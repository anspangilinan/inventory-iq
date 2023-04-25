import Equipment from "../../models/equipment";
import EquipmentCategory from "../../models/equipmentCategory";
import ballsJson from "./json/equipment/balls.json";
import gearJson from "./json/equipment/gear.json";
import netsJson from "./json/equipment/nets.json";
import racketsJson from "./json/equipment/rackets.json";
import technologyJson from "./json/equipment/technology.json";

const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

// prettier-ignore
const categorySeeds = [
  {
    "name": "Balls",
    "slug": "balls",
    "description": "This category includes various types of balls used in different sports. Balls are typically made of rubber, leather, or synthetic materials, and are designed for specific sports, such as soccer, basketball, or volleyball.",
    "icon": "fa-basketball",
    "equipments": ballsJson
  },
  {
    "name": "Gear",
    "slug": "gear",
    "description": "This category includes a wide range of equipment used in various sports. Gear can include things like helmets, pads, gloves, shoes, and other protective or specialized equipment.",
    "icon": "fa-helmet-un",
    "equipments": gearJson
  },
  {
    "name": "Nets",
    "slug": "nets",
    "description": "This category includes various types of nets used in different sports, such as basketball nets, volleyball nets, tennis nets, and soccer nets. Nets are typically made of mesh or other materials that allow for the passage of a ball or other object.",
    "icon": "fa-table-cells",
    "equipments": netsJson
  },
  {
    "name": "Rackets",
    "slug": "rackets",
    "description": "This category includes various types of rackets used in different sports, such as tennis, badminton, squash, and racquetball. Rackets are typically made of lightweight materials like graphite or aluminum.",
    "icon": "fa-table-tennis-paddle-ball",
    "equipments": racketsJson
  },
  {
    "name": "Technology",
    "slug": "technology",
    "description": "This category includes various types of technology used in sports, such as heart rate monitors, GPS watches, fitness trackers, and other devices that can help athletes track their performance and health metrics.",
    "icon": "fa-diagram-project",
    "equipments": technologyJson
  }
]

class EquipmentSeeder {
  static async seed(resolve) {
    await EquipmentSeeder.backward();
    let equipmentsCount = 0;
    for (const categorySeed of categorySeeds) {
      const { name, description, icon, slug } = categorySeed;
      const category = await EquipmentCategory.create({
        name,
        description,
        icon,
        slug,
      });
      equipmentsCount += categorySeed.equipments.length;
      for (const equipment of categorySeed.equipments) {
        await Equipment.create({
          category,
          ...equipment,
          slug: slugify(equipment.name),
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

import User from "../../models/user";
const userSeeds = [
  {
    firstName: "Fyodor",
    lastName: "Karamazov",
    grade: 11,
    section: "Mitya",
    email: "superadmin@sample.com",
    password: "superadmin",
    role: "admin",
  },
  {
    firstName: "Mitya",
    lastName: "Karamazov",
    grade: 12,
    section: "Kolya",
    email: "student-1@sample.com",
    password: "student-1",
    role: "student",
  },
  {
    firstName: "Vanya",
    lastName: "Karamazov",
    grade: 11,
    section: "Aglaya",
    email: "student-2@sample.com",
    password: "student-2",
    role: "student",
  },
  {
    firstName: "Alyosha",
    lastName: "Karamazov",
    grade: 12,
    section: "Tikhon",
    email: "student-3@sample.com",
    password: "student-3",
    role: "student",
  },
  {
    firstName: "Pavel",
    lastName: "Karamazov",
    grade: 11,
    section: "Kalganov",
    email: "student-4@sample.com",
    password: "student-4",
    role: "student",
  },
];

class UserSeeder {
  static async seed(resolve) {
    await UserSeeder.backward();
    for (const userSeed of userSeeds) {
      await User.create(userSeed);
    }
    console.log(`Upserted ${userSeeds.length} User documents.`);
    resolve();
  }

  static async backward(resolve = null) {
    const userEmails = userSeeds.map((userSeed) => {
      return userSeed.email;
    });
    await User.deleteMany({ email: { $in: userEmails } });
    resolve && resolve();
  }
}

export { UserSeeder };

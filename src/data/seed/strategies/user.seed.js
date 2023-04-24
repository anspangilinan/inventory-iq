import User from "../../models/user";
const userSeeds = [
  {
    firstName: "Fyodor",
    lastName: "Karamazov",
    email: "superadmin@sample.com",
    grade: 11,
    section: "Mitya",
    password: "superadmin",
  },
  {
    firstName: "Mitya",
    lastName: "Karamazov",
    email: "student-1@sample.com",
    grade: 12,
    section: "Kolya",
    password: "student-1",
  },
  {
    firstName: "Vanya",
    lastName: "Karamazov",
    email: "student-2@sample.com",
    grade: 11,
    section: "Aglaya",
    password: "student-2",
  },
  {
    firstName: "Alyosha",
    lastName: "Karamazov",
    email: "student-3@sample.com",
    grade: 12,
    section: "Tikhon",
    password: "student-3",
  },
  {
    firstName: "Pavel",
    lastName: "Karamazov",
    email: "student-4@sample.com",
    grade: 11,
    section: "Kalganov",
    password: "student-4",
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

import sequelize from "./db/database.js"; 
import { User, Profile } from "./models/user.js";

try {

  const result = await sequelize.sync();
  // console.log(result);

  const profile = await Profile.create({ bio: 'test' });
  const user = await User.create({ username: 'joe' });
  await user.setProfile(profile);
  console.log("User and profile created and associated!");

} catch (error) {
  console.error("Unable to connect to the database:", error);
}

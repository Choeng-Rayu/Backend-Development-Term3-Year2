# EXERCISE 1 – Fix Broken Sequelize Relationship Codes

Your goal in the following questions is to diagnose and correct common Sequelize relationship mistakes.

---

## Q1 - Broken Code 1

```js
User.hasOne(Profile);
await sequelize.sync();

const profile = await Profile.create({ bio: 'Test' });
const user = await profile.createUser({ username: 'joe' });
```

**Problem:**
- The code tries to call `profile.createUser()`, which implies that `Profile` is the parent and `User` belongs to it. However, `User.hasOne(Profile)` means the foreign key is in the `Profile` table, and the correct association method is `user.createProfile()`.

**Fix:**
- Add `Profile.belongsTo(User)` to define the reverse relationship.
- Create the `User` first, then use `user.createProfile()` to associate a `Profile` with that `User`.

**Corrected Code:**
```js
User.hasOne(Profile);
Profile.belongsTo(User); // Define the reverse relationship
await sequelize.sync();

const user = await User.create({ username: 'joe' });
const profile = await user.createProfile({ bio: 'Test' });
```

---

## Q2 - Broken Code 2

```js
Book.hasMany(Author);
await sequelize.sync();
const author = await Author.create({ name: 'Samnang' });
const book = await author.createBook({ title: 'Wrong Way' });
```

**Problem:**
- `author.createBook()` implies that `Author` is the parent and creates `Book` instances, but the code defines `Book.hasMany(Author)`, which is the reverse of the intended relationship.

**Fix:**
- Reverse the relationship: use `Author.hasMany(Book)` and `Book.belongsTo(Author)` to indicate an author can have many books.

**Corrected Code:**
```js
Author.hasMany(Book);
Book.belongsTo(Author);
await sequelize.sync();

const author = await Author.create({ name: 'Samnang' });
const book = await author.createBook({ title: 'Wrong Way' });
```

---

## Q3 - Broken Code 3

```js
User.hasOne(Profile);
Profile.belongsTo(User);

const user = await User.create({ username: 'Jon' });
const profile = await Profile.create({ bio: 'hello' });

await user.addProfile(profile);
```

**Problem:**
- In a one-to-one relationship, Sequelize uses `setProfile()` to associate a profile with a user, not `addProfile()`. The `addProfile()` method is for one-to-many or many-to-many relationships.

**Fix:**
- Replace `user.addProfile(profile)` with `user.setProfile(profile)`.

**Corrected Code:**
```js
await user.setProfile(profile);
```

---

## Q4 - Broken Code 4

```js
Employee.hasOne(Manager);
Manager.hasOne(Employee);
```

**Problem:**
- This does not represent a real-world manager-employee relationship. Typically, a manager is an employee who manages other employees, which is a hierarchical (self-referential) relationship.

**Fix:**
- Use `Employee.belongsTo(Manager)` and `Manager.hasMany(Employee)` to model the hierarchy.

**Corrected Code:**
```js
Employee.belongsTo(Manager);
Manager.hasMany(Employee);
```


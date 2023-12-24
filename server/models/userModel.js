const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    default: null,
  },
  phone: {
    type: String,
    default: null,
  },
  age: {
    type: Number,
    default: null,
  },
  height: {
    type: Number,
    default: null,
  },
  weight: {
    type: Number,
    default: null,
  },
  gender: {
    type: String,
    default: null,
  },
  fitnessLevel: {
    type: String,
    default: null,
  },
  achievements: {
    type: [String],
    default: [],
  },
  friendsList: {
    type: [Schema.Types.ObjectId],
    default: [],
  },
  chatHistory: {
    type: [Schema.Types.ObjectId],
    default: [],
  },
  lastLogin: {
    day: {
      type: Number,
      required: true,
    },
    date: {
      type: Number,
      required: true,
    },
    month: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
  },
  streak: {
    type: Number,
    default: 1,
  },
});

userSchema.statics.signup = async function (name, email, password) {
  const currentDate = new Date();
  const userStreakData = {
    day: currentDate.getDay(),
    date: currentDate.getDate(),
    month: currentDate.getMonth(),
    year: currentDate.getFullYear(),
  };

  if (!name || !email || !password) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    name,
    email,
    password: hash,
    lastLogin: userStreakData,
    streak: 1,
  });

  return user;
};

userSchema.statics.login = async function (email, password) {
  const currentDate = new Date();
  const userStreakData = {
    day: currentDate.getDay(),
    date: currentDate.getDate(),
    month: currentDate.getMonth(),
    year: currentDate.getFullYear(),
  };

  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }

  const lastLogin = user.lastLogin;
  if (
    userStreakData.year !== lastLogin.year ||
    userStreakData.month !== lastLogin.month ||
    userStreakData.date !== lastLogin.date
  ) {
    user.streak = 1;
  } else {
    if (
      userStreakData.day !== (lastLogin.day + 1) % 7 ||
      userStreakData.date !== lastLogin.date + 1
    ) {
      user.streak = 1;
    } else {
      user.streak++;
    }
  }

  user.lastLogin = userStreakData;
  user.save();

  return user;
};

module.exports = mongoose.model("User", userSchema);

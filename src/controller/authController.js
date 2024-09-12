const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = new PrismaClient();
const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: hashPassword,
      },
    });

    res.json(user);
  } catch (err) {
    console.log(err);
    res.json({ error: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  const decrypt = await bcrypt.compare(password, user.password);
  if (!user || !decrypt) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
    expiresIn: "1h",
  });
  res.json({ token });
};

module.exports = {
  register,
  login,
};

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createData = async (req, res) => {
  try {
    const { kouta, kouta_asign } = req.body;
    const data = await prisma.data.create({
      data: {
        kouta,
        kouta_asign,
      },
    });

    res.json({
      status: 200,
      message: "Data created successfully",
      data: data,
    });
  } catch (err) {
    console.log(err);
    res.json({ error: err.message });
  }
};

const getAllData = async (req, res) => {
  try {
    const data = await prisma.data.findMany();

    res.json({
      status: 200,
      message: "Data created successfully",
      data: data,
    });
  } catch (err) {
    console.log(err);
    req.json({ error: err.message });
  }
};

module.exports = {
  createData,
  getAllData,
};

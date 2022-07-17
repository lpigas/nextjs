const { connectToDatabase } = require("../../lib/mongodb");
const ObjectId = require("mongodb").ObjectId;
async function getCurs(req, res) {
  try {
    // connect to the database
    let { db } = await connectToDatabase();
    // fetch the posts
    let product = await db.collection("Curs").find({}).toArray();
    // return the posts
    return res.json({
      message: JSON.parse(JSON.stringify(product)),
      success: true,
    });
  } catch (error) {
    // return the error
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}

async function updateCurs(req, res) {
  try {
    // connect to the database
    let { db } = await connectToDatabase();

    // update the published status of the post
    await db.collection("Curs").updateOne(
      {
        _id: new ObjectId(JSON.parse(req.body)._id),
      },
      { $set: { curs: JSON.parse(req.body).curs } }
    );

    // return a message
    return res.json({
      message: "Product updated successfully",
      success: true,
    });
  } catch (error) {
    // return an error
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}

export default async function handler(req, res) {
  // switch the methods
  switch (req.method) {
    case "GET": {
      return getCurs(req, res);
    }
    case "PUT": {
      return updateCurs(req, res);
    }

  }
}

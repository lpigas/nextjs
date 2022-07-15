const { connectToDatabase } = require("../../lib/mongodb");

async function getProduct(req, res) {
  try {
    // connect to the database
    let { db } = await connectToDatabase();
    // fetch the posts
    let product = await db.collection("productdata").find({}).toArray();
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
async function addProduct(req, res) {
  try {
    // connect to the database
    let { db } = await connectToDatabase();
    // add the post
    await db.collection("productdata").insertOne(JSON.parse(req.body));
    // return a message
    return res.json({
      message: "Product added successfully",
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
async function updateProductData(req, res) {
  try {
    // connect to the database
    let { db } = await connectToDatabase();

    // update the published status of the post
    await db.collection("productdata").updateOne(
      {
        _id: JSON.parse(req.body).postId,
      },
      { $set: { name_product: JSON.parse(req.body).name_product } }
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
async function deleteProduct(req, res) {
  try {
    // connect to the database
    let { db } = await connectToDatabase();

    // update the published status of the post
    await db.collection("productdata").deleteOne({
      _id: req.body,
    });

    // return a message
    return res.json({
      message: "Post delete successfully",
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
      return getProduct(req, res);
    }

    case "POST": {
      return addProduct(req, res);
    }

    case "PUT": {
      return updateProductData(req, res);
    }

    case "DELETE": {
      return deleteProduct(req, res);
    }
  }
}

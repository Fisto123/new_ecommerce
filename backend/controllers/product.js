import Product from "../models/product.js";
export const createProduct = async (req, res) => {
  try {
    const { name, image, desc, price, brand } = req.body;
    console.log(req.body.name);
    const products = new Product({
      name,
      brand,
      desc,
      price,
      image,
    });
    const savedProduct = await products.save();
    return res.status(200).send(savedProduct);
  } catch (error) {
    console.log(error);
  }
};
export const getProduct = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).send(products);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const deleteProductById = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).send("Product has been deleted...");
  } catch (error) {
    res.status(500).send(error);
  }
};
export const UpdateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).send(updatedProduct);
  } catch (error) {
    res.status(500).send(error);
  }
};

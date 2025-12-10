import Product from '../model/productModel.js';

const addProdcut = async (req, res) => {
    try {
        const { name, price, category, inStock } = req.body;

        const userId = req.user?.id;
        console.log(userId);

        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized: No user ID found" });
        }

        const newProduct = new Product({
            name, price, category, inStock,
            owner: userId,
        });

        const product = await newProduct.save();
        res.status(201).json({ success: true, message: "product added successfully" });
        console.log("product added successfully");

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }

}


const allProduct = async (req, res) => {

    try {

        const products = await Product.find().populate("owner");
        res.json({ success: true, products });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}


const singleproduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        console.log("product:", req.params.id);

        if (!product) {
            return res.status(404).json({ message: "no product" });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteproduct = async (req, res) => {
    try {
        console.log("Deleting product ID:", req.params.deleteId);

        await Product.findByIdAndDelete(req.params.deleteId);

        res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });

    }

}

const editproduct = async (req, res) => {
    try {
        const { editId } = req.params;
        const userId = req.user.id;
        console.log(userId);

        console.log("Editing product with ID:", editId);

        const { name, price, category, inStock } = req.body;


        const product = await Product.findById(editId);
        if (!product) {
            return res.status(404).json({ success: false, message: "product not found" });
        }


        if (req.user && product.owner && req.user.id.toString() !== product.owner.toString()) {
            return res.status(403).json({ success: false, message: "Unauthorized user" });
        }

        product.name = name || product.name;
        product.price = price || product.price;
        product.category = category || product.category;
        product.inStock = inStock || product.inStock

        await product.save();

        res.status(200).json({
            success: true,
            message: "product updated successfully",
            product,
        });
    } catch (error) {
        console.error("Error updating listing:", error);
        res.status(500).json({
            success: false,
            message: error,
        });
    }
};



export { addProdcut, allProduct, singleproduct, deleteproduct, editproduct };
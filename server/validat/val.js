const Validate = {
    string: (value) => typeof value === 'string' && value.trim() !== '',
    number: (value, { min }) => typeof value === 'number' && value >= min
  };



  const createCategory = async (req, res) => {
    try {
        const { name, description, price } = req.body;

        // Validate inputs
        const valid = {
            name: Validate.string(name),
            price: Validate.number(price, { min: 0 }),
            description: Validate.string(description),
        };

        // Check if all validations passed
        if (!valid.name || !valid.price || !valid.description) {
            return res.status(400).json({ message: "Invalid input data" });
        }

        // Handle file upload (if applicable)
        const images = req.files && Array.isArray(req.files) 
            ? req.files.map(file => file.path)
            : []; // Default to an empty array if no files are uploaded

        // Check if the category already exists
        const category = await CategoryModel.findOne({ name });
        if (category) {
            return res.status(400).json({ message: "Category name already exists" });
        }

        // Create and save the new category
        const newCategory = new CategoryModel({ name, description, price, images });
        await newCategory.save();

        res.status(201).json(newCategory); // 201 Created status code
    } catch (error) {
        res.status(500).json({ message: `Error: ${error.message}` });
    }
};
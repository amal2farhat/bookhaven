import { Router } from 'express';
const router = Router();
import Category, { find } from '../models/Category';

// GET all categories
router.get('/', async (req, res) => {
  try {
    const categories = await find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new category
router.post('/', async (req, res) => {
  const category = new Category({
    name: req.body.name
  });

  try {
    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;

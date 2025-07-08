const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// POST /api/contact
router.post('/', async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;
        const newContact = new Contact({ name, email, phone, message });
        await newContact.save();
        res.status(201).json({ message: 'Contact saved' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /api/contact
router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

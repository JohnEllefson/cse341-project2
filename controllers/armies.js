'use strict';

// Import the required modules
const Army = require('../models/army.model');

/**
 * @swagger
 * /armies:
 *   get:
 *     summary: Get all armies
 *     description: Retrieve all armies in the database.
 *     responses:
 *       200:
 *         description: A list of armies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Army'
 *       404:
 *         description: No armies found
 */
const getAll = async (_req, res) => {
  try {
    const armies = await Army.find();
    if (!armies || armies.length === 0) {
      return res.status(404).json({ message: 'No armies found in database' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(armies);
  } catch (error) {
    res.status(400).json({ message: 'Failed to get armies', error: error.message });
  }
};

/**
 * @swagger
 * /armies/{id}:
 *   get:
 *     summary: Get a single army by ID
 *     description: Retrieve a single army by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The army's ID
 *     responses:
 *       200:
 *         description: A single army
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Army'
 *       404:
 *         description: Army not found
 */
const getSingle = async (req, res) => {
  try {
    const army = await Army.findById(req.params.id).populate('general').populate('wave');
    if (!army) {
      return res.status(404).json({ message: 'Army not found' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(army);
  } catch (error) {
    res.status(400).json({ message: 'Failed to get army', error: error.message });
  }
};

/**
 * @swagger
 * /armies:
 *   post:
 *     summary: Create a new army
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Army'
 *     responses:
 *       201:
 *         description: Army created
 *       400:
 *         description: Bad request
 */
const createSingle = async (req, res) => {
  const army = new Army({
    name: req.body.name,
    type: req.body.type,
    general: req.body.general,
    attack: req.body.attack,
    defense: req.body.defense,
    move: req.body.move,
    range: req.body.range,
    life: req.body.life,
    cost: req.body.cost,
    specialPowers: req.body.specialPowers,
    class: req.body.class,
    species: req.body.species,
    personality: req.body.personality,
    size: req.body.size,
    height: req.body.height,
    url: req.body.url,
    wave: req.body.wave
  });

  try {
    await army.save();
    res.setHeader('Content-Type', 'application/json');
    res.status(201).json({ message: 'New army added', id: army._id });
  } catch (error) {
    res.status(400).json({ message: 'Failed to create army', error: error.message });
  }
};

/**
 * @swagger
 * /armies/{id}:
 *   delete:
 *     summary: Delete an army by ID
 *     description: Delete a single army by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The army's ID
 *     responses:
 *       200:
 *         description: Army deleted
 *       404:
 *         description: Army not found
 */
const deleteSingle = async (req, res) => {
  try {
    const army = await Army.findByIdAndDelete(req.params.id);
    if (!army) {
      return res.status(404).json({ message: 'Army not found' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ message: 'Army deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Failed to delete army', error: error.message });
  }
};

/**
 * @swagger
 * /armies/{id}:
 *   put:
 *     summary: Update an existing army
 *     description: Update an army by its ID. The request body must include the full army object with updated fields.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the army to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Army'
 *           example:
 *             name: "Updated Army Name"
 *             type: "Unique Hero"
 *             general: "60af924b3c9c320015a7a2a7"
 *             attack: 5
 *             defense: 3
 *             move: 4
 *             range: 2
 *             life: 6
 *             cost: 100
 *             specialPowers: "Updated special power description"
 *             class: "Warrior"
 *             species: "Human"
 *             personality: "Valiant"
 *             size: "Medium"
 *             height: 5
 *             url: "https://example.com/updated-army"
 *             wave: "60af924b3c9c320015a7a2a9"
 *     responses:
 *       200:
 *         description: Army updated successfully
 *       404:
 *         description: Army not found
 *       400:
 *         description: Invalid data provided
 */

const updateSingle = async (req, res) => {
  try {
    // Create an Army object to force swagger-autogen to generate the request body
    const army = new Army({
      name: req.body.name,
      type: req.body.type,
      general: req.body.general,
      attack: req.body.attack,
      defense: req.body.defense,
      move: req.body.move,
      range: req.body.range,
      life: req.body.life,
      cost: req.body.cost,
      specialPowers: req.body.specialPowers,
      class: req.body.class,
      species: req.body.species,
      personality: req.body.personality,
      size: req.body.size,
      height: req.body.height,
      url: req.body.url,
      wave: req.body.wave
    });

    // Convert Army object to a plain JavaScript object (removes Mongoose features)
    const armyObject = army.toObject();

    // Remove _id to prevent MongoDB error
    delete armyObject._id;

    // Update the existing army in the database
    const returnArmy = await Army.findByIdAndUpdate(req.params.id, armyObject, {
      new: true,
      runValidators: true
    });

    if (!returnArmy) {
      return res.status(404).json({ message: 'Army not found' });
    }

    res.status(200).json(returnArmy);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update army', error: error.message });
  }
};

module.exports = { getAll, getSingle, createSingle, deleteSingle, updateSingle };

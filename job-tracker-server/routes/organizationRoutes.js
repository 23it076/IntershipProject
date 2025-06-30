const express = require('express');
const router = express.Router();
const Organization = require('../models/Organization');

/**
 * @swagger
 * tags:
 *   name: Organizations
 *   description: Organization management
 */

/**
 * @swagger
 * /api/organizations:
 *   post:
 *     summary: Create a new organization
 *     tags: [Organizations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Organization created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', async (req, res) => {
  try {
    const org = new Organization(req.body);
    await org.save();
    res.status(201).send(org);
  } catch (err) {
    res.status(400).send(err);
  }
});

/**
 * @swagger
 * /api/organizations:
 *   get:
 *     summary: Get all organizations
 *     tags: [Organizations]
 *     responses:
 *       200:
 *         description: List of organizations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 */
router.get('/', async (req, res) => {
  const orgs = await Organization.find();
  res.send(orgs);
});

module.exports = router;

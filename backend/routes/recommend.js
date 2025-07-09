const express = require("express")
const router = express.Router()
const recommendController = require("../controllers/recommendController")

// POST /api/recommend - Get neighborhood recommendations
router.post("/recommend", recommendController.getRecommendations)

// GET /api/neighborhoods - Get all neighborhoods
router.get("/neighborhoods", recommendController.getAllNeighborhoods)

// POST /api/neighborhoods - Add new neighborhood
router.post("/neighborhoods", recommendController.addNeighborhood)

// PUT /api/neighborhoods/:id - Update neighborhood
router.put("/neighborhoods/:id", recommendController.updateNeighborhood)

// DELETE /api/neighborhoods/:id - Delete neighborhood
router.delete("/neighborhoods/:id", recommendController.deleteNeighborhood)

module.exports = router

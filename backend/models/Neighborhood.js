const mongoose = require("mongoose")

const neighborhoodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
    index: true,
  },
  state: {
    type: String,
    required: true,
  },
  tags: [
    {
      type: String,
      required: true,
    },
  ],
  description: {
    type: String,
    required: true,
  },
  avgRent: {
    type: String,
    required: true,
  },
  rentValue: {
    type: Number,
    required: true,
  },
  safetyScore: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
  },
  connectivity: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
  },
  keyFeatures: [
    {
      type: String,
    },
  ],
  coordinates: {
    latitude: Number,
    longitude: Number,
  },
  amenities: [
    {
      type: String,
    },
  ],
  nearbyPlaces: [
    {
      name: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      distance: {
        type: String,
        required: true,
      },
    },
  ],
  images: [
    {
      url: String,
      caption: String,
    },
  ],
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

// Index for better search performance
neighborhoodSchema.index({ city: 1, tags: 1 })
neighborhoodSchema.index({ rentValue: 1 })
neighborhoodSchema.index({ safetyScore: 1, connectivity: 1 })

// Update the updatedAt field before saving
neighborhoodSchema.pre("save", function (next) {
  this.updatedAt = Date.now()
  next()
})

module.exports = mongoose.model("Neighborhood", neighborhoodSchema)

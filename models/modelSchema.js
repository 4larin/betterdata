const mongoose = require('mongoose')
const modelSchema = new mongoose.Schema({
  batchSize: {
    type: Number
  },
  trainingCycle: {
    type: Number
  },
  syntheticData: {
    type: Array
  },
})

const model = mongoose.model("Model", modelSchema, "model")

module.exports = { Model: model }
const cloudinary = require('../cloudinary')
const upload = require('../utils/multer')
const { Model } = require('../models/modelSchema')
const { v4: uuidv4 } = require('uuid');


let createSyntheticDataService = async ({ file, params }, callback) => {
    let { url } = await cloudinary.uploader.upload(file.path, { resource_type: "auto", format: 'csv' },)

    let syntheticData = { syntheticDataId: uuidv4(), url, fileName: file.originalname }
    Model.updateOne({ _id: params.modelId }, { $push: { syntheticData: syntheticData } }, (err, success) => {
        if (err) {
            return callback({ status: 400, success: false, message: err })
        }

        if (success.modifiedCount === 0) {
            return callback({ status: 400, success: false, message: "Model or synthetic not found and synthetic data not created" })
        }

        return callback({ status: 200, success: true, message: "Synthetic data Successfully created", data: { syntheticData } })
    })
}

let deleteSyntheticDataService = (params, callback) => {
    Model.updateOne({ _id: params.modelId }, { $pull: { syntheticData: { syntheticDataId: params.syntheticDataId } } }, (err, success) => {
        if (err) {
            return callback({ status: 400, success: false, message: err })
        }

        if (success.modifiedCount === 0) {
            return callback({ status: 400, success: false, message: "Model or synthetic data not found and synthetic data not deleted" })
        }

        return callback({ status: 200, success: true, message: "Synthetic data Successfully deleted", data: { success } })
    })
}

module.exports = { createSyntheticDataService, deleteSyntheticDataService }
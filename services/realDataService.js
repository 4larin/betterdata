const cloudinary = require('../cloudinary')
const { Project } = require('../models/project')
const { v4: uuidv4 } = require('uuid');

let createRealDataService = async ({ file, params }, callback) => {
    let { url } = await cloudinary.uploader.upload(file.path, { resource_type: "auto", format: 'csv' },)

    let realData = { realDataId: uuidv4(), url, fileName: file.originalname }

    Project.updateOne({ _id: params.projectId }, { $push: { realData } }, (err, result) => {
        if (err) {
            return callback({ status: 400, success: false, message: err })
        }

        if (result.modifiedCount === 0) {
            return callback({ status: 400, success: false, message: "Project not found" })
        }

        return callback({ status: 200, success: true, message: "Real Data Successfully added", data: { realData } })
    })
}

let updateRealDataService = ({ params, body }, callback) => {
    Project.updateOne({ _id: params.projectId, realData: { $elemMatch: { realDataId: params.realDataId } } }, { $set: { "realData.$.fileName": body.fileName } }, async (err, success) => {

        if (err) {
            return callback({ status: 400, success: false, message: err })
        }

        if (success.modifiedCount === 0) {
            return callback({ status: 400, success: false, message: "Project or Data not found and real data not Created" })
        }

        return callback({ status: 200, success: true, message: "Real Data Successfully Updated", data: {} })
    })
}

let deleteRealDataService = (params, callback) => {
    Project.updateOne({ _id: params.projectId }, { $pull: { realData: { realDataId: params.realDataId } } }, async (err, success) => {
        if (err) {
            return callback({ status: 400, success: false, message: err })
        }

        if (success.modifiedCount === 0) {
            return callback({ success: false, message: "Project or Data not found and real data not Deleted" })
        }

        return callback({ status: 200, success: true, message: "Real data Successfully Deleted", data: {} })
    })
}

module.exports = { createRealDataService, updateRealDataService, deleteRealDataService }
const { Model } = require("../models/modelSchema")
const { Project } = require("../models/project")
const { queryConstructor } = require("../utils")
const mongoose = require('mongoose')

let createModelService = ({ params, body }, callback) => {
    let model = new Model(body)
    Project.updateOne({ _id: params.projectId }, { $push: { model: { modelId: model._id, name: body.name } } }, async (err, success) => {
        if (err) {
            return callback({ status: 400, success: false, message: err })
        }

        if (success.modifiedCount === 0) {
            return callback({ status: 400, success: false, message: "Project not found and model not Created" })
        }
        await model.save()
        return callback({ status: 200, success: true, message: "Model successfully created", data: model })
    })
}

let getModelService = async (query, callback) => {
    let { limit, skip, params, error, sort } = queryConstructor(query, "createdAt", "Model")

    if (error) {
        return callback({ status: 400, success: false, message: error.error })
    }

    let model = await Model.find({ ...params }).skip(skip).limit(limit).sort(sort)
    let totalDocument = await Model.find({ ...params }).countDocuments()

    if (model.length === 0) {
        return callback({ status: 400, success: false, message: "Model not found" })
    }

    return callback({ status: 200, success: true, message: "Model Successfully Fetched", data: { totalDocument, model } })
}

let updateModelService = ({ params, body }, callback) => {
    Project.updateOne({ _id: params.projectId, model: { $elemMatch: { modelId: mongoose.Types.ObjectId(params.modelId) } } }, { $set: { "model.$.name": body.name } }, async (err, success) => {

        if (err) {
            return callback({ status: 400, success: false, message: err })
        }

        if (success.modifiedCount === 0) {
            return callback({ status: 400, success: false, message: "Project/model not found and model not updated" })
        }

        return callback({ status: 200, success: true, message: "Model Successfully updated", data: {} })
    })
}

let deleteModelService = (params, callback) => {
    Project.updateOne({ _id: params.projectId }, { $pull: { model: { modelId: mongoose.Types.ObjectId(params.modelId) } } }, async (err, success) => {
        if (err) {
            return callback({ status: 400, success: false, message: err })
        }

        if (success.modifiedCount === 0) {
            return callback({ status: 400, success: false, message: "Project not found and model not Deleted" })
        }

        await Model.deleteOne({ _id: params.modelId })

        return callback({ status: 200, success: true, message: "Model Successfully Deleted", data: {} })
    })
}

module.exports = { createModelService, getModelService, updateModelService, deleteModelService }
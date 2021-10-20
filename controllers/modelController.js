const { createModelService, getModelService, updateModelService, deleteModelService } = require("../services/modelService")

let createModelController = async (req, res) => {
    try {
        await createModelService({ params: req.params, body: req.body }, (result) => {
            return res.status(result.status).json({ status: result.status, success: result.success, message: result.message, data: result.data })
        })
    } catch (err) {
        return res.status(400).json({ err: err.message })
    }
}

let getModelController = async (req, res) => {
    try {
        await getModelService(req.query, (result) => {
            return res.status(result.status).json({ status: result.status, success: result.success, message: result.message, data: result.data })
        })
    } catch (err) {
        return res.status(400).json({ err: err.message })
    }
}

let updateModelController = async (req, res) => {
    try {
        await updateModelService({ params: req.params, body: req.body }, (result) => {
            return res.status(result.status).json({ status: result.status, success: result.success, message: result.message, data: {} })
        })
    } catch (err) {
        return res.status(400).json({ err: err.message })
    }
}

let deleteModelController = async (req, res) => {
    try {
        await deleteModelService(req.params, (result) => {
            return res.status(result.status).json({ status: result.status, success: result.success, message: result.message, data: {} })
        })
    } catch (err) {
        return res.status(400).json({ err: err.message })
    }
}

module.exports = { createModelController, getModelController, updateModelController, deleteModelController }
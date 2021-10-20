const { createSyntheticDataService, deleteSyntheticDataService } = require("../services/syntheticDataService")


let createSyntheticDataController = async (req, res) => {
    try {
        await createSyntheticDataService({ params: req.params, file: req.file }, (result) => {
            return res.status(result.status).json({ status: result.status, success: result.success, message: result.message, data: result.data })
        })
    } catch (err) {
        return res.status(400).json({ err: err.message })
    }
}

let deleteSyntheticDataController = async (req, res) => {
    try {
        await deleteSyntheticDataService(req.params, (result) => {
            return res.status(result.status).json({ status: result.status, success: result.success, message: result.message, data: {} })
        })
    } catch (err) {
        return res.status(400).json({ err: err.message })
    }
}

module.exports = { createSyntheticDataController, deleteSyntheticDataController }
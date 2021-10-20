const { createRealDataService, updateRealDataService, deleteRealDataService } = require("../services/realDataService")


const createRealDataController = async (req, res) => {
    try {
        await createRealDataService({ params: req.params, file: req.file }, (result) => {
            return res.status(result.status).json({ status: result.status, success: result.success, message: result.message, data: result.data })
        })
    } catch (err) {
        return res.status(400).json({ err: err.message })
    }
}

let updateRealDataController = async (req, res) => {

    try {
        await updateRealDataService({ params: req.params, body: req.body }, (result) => {
            return res.status(result.status).json({ status: result.status, success: result.success, message: result.message, data: {} })
        })
    } catch (err) {
        return res.status(400).json({ err: err.message })
    }
}

let deleteRealDataController = async (req, res) => {
    try {
        await deleteRealDataService(req.params, (result) => {
            return res.status(result.status).json({ status: result.status, success: result.success, message: result.message, data: {} })
        })
    } catch (err) {
        return res.status(400).json({ err: err.message })
    }
}

module.exports = { createRealDataController, updateRealDataController, deleteRealDataController }
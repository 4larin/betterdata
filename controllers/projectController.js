const { Project } = require("../models/project")
const { queryConstructor } = require("../utils")

let createProjectController = async (req, res) => {
    try {
        let project = new Project(req.body)
        await project.save()

        return res.status(200).json({ status: 200, success: true, message: "Project Successfully created", data: { project } })
    } catch (err) {
        return res.status(400).json({ err: err.message })
    }
}

let getProjectController = async (req, res) => {
    try {
        let { limit, skip, params, error, sort } = queryConstructor(req.query, "createdAt", "Model")

        if (error) {
            return res.status(400).json({ status: 400, success: false, message: error.error })
        }

        let project = await Project.find({ ...params }).skip(skip).limit(limit).sort(sort)
        let totalDocument = await Project.find({ ...params }).countDocuments()

        if (project.length === 0) {
            return res.status(400).json({ status: 400, success: false, message: "Project not found" })
        }

        return res.status(200).json({ status: 200, success: true, message: "Project Successfully Fetched", data: { totalDocument, project } })
    } catch (err) {
        return res.status(400).json({ err: err.message })
    }
}

module.exports = { createProjectController, getProjectController }
const express = require('express')
const Send = require('../middleware/res')
const { Model } = require('../models/modelSchema')
const mongoose = require('mongoose')

const router = express.Router()

const { Project } = require('../models/project')
const { uploadManager } = require('../upload')
const { queryConstructor } = require('../utils')

router.get('/', (req, res) => {
    res.send(Send.success("Projects fetched successfully", 200, [1, 2, 3]))
})

router.post('/create-real-data/:projectId', uploadManager().array("csv", 5), async (req, res) => {
    try {

        await Project.updateOne({ _id: req.params.projectId }, { $push: { realData: req.body.realData } }, (err, result) => {
            if (err) {
                return res.status(400).json({ err: err.message })
            }

            if (result.modified === 0) {
                return res.status(400).json({ success: false, message: "Project not found" })
            }

            res.status(200).json({ status: 200, success: true, data: "Real Data Successfully added" })
        })

    } catch (err) {
        return res.status(400).json({ err: err.message })
    }
})

router.get('/real-data', async (req, res) => {
    try {
        // let realData = await RealData.find()
        // res.status(200).json({ status: 200, success: true, data: realData })
    } catch (err) {
        return res.status(400).json({ err: err.message })
    }
})

router.post('/:projectId/create-model', async (req, res) => {
    try {
        let model = new Model(req.body)
        let project = await Project.findOne({ _id: req.params.projectId })
        project.model.push({ modelId: model._id, name: req.body.name })
        await project.save()
        await model.save()

        res.status(200).json({ status: 200, success: true, message: "Model Successfully Created", data: { model } })
    } catch (err) {
        return res.status(400).json({ err: err.message })
    }
})

router.get('/model', async (req, res) => {
    try {
        let { limit, skip, params, error, sort } = queryConstructor(req.query, "createdAt", "Model")

        if (error) {
            return res.status(400).json({ err: error.error })
        }

        let model = await Model.find({ ...params }).limit(limit).skip(skip).sort(sort)
        let totalDocument = await Model.find({ ...params }).countDocuments()

        if (model.length === 0) {
            return res.status(400).json({ success: false, message: "Model not found" })
        }

        res.status(200).json({ status: 200, success: true, message: "Model Successfully Fetched", data: { totalDocument, model } })
    } catch (err) {
        return res.status(400).json({ err: err.message })
    }
})

router.put('/:projectId/model/:modelId', async (req, res) => {
    try {
        let project = await Project.findOne({ model: { $elemMatch: { modelId: mongoose.Types.ObjectId(req.params.modelId) } } })

        project.model.forEach(async (model) => {
            if (model.modelId == req.params.modelId) {
                model.name = req.body.name
            }
        })

        await Project.updateOne({ _id: req.params.projectId }, { $set: { ...project } })
        res.status(200).json({ status: 200, success: true, message: "Model Successfully Updated", data: { project } })

    } catch (err) {
        return res.status(400).json({ err: err.message })
    }
})

router.delete('/:projectId/model/:modelId', async (req, res) => {
    try {
        let project = await Project.findOne({ model: { $elemMatch: { modelId: mongoose.Types.ObjectId(req.params.modelId) } } })

        project.model.forEach(async (model) => {
            if (model.modelId == req.params.modelId) {
                project.model.splice(project.model.indexOf(model), 1)
            }
        })

        await Model.deleteOne({ _id: req.params.modelId })

        await Project.updateOne({ _id: req.params.projectId }, { $set: { ...project } })
        res.status(200).json({ status: 200, success: true, message: "Model Successfully Deleted", data: { project } })

    } catch (err) {
        return res.status(400).json({ err: err.message })
    }
})

router.post('/create-project', async (req, res) => {
    try {
        let project = new Project(req.body)
        await project.save()

        res.status(200).json({ status: 200, success: true, message: "Project Successfully created", data: { project } })
    } catch (err) {
        return res.status(400).json({ err: err.message })
    }
})

module.exports = router
const mongoose = require('mongoose')
const Joi = require('joi')


const projectSchema = new mongoose.Schema({
    projectName: {
        type: String
    },
    model: {
        type: Array
    },
    realData: {
        type: Array
    }
})

const Project = mongoose.model("Project", projectSchema)

function validate(project) {

}

exports.Project = Project
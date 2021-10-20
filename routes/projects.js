const express = require('express')
const upload = require('../utils/multer')
const Send = require('../middleware/res')
const router = express.Router()

const { createRealDataController, updateRealDataController, deleteRealDataController } = require('../controllers/realDataController')
const { createModelController, getModelController, updateModelController, deleteModelController } = require('../controllers/modelController')
const { createProjectController, getProjectController } = require('../controllers/projectController');
const { createSyntheticDataController, deleteSyntheticDataController } = require('../controllers/syntheticDataController');

router.get('/', (req, res) => {
    res.send(Send.success("Projects fetched successfully", 200, [1, 2, 3]))
})

router.post('/:projectId/create-real-data', upload.single("realData"), createRealDataController)
router.get('/project', getProjectController)
router.put('/:projectId/real-data/:realDataId', updateRealDataController)
router.delete('/:projectId/real-data/:realDataId', deleteRealDataController)
router.post('/:projectId/create-model', createModelController)
router.get('/:projectId/model', getModelController)
router.put('/:projectId/model/:modelId', updateModelController)
router.delete('/:projectId/model/:modelId', deleteModelController)
router.post('/create-project', createProjectController)
router.post('/:modelId/create-synthetic-data', upload.single("syntheticData"), createSyntheticDataController)
router.delete('/:modelId/synthetic-data/:syntheticDataId', deleteSyntheticDataController)

module.exports = router
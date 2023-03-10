import express from 'express';
import controller from '../controllers/ProjectController';

const router = express.Router();

router.post('/api/v1/analyze/framework', controller.ReadProject);

export = router;

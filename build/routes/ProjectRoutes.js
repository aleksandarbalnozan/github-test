"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const ProjectController_1 = __importDefault(require("../controllers/ProjectController"));
const router = express_1.default.Router();
router.post('/api/v1/analyze/framework', ProjectController_1.default.GetRequest);
module.exports = router;

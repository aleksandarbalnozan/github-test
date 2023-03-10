"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ProjectModel_1 = require("../models/ProjectModel");
function GetRequest(req, res, next) {
    const { source, link } = req.body;
    const project = new ProjectModel_1.ProjectModel(source, link);
    return project ? res.status(200).json({ project }) : res.status(400).json({ message: 'Bad request' });
}
exports.default = { GetRequest };

import { NextFunction, Request, Response } from 'express';
import { ProjectModel } from '../models/ProjectModel';
import { downloadRepo } from '../Utils/DownloadRepo';

async function ReadProject(req: Request, res: Response, next: NextFunction) {
    const { source, link } = req.body;
    /** Populate the object with the data */
    const project = new ProjectModel(source, link);

    /** Download the repo */
    await downloadRepo(project.link, './destination.zip');

    return project ? res.status(200).json({ project }) : res.status(400).json({ message: 'Bad request' });
}

export default { ReadProject };

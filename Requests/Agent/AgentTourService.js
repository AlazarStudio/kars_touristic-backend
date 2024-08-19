import * as fs from 'fs';
import * as path from 'path';

import Agent from "./Agent.js";

class AgentService {
    async agent(agentData) {
        const tour = new Agent(agentData);
        await tour.save();
        return tour;
    }

    async getAgents(req) {
        const {
            // page = 1,
            // perPage = 10,
            search = '',
            filter,
            region = ''
        } = req.query;

        const modelFilter = { tourTitle: { $regex: search, $options: 'i' }, region: { $regex: region, $options: 'i' } };
        const totalCount = await Agent.countDocuments(modelFilter).exec();
        const agent = await Agent.find(modelFilter)
            .sort(filter)
            // .limit(perPage)
            // .skip((page - 1) * perPage)
            .exec();

        return { totalCount, agent };
    }

    async updateOneAgent(id, tourData) {
        const updatedTour = await Agent.findByIdAndUpdate(
            id,
            { $set: tourData },
            { new: true, runValidators: true }
        );
        return updatedTour;
    }



    async getOneAgent(id) {
        if (!id) {
            throw new Error("не указан ID");
        }
        const getOneAgent = await Agent.findById(id);
        return getOneAgent;
    }

    async deleteAgent(id) {
        try {
            const tour = await Agent.findById(id);

            if (!tour) {
                throw new Error("не указан ID");
            }

            tour.photos.forEach(photo => {
                const pathToFile = path.resolve('static', photo)
                if (!fs.existsSync(pathToFile)) return;
                fs.unlinkSync(pathToFile);
            });

            const deleteAgent = await Agent.findByIdAndDelete(id);

            return { message: 'Тур успешно удален', deleteAgent };
        } catch (e) {
            return { message: e.message };
        }
    }


    async changeMainImg(imgData) {
        const { id, mainImgPath } = imgData;

        try {
            const changeMainImg = await Agent.findByIdAndUpdate(
                id,
                { mainPhoto: mainImgPath },
                { new: true, upsert: true }
            );
            return changeMainImg;
        } catch (error) {
            throw new Error('Error updating MultidayTour: ' + error.message);
        }
    }

}

export default new AgentService();

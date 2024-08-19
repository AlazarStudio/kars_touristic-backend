import AgentService from "./AgentTourService.js";
import Agent from "./Agent.js";

class AgentController {
    async agent(req, res) {
        try {
            const { body } = req;
            
            const multidayTourData = {
                ...body,
            };
            const tour = await AgentService.agent(multidayTourData);
            res.status(201).json(tour);
        } catch (error) {
            console.error('Error in MultidayTourController:', error);
            res.status(500).json({ message: 'Error adding tour' });
        }
    }

    
    async getAgents(req, res) {
        try {
            const getAgents = await AgentService.getAgents(req);
            return res.status(201).json(getAgents);
        } catch (e) {
            console.log(e);
            res.status(500).json(e);
        }
    }

    
    async updateOneAgent(req, res) {
        const { id } = req.params;
        let tourData = req.body;
        
        try {
            const updatedTour = await AgentService.updateOneAgent(id, tourData);
            res.status(200).json(updatedTour);
        } catch (error) {
            console.error(`Ошибка в updateOneAgent: ${error}`);
            res.status(500).json({ message: 'Ошибка при обновлении тура' });
        }
    }

    async getOneAgent(req, res) {
        try {
            const getOneAgent = await AgentService.getOneAgent(req.params.id)
            return res.status(200).json(getOneAgent)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }


    async deleteAgent(req, res) {
        try {
            const deleteAgent = await AgentService.deleteAgent(req.params.id)
            return res.status(200).json(deleteAgent)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
    
    async updateAgentOrder(req, res) {
        const { orderedIds } = req.body;
    
        try {
            for (let i = 0; i < orderedIds.length; i++) {
                const id = orderedIds[i];
                await Agent.findByIdAndUpdate(id, { order: i + 1 }, { new: true, runValidators: true });
            }
    
            res.status(200).json({ message: 'Order updated successfully' });
        } catch (error) {
            console.error(`Ошибка в updateAgentOrder: ${error}`);
            res.status(500).json({ message: 'Ошибка при обновлении порядка туров' });
        }
    }

    
    async changeMainImg(req, res) {
        try {
            const changeMainImg = await AgentService.changeMainImg(req.query);

            res.status(201).send(changeMainImg);
        } catch (error) {
            res.status(500).send({ message: "Не удалось добавить", error: error.message });
        }
    };

}

export default new AgentController();

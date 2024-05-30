import Transfer from "./Transfer.js";

class TransferService {
    async transfer(transferData) {
        const { title, description, link } = transferData;

        try {
            const updatedTransfer = await Transfer.findOneAndUpdate(
                {},
                { title, description, link },
                { new: true, upsert: true }
            );
            return updatedTransfer;
        } catch (error) {
            throw new Error('Error updating transfer: ' + error.message);
        }
    }
    
    async getTransfer() {
        try {
            const transfer = await Transfer.findOne({});
            return transfer;
        } catch (error) {
            throw new Error('Error getting aboutCompany: ' + error.message);
        }
    }
}


export default new TransferService();

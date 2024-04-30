import Transfer from "./Transfer.js";

class TransferService {
    async transfer(transferData) {
        const { title, description, link } = transferData;

        const transfer = new Transfer({
            title,
            description,
            link
        });

        return await transfer.save();
    }
}


export default new TransferService();

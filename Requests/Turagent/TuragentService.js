import Turagent from "./Turagent.js";

class TuragentService {
    async turagent(turagentData) {
        const { description, docPath} = turagentData;

        const docPathName = docPath ? docPath.filename : '';

        const turagent = new Turagent({
            description,
            docPath: docPathName,
        });

        await turagent.save();
        return turagent;
    }
}

export default new TuragentService();
import AboutCompany from "./AboutCompany.js";
import Mission from "./Mission.js";
import Team from "./Team.js";

class AboutService {
    async aboutCompany(aboutData) {
        const { aboutCompany } = aboutData;
        const newAbout = new AboutCompany({ aboutCompany });
        return await newAbout.save();
    }

    async mission(aboutData) {
        const { mission } = aboutData;
        const newAbout = new Mission({ mission });
        return await newAbout.save();
    }

    async team(aboutData) {
        const { name, description, imgPath} = aboutData;

        const imgPathName = imgPath ? imgPath.filename : '';

        const team = new Team({
            name,
            description,
            imgPath: imgPathName,
        });

        await team.save();
        return team;
    }
}


export default new AboutService();

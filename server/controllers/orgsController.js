const Organizations = require("../db/model/organizationsSchema");
const getFiles = async (req, res) => {
    const orgId = req.params?.orgId;
    if (!orgId) {
        res.status(200).json({
            message: "file not found",
        });
    }
    const newfile = await Organizations.findOne({_id: fileId});

    res.status(200).json({
        message: "file downloaded Successfully",
        file: newFile,
    });
};

module.exports = {
    getFiles,
};

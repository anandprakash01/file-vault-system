const Files = require("../db/model/fileSchema");
const asyncFunction = require("../utils/error");

const handleDownload = async (req, res) => {
    const fileId = req.params?.id;
    if (!fileId) {
        res.status(200).json({
            message: "file not found",
        });
    }
    const newfile = await Files.findOne({_id: fileId});

    res.status(200).json({
        message: "file downloaded Successfully",
        file: newFile,
    });
};

const handleUpload = asyncFunction(async (req, res) => {
    const file = req.body?.file;
    const userId = req.body?.id;
    if (!file) {
        res.status(200).json({
            message: "file not found",
        });
    }
    const newfile = await Files.create({file, uploadedBy: userId});

    res.status(200).json({
        message: "file uploaded Successfully",
    });
});

const getStats = () => {};

module.exports = {
    handleDownload,
    handleUpload,
    getStats,
};

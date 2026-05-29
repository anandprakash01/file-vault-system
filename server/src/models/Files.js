import mongoose from "mongoose";

const fileSchema = mongoose.Schema(
  {
    filename: {
      type: String,
      require: true,
    },
    filePath: {
      type: String,
      required: true,
    },
    sizeBytes: {
      type: Number,
      required: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    uploadDate: {
      type: Date,
      default: Date.now(),
    },
  },
  {timestamps: true},
);

const File = mongoose.model("File", fileSchema);

export default File;

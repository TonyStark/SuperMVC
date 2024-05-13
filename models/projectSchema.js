const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
    {}, //Your Collection Object 
    { timestamps: true }
);

const Project = mongoose.model('Project', projectSchema);

module.exports = {
    Project
}
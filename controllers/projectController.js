const {Project} = require("../models/projectSchema")
const index = async (req, res) => {
  try {
      //Optional: Find and delete existing entry
      await Project.deleteMany();

      //Optional: Create a new instance of ProjectModel
      const project = new Project();

      //Optional: Save the project to the database
      await project.save();

      return res.render('index', { bro: "John" });  //"return" is also optional
  } catch (error) {
      return res.status(500).json({error: error.message});
  }
};

module.exports = {
  index
};
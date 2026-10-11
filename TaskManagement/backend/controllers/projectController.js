import Project from "../models/Project.js";

// Create a new project
export const createProject = async (req, res) => {
    try {
        const { name, description } = req.body;
        const newProject = new Project({ name, description });
        await newProject.save();
        res.status(201).json(newProject);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get all projects
export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Delete a project
export const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProject = await Project.findByIdAndDelete(id);
        
        if (!deletedProject) {
            return res.status(404).json({ message: "Project not found" });
        }
        
        res.status(200).json({ message: "Project deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

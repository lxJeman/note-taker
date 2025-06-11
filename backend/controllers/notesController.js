import Note from "../models/Note.js"

export const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find().sort({createdAt: -1})
        res.status(200).json(notes)
    } catch (error) {
        console.error("Error (getallNotes):", error)
        res.status(500).json({message:"internal server error"})
    }
}

export const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        console.log('Received request body:', req.body);

        if (!title || !content) {
            return res.status(400).json({ message: "Title and content are required" });
        }

        const newNote = new Note({ title, content });
        console.log('Created new note object:', newNote);

        const savedNote = await newNote.save();
        console.log('Saved note:', savedNote);

        res.status(201).json({ message: "note created", note: savedNote });
    } catch (error) {
        console.error("Error in createNote controller: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const updateNote = async (req, res) => {
    try {
        const {title, content} = req.body
        const updatedNote = await Note.findByIdAndUpdate(req.params.id,{title, content},{new:true,})
        if (!updateNote) return res.status(404).json({message:"Note not found"})
        res.status(200).json({message:"Note updated successfully"})
    } catch (error) {
        console.error("Error in updateNote controller: ", error)
        res.status(500).json({message:"Internal server error"})
    }
}

export const deleteNote = async (req, res) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id)
        if (!deletedNote) return res.status(404).json({message: "Note not found"})
        res.status(200).json({message: "Note deleted", note: deletedNote})
    } catch (error) {
        console.error("Error in deleteNote controller: ", error)
        res.status(500).json({message: "Internal server error"})
    }
}

export const getNotebyId = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id)
        if (!note) return res.status(404).json({message:"Note not found"})
        res.status(200).json({note})
    } catch (error) {
        console.error("Error in getNotebyId: ", error)
        res.status(500).json({message:"Internal server error"})
    }
}
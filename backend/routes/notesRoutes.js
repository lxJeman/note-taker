import express from "express"
import { getAllNotes, updateNote, deleteNote, createNote, getNotebyId} from "../controllers/notesController.js"
const router = express.Router();

router.get("/", getAllNotes)
router.get("/:id", getNotebyId)
router.post("/", createNote)
router.put("/:id", updateNote)
router.delete("/:id", deleteNote)

export default router
const express = require("express")
const ContactController = require("../controllers/contactController")
const contactMiddleware = require("../middleware/contactMiddleware")


const router = express.Router()

router.post("/add-contact" , ContactController.addContact)
router.put("/update-contact/:id", ContactController.updateContact)
router.get("/get-contacts", ContactController.getContacts)
router.get("/get-contact/:id", ContactController.getContact)
router.delete("/delete-contact/:id", ContactController.deleteContact)

router.post("/upload-image", contactMiddleware.upload.single('photo'), ContactController.uploadImage)

module.exports = router
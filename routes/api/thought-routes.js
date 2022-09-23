const router = require("express").Router();

const { getAllThoughts, getThoughtById, createThought, addReaction, removeReaction, updateThought, removeThought } = require("../../controllers/thought-controller");

router
.route("/")
.get(getAllThoughts)
.post(createThought);

router
.route("/:thoughtId")
.get(getThoughtById)
.put(updateThought)
.delete(removeThought);

router
.route("/:thoughtId/reactions")
.post(addReaction)

router
.route("/:thoughtId/reactions/:reactionId")
.delete(removeReaction);

module.exports = router;


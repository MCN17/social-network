const router = require("express").Router();

const { getAllUser, getUserById, createUser, addFriend, removeFriend, updateUser, deleteUser} = require("../../controllers/user-controller");

router
.route("/")
.get(getAllUser)
.post(createUser);

router
.route("/:userId")
.get(getUserById)
.put(updateUser)
.delete(deleteUser);

router
.route("/:userId/friends/:friendId")
.put(addFriend)
.delete(removeFriend);

module.exports = router;
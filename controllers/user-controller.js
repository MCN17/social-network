const { User } = require("../models");

const userController = {

    // get all users
    getAllUser(req, res) {
        User.find({})
        .populate({
            path: "friends",
            select: "-__v"
        })
        .select("-__v")
        .sort(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // get a single user by id 
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate({
            path: "friends",
            select: "-__v",
        })
        .populate({
            path: "thoughts", 
            select: "-__v"
        })
        .select("-__v")
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(400).json({ message: "No user found with this id!" });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },
    
    // create a user
    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    }, 

    // add friend to user's friend list
    addFriend({ params, body }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: body }},
            { new: true, runValidator: true }
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: "No user found with this id!" });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    // remove friend from a user's friend list
    removeFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: { friendId: params.friendId }}},
            { new: true }
        )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    },

    // update user by id 
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: "No user found with this id!"});
                return;
            }
            res.json(dbUSerData0);
        })
        .catch(err => res.status(400).json(err));
    }, 

    // delete user by id 
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: "No user found with this id!"});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    }
    
};









module.exports = userController;



// API Routes
// /api/users

// GET all users

// GET a single user by its _id and populated thought and friend data

// POST a new user:

// // example data
// {
//   "username": "lernantino",
//   "email": "lernantino@gmail.com"
// }
// PUT to update a user by its _id

// DELETE to remove user by its _id

// BONUS: Remove a user's associated thoughts when deleted.
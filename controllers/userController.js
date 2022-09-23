const { ObjectId } = require('mongoose').Types;
const { User } = require('../models');

module.exports = {
    getUsers(req, res) {
        User.find()
            .populate('thoughts')
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.id })
            .select('-__v')
            .populate('thoughts')
            .then((user) => user ? res.json(user) : res.status(404).json({ message: 'User not found in database' }))
            .catch((err) => res.status(500).json(err));
    },
    createUser(req, res) {
        User.create(req.body)
            .then((userData) => res.json(userData))
            .catch((err) => res.status(500).json(err));
    },
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { runValidators: true, new: true}
        )
            .then((user) => user ? res.json(user) : res.status(404).json({ message: 'User not found in database' }))
            .catch((err) => res.status(500).json(err));
    },   
    deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.id })
            .then((user) => user ? res.json(user) : res.status(404).json({ message: 'User not found in database' }))
            .catch((err) => res.status(500).json(err));
    },
    addFriend(req, res) {
        User.findOne({ _id: req.params.friendId })
            .then((newFriend) => {
                if(!newFriend){
                    res.status(404).json({ message: 'Friend not found in database' });
                };
                return User.findOneAndUpdate(
                    { _id: req.params.userId },
                    { $addToSet: { friends: newFriend._id }},
                    { new: true },
                );
            })
            .then((user) => user ? res.json('Friend Added!') : res.status(404).json({ message: 'No user found with that id'}))
            .catch((err) => {
                res.status(500).json(err);
            });
    },
    removeFriend(req, res) {
        User.findOne({ _id: req.params.friendId })
            .then((deletedFriend) => {
                if(!deletedFriend){
                    res.status(404).json({ message: 'Friend not found in database' });
                };
                return User.findOneAndUpdate(
                    { _id: req.params.userId },
                    { $pull: { friends: newFriend._id }},
                    { new: true },
                );
            })
            .then((user) => user ? res.json('Friend Removed!') : res.status(404).json({ message: 'No user found with that id'}))
            .catch((err) => {
                res.status(500).json(err);
            });
    }
};
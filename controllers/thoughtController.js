const { Thought, User } = require('../models');

module.exports = {
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.id })
            // .select('-__v')
            // .populate('reactions')
            .then((thought) => thought ? res.json(thought) : res.status(404).json({ message: 'Thought not found in database'}))
            .catch((err) => res.status(500).json(err));
    },
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    { username: req.body.username },
                    { $addToSet: { thoughts: thought._id } },
                    { new: true }
                );
            })
            .then((user) => user ? res.json('Thought Created!') : res.status(404).json({ message: 'No user found with that id'}))
            .catch((err) => {
                res.status(500).json(err);
            });
    },
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { runValidators: true, new: true}
        )
        .then((thought) => {thought ? res.json(thought) : res.status(404).json({ message: 'Thought not found in database' })})
        .catch((err) => res.status(500).json(err));
    },
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.id })
            .then((thought) => thought ? res.json(thought) : res.status(404).json({ message: 'Thought not found in database' }))
            .catch((err) => res.status(500).json(err));
    },
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true}
        )
        .then((thought) => {thought ? res.json(thought) : res.status(404).json({ message: 'Thought not found in database' })})
        .catch((err) => res.status(500).json(err));
    },
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.body.reactionId } } },
            { runValidators: true, new: true}
        )
        .then((thought) => {thought ? res.json(thought) : res.status(404).json({ message: 'Thought not found in database' })})
        .catch((err) => res.status(500).json(err));
    }
};
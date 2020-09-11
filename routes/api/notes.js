const express = require("express");
const auth = require("../../middleware/auth");
const router = express.Router();

const passport = require("passport");

// load Note model
const Note = require("../../Models/Note");
const { route } = require("./users");

// @route GET api/notes/
// @desc get all notes
// @access Private
router.get("/", auth, async (req, res) => {
  // try {
  //   const notes = await Note.find({ user: req.user.id})
  //   if (!notes) throw Error('No notes')
  //   res.status(200).json(notes)
  // } catch (e) {
  //   res.status(400).json({msg: e.message})
  // }
  Note.find({ user: req.user.id }).sort({date: -1})
    .then((notes) => res.send(notes))
    .catch((err) => res.sendStatus(400).json({ err: err }));
});

router.post("/", auth, async (req, res) => {
  const newNote = new Note({
    text: req.body.text,
    user: req.user.id,
    category: req.body.category,
  });

  try {
    const note = await newNote.save();
    if (!note) throw Error("Something went wrong");
    res.status(200).json(note);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

// @route  POST api/notes/
// @desc create note
// @access Private
router.post("/", auth, (req, res) => {
  const { text, category } = req.body;
  if (!text) {
    res.status(400);
    res.json({ error: "Invalid Data" });
  }

  const newNote = new Note({
    text: text,
    category: category,
    user: req.user._id,
  });

  newNote
    .save()
    .then((note) => res.json(note))
    .catch((err) => console.log(err));
});

router.get("/:noteId", auth, (req, res) => {
  const noteId = req.params.noteId;
  Note.findById(noteId)
    .then((note) => res.send(note))
    .catch((err) => res.sendStatus(400).send(err));
});

router.put("/:noteId", auth, (req, res) => {
  const noteId = req.params.noteId;
  // const { text, category } = req.body
  Note.findByIdAndUpdate(noteId, req.body, { useFindAndModify: false })
    .then((note) => res.send(note))
    .catch((err) => res.sendStatus(400).send(err));
});

router.delete("/:noteId", auth, (req, res) => {
  const noteId = req.params.noteId
  Note.findByIdAndDelete(noteId).then(note => res.send(note)).catch(err =>res.sendStatus(400).send(err))
})
// router.delete("/note/:noteId", requireAuth, (req, res) => {
//   const id = req.params.noteId;

//  Note.findByIdAndRemove(id, (err, res) => {
//     if (err) console.log(err)
//     else return res.json({ success: true})
//  })
// });

// router.put("/note/:noteId", requireAuth, (req, res) => {
//   const { text, user } = req.body;
//   const newUpdated = { text, user };
//   const id = req.params.noteId;

//   Note.findByIdAndUpdate(id, { $set: newUpdated }, (err) => {
//     if (err) return res.json({ success: false, error: err });
//     else return res.json({ success: true });
//   });
// });

module.exports = router;

require("dotenv").config();
const config = require("./config.json");
const mongoose = require("mongoose");

mongoose.connect(config.connectionString);

const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

const User = require("./models/USer,odel");
const Note = require("./models/Notemodal");
const jwt = require("jsonwebtoken");
const { authenticattoken } = require("./utils/Utils");

app.get("/", (req, res) => {
  res.send("server is running");
});




app.post("/createaccount", async (req, res) => {
  // res.send("create account");
  const { fullName, email, password } = req.body;
  if (!fullName) {
    return res.status(400).json({ error: true, message: "name required" });
  }
  if (!email) {
    return res.status(400).json({ error: true, message: "email required" });
  }
  if (!password) {
    return res.status(400).json({ error: true, message: "Password required" });
  }
  const isUser = await User.findOne({ email: email });
  if (isUser) {
    return res.status(400).json({ error: true, message: "User already exist" });
  }
  const user = new User({
    fullName,
    email,
    password,
  });
  await user.save();

  const accessToken = jwt.sign({ user }, process.env.jwt_secret, {
    expiresIn: "36000m",
  });
  res.json({
    error: false,
    user,
    accessToken,
    message: "user created successfully",
  });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ error: true, message: "email required" });
  }
  if (!password) {
    return res.status(400).json({ error: true, message: "password required" });
  }
  const userinfo = await User.findOne({ email: email });
  if (!userinfo) {
    return res.status(400).json({ error: true, message: "user not found" });
  }

  if (userinfo.email === email && userinfo.password === password) {
    const user = {
      user: userinfo,
    };
    const accessToken = jwt.sign(user, process.env.jwt_secret, {
      expiresIn: "36000m",
    });
    return res.json({
      error: false,
      user,
      email,
      accessToken,
      message: "user logged in successfully",
    });
  } else {
    return res
      .status(400)
      .json({ error: true, message: "invalid credentials" });
  }
});

app.post("/addnote", authenticattoken, async (req, res) => {
  const { title, content, tags } = req.body;
  const { user } = req.user;

  if (!title) {
    return res.status(400).json({ error: true, message: "title required" });
  }
  if (!content) {
    return res.status(400).json({ error: true, message: "content required" });
  }

  try {
    const note = new Note({
      title,
      content,
      tags: tags || [],
      userId: user._id,
    });
    await note.save();
    return res.json({
      error: false,
      note,
      message: "note added successfully",
    });
  } catch (error) {
    return res.status(400).json({ error: true, message: "error creating" });
  }
});

app.put("/editnote", authenticattoken, async (req, res) => {
  const noteId = req.params.noteId;
  const { title, content, tags, ispinned } = req.body;
  const { user } = req.user;

  if (!title && !content && !tags) {
    return res.status(400).json({ error: true, message: "no change provided" });
  }

  try {
    const note = await Note.findOne({ _id: noteId, userId: user._id });

    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found" });
    }
    if (title) {
      note.title = title;
    }
    if (content) {
      note.content = content;
    }
    if (tags) {
      note.tags = tags;
    }
    if (ispinned) {
      note.isPinned = ispinned;
    }
    await note.save();
    return res.json({
      error: false,
      note,
      message: "note updated successfully",
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/get-user",authenticattoken ,async (req, res) => {
  const {user} =req.user
  const isUser = await User.findOne({_id:user._id})
  if(!isUser){
    return res.status(404).json({error:true,message:"user not found"})
  }
  return res.json({
    error:false,
    user:{fullname:isUser.fullname,email:isUser.email,"_id":isUser._id,createdon:isUser.createdon,updatedon:isUser.createdOn},
    message:"user fetched successfully"
  })
})

app.get("/get-all-notes", authenticattoken, async (req, res) => {
  const { user } = req.body;
  try {
    const notes = await Note.find({ userId: user.id }).sort({ ispinned: -1 });
    return res.json({
      error: false,
      notes,
      message: "notes fetched successfully",
    });
  } catch (error) {
    log.error(error);
  }
});

app.get("/delete-note:noteId", authenticattoken, async (req, res) => {
  const noteId = req.params.noteId;
  const { user } = req.user;
  try {
    const note = await Note.findOne({ _id: noteId, userId: user._id });
    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found" });
    }
    await note.deleteOne({ _id: noteId, userId: user._id });
    return res.json({
      error: false,
      message: "note deleted successfully",
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/update-note-pinned/:noteId", authenticattoken, async (req, res) => {
  const noteId = req.params.noteId;
  const { ispinned } = req.body;
  const { user } = req.user;

  try {
    const note = await Note.findOne({ _id: noteId, userId: user._id });

    {
      note.isPinned = ispinned || false;
    }
    await note.save();
    return res.json({
      error: false,
      note,
      message: "note updated successfully",
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

module.exports = app;

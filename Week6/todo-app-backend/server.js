// Importing required modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Loading environment variables from a .env file into process.env
require("dotenv").config();
const { db, authMiddleware } = require("./firebase");


// Creating an instance of Express
const app = express();

// Middlewares to handle cross-origin requests and to parse the body of incoming requests to JSON
app.use(cors());
app.use(bodyParser.json());

// Your API routes will go here...

// GET: Endpoint to retrieve all tasks
// app.get("/tasks", async (req, res) => {
//   try {
//     // Fetching all documents from the "tasks" collection in Firestore
//     const snapshot = await db.collection("tasks").get();
    
//     let tasks = [];
//     // Looping through each document and collecting data
//     snapshot.forEach((doc) => {
//       tasks.push({
//         id: doc.id,  // Document ID from Firestore
//         ...doc.data(),  // Document data
//       });
//     });
    
//     // Sending a successful response with the tasks data
//     res.status(200).send(tasks);
//   } catch (error) {
//     // Sending an error response in case of an exception
//     res.status(500).send(error.message);
//   }
// });

// GET: Endpoint to retrieve all tasks for a user
// ...
app.get("/tasks/:user", async (req, res) => {
  try {
    // Fetching all documents from the "tasks" collection in Firestore
    const snapshot = await db.collection("tasks").where("user", "==", req.params.user).get()

    let tasks = [];
    // Looping through each document and collecting data
    snapshot.forEach((doc) => {
      tasks.push({
        id: doc.id,  // Document ID from Firestore
        ...doc.data(),  // Document data
      });
    });

    // Sending a successful response with the tasks data
    res.status(200).send(tasks);
  } catch (error) {
    // Sending an error response in case of an exception
    res.status(500).send(error.message);
  } 
});

// POST: Endpoint to add a new task
// ...
app.post("/tasks", async (req, res) => {
  try {
    // Creating a new document in the "tasks" collection with the data received in the request body
    const docRef = await db.collection("tasks").add(req.body);
    
    // Fetch the newly added document to get its full data
    const doc = await docRef.get();
    const newTask = {
      id: docRef.id,
      ...doc.data()
    };
    
    // Sending a successful response with the full task data
    res.status(201).json(newTask);
  } catch (error) {
    // Sending an error response in case of an exception
    res.status(500).send(error.message);
  }
});

// DELETE: Endpoint to remove a task
// ...
app.delete("/tasks/:id", async (req, res) => {
  try {
    const {id} = req.body;
    const taskref = db.collection('tasks').doc(id);
    const task = await taskref.get();

    if (!task.exists) {
      return res.status(404).send('Task not found');
    }

    await taskref.delete();
    res.status(200).send(`Task ${id} deleted`);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Setting the port for the server to listen on
const PORT = process.env.PORT || 3001;
// Starting the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
import express from 'express';
import mongoose from 'mongoose';
import StudentMarks from './student.js';
// Create Express app
const app = express();
app.use(express.json());

app.set('view engine', 'ejs')

const connect = async () => {

    try{
        await mongoose.connect('mongodb+srv://user:1234@cluster0.1i5wfhu.mongodb.net/?retryWrites=true&w=majority',{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: 'Student',
          });
        console.log("Connected to mongoDB.")
    }
    catch(error){
        throw error;
    }
};

app.get('/', (req, res) => {
    res.render('pages/index')
})

mongoose.connection.on("disconnected", ()=>{
    console.log("mongoDB disconnected!")
})



// Create a new user
app.post('/api/student', (req, res) => {
  const student = new StudentMarks(req.body);

   student.save().then((result) => {
    res.send(result);
  }).catch((error) => {
    res.status(400).send(error);
  });
});

// Get all users
app.get('/api/students', (req, res) => {
  StudentMarks.find().then((students) => {
    let length = students.length;
    let result = {
      count:length,
      students:students
    }
    res.render('pages/index', {
        students:students
    })
    // res.send(result);
  }).catch((error) => {
    res.status(500).send(error);
  });
});

app.get('/api/student/pass', (req, res) => {
    StudentMarks.find({ DSBDA_marks: { $gt: 19 } }).then((students) => {
      let length = students.length;
      let result = {
        count:length,
        students:students
      }
      res.render('pages/index', {
        students:students
    })
    }).catch((error) => {
      res.status(500).send(error);
    });
  });

  app.get('/api/student/topper', (req, res) => {
    StudentMarks.find({ $and: [{ DSBDA_marks: { $gt: 25 }},
        {CC_marks: { $gt: 25 }},
        {AI_marks: { $gt: 25 }},
        {CNS_marks: { $gt: 25 }},
        {WAD_marks: { $gt: 25 }}] }).then((students) => {
      let length = students.length;
      let result = {
        count:length,
        students:students
      }
      res.render('pages/index', {
        students:students
    })
    }).catch((error) => {
      res.status(500).send(error);
    });
  });

// Get a user by ID
app.get('/api/student/:id', (req, res) => {
  const id = req.params.id;

  StudentMarks.findById(id).then((student) => {
    if (!student) {
      return res.status(404).send();
    }
    res.render('pages/index', {
        students:student
    })
  }).catch((error) => {
    res.status(500).send(error);
  });
});

// Update a user by ID
app.put('/api/student/:id', (req, res) => {
  const id = req.params.id;
  const updates = req.body;

  StudentMarks.findByIdAndUpdate(id, updates, { new: true }).then((student) => {
    if (!student) {
      return res.status(404).send();
    }
    res.send(student);
  }).catch((error) => {
    res.status(400).send(error);
  });
});

// Delete a user by ID
app.delete('/api/student/:id', (req, res) => {
  const id = req.params.id;

  StudentMarks.findByIdAndDelete(id).then((student) => {
    if (!student) {
      return res.status(404).send();
    }
    res.send(student);
  }).catch((error) => {
    res.status(500).send(error);
  });
});

// Start the server
app.listen(3000, () => {
    connect()
  console.log('Server listening on port 3000');
});
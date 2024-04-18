const express = require('express'); 
const router = express.Router();
const jwt = require('jsonwebtoken');
const authenticate=require('../middleware/authenticate')
const authenticate_t=require('../middleware/authenticate_t')

require('../db/conn');
const User = require('../models/userschema');
const Teacher=require('../models/teacher');
const Research=require('../models/research')
const Application=require("../models/application")
const middleware = (req, res, next) => {
    console.log("loading");
    next();
}

router.get('/', (req, res) => {
    res.send("hello world from auth");
});

router.post('/tsignup', middleware, async (req, res) => {
    const { username, email, branch,password  } = req.body;

    try {
        const userexist = await Teacher.findOne({ email: email });
        if (userexist) {
            console.log("existing");
            return res.status(400).json({ error: "User already exists" });
        }

        const user = new Teacher({ username, email,branch, password });
        const reg = await user.save();
        if (reg) {
            res.send("registered");
        }
    } catch (err) {
        console.error(err);
        res.status(400).send("internal error");
    }
});

router.post('/signup', middleware, async (req, res) => {
    const { username, email, branch, password } = req.body;

    try {
        const userexist = await User.findOne({ email: email });
        if (userexist) {
            console.log("existing");
            return res.status(400).json({ error: "User already exists" });
        }

        const user = new User({ username, email,branch, password });
        const reg = await user.save();
        if (reg) {
            res.send("registered");
        }
    } catch (err) {
        console.error(err);
        res.status(400).send("internal error");
    }
});

router.post('/sign', async (req, res) => {
    const { email, password } = req.body;

    try {
        const userexist = await User.findOne({ email: email });
        if (!userexist) {
            return res.status(400).send("Wrong credentials");
        }

        const pass = await User.findOne({ email: email, password: password });
        if (pass) {
            const token = await pass.generateAuthToken();
            res.cookie("jwtToken", token, {
                expires: new Date(Date.now() + 20000000),
                httpOnly: true
            });
            res.json({ message: userexist });
        } else {
            res.status(400).send("Wrong credentials");
        }
    } catch (error) {
        console.error("err");
        res.status(400).send("Internal server error");
    }
});
router.post('/tsign', async (req, res) => {
    const { email, password } = req.body;

    try {
        const userexist = await Teacher.findOne({ email: email });
        if (!userexist) {
            return res.status(400).send("Wrong credentials");
        }

        const pass = await Teacher.findOne({ email: email, password: password });
        if (pass) {
            const token = await pass.generateAuthToken();
            res.cookie("jwtToken", token, {
                expires: new Date(Date.now() + 200000),
                httpOnly: true
            });
            res.json({ message: userexist }); // Move this line after setting the cookie
        } else {
            res.status(400).send("Wrong credentials");
        }
    } catch (error) {
        console.error('err');
        res.status(400).send("Internal server error");
    }
});
router.get('/thome', authenticate_t,  async (req, res) => {
    console.log("hello thome");
    res.send(req.rootUser)
});

router.get('/shome', authenticate,  async (req, res) => {
    console.log("hello thome");
    res.send(req.rootUser)
});



router.post('/addr',  async (req, res) => {
    const { teacher_n,teacher_email,title, domain,   additional } = req.body;

    try {
        

        const research_n = new Research({teacher_n,teacher_email,title, domain, additional});
        const reg = await research_n.save();
        if (reg) {
            res.send("registered");
        }
    } catch (err) {
        console.error();
        res.status(400).send("internal error: ");

    }
});
router.post('/applyr',  async (req, res) => {
    const { title,teacher_email,student_email,cgpa, branch,   status } = req.body;

    try {
        

        const research_n = new Application({title,teacher_email,student_email,cgpa, branch,status});
        const reg = await research_n.save();
        if (reg) {
            res.send("registered");
        }
    } catch (err) {
        console.error();
        res.status(400).send("internal error: ");

    }
});
router.get('/new_re', async (req, res) => {
    try {
        const researchData = await Research.find();
        res.json(researchData);
    } catch (error) {
        console.error(error);
        res.status(400).send("Internal server error");
    }
});
router.get('/records', async (req, res) => {
    try {
      // Extract the teacher's email and title from the query parameters
      const { email, title } = req.query;
      
      // Construct a query object based on the parameters received
      const query = { teacher_email: email };
      if (title) query.title = title;
  
      // Query the database to find records with the specified teacher's email and title
      const records = await Application.find(query);
  
      // Respond with the records found
      res.status(200).json(records);
    } catch (error) {
      // Handle any errors that occur during the database operation
      console.error('Error fetching records:', error);
      res.status(500).json({ error: 'Failed to fetch records' });
    }
});

  router.get('/trecords', async (req, res) => {
    try {
      // Extract the teacher's email from the query parameter
      const { email } = req.query;
  
      // Query the database to find records with the specified teacher's email
      const records = await Research.find({ teacher_email: email });
  
      // Respond with the records found
      res.status(200).json(records);
    } catch (error) {
      // Handle any errors that occur during the database operation
      console.error('Error fetching records:', error);
      res.status(500).json({ error: 'Failed to fetch records' });
    }
  });
  router.get('/srecords', async (req, res) => {
    try {
      // Extract the teacher's email from the query parameter
      const { email } = req.query;
  
      // Query the database to find records with the specified teacher's email
      const records = await Application.find({ student_email: email });
  
      // Respond with the records found
      res.status(200).json(records);
    } catch (error) {
      // Handle any errors that occur during the database operation
      console.error('Error fetching records:', error);
      res.status(500).json({ error: 'Failed to fetch records' });
    }
  });
  router.patch('/status/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
      // Update the status of the research application in the database
      await Application.findByIdAndUpdate(id, { status });
      res.status(200).json({ message: 'Status updated successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  router.post('/change-password', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await Teacher.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      user.password = password;
      await user.save();
  
      return res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
      console.error('Error changing password:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
  router.post('/schange-password', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      user.password = password;
      await user.save();
  
      return res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
      console.error('Error changing password:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
module.exports = router;
 

require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const { logger, logEvents } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')


const PORT = process.env.PORT || 5003

console.log(process.env.NODE_ENV)

app.use(logger)
app.use(cors(corsOptions))

app.use(express.json())

// database
const db = require("./models");
const Role = db.role;

// db.sequelize.sync();
// force: true will drop the table if it already exists
db.sequelize.sync({logging:true}).then(() => {
    console.log('Database');
    // initial();
  });
  // routes
  require('./routes/authRoutes')(app);
  require('./routes/businessnameRoutes')(app)
  // require('./routes/userRoutes')(app);

app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/root'))




app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
});

// Find all questions
app.get('/api/questions', async (req, res) => {
    try {
      const questions = await Question.findAllQuestions();
      res.send(questions);
    } catch (error) {
      res.status(500).send({
        message: 'Some error occurred while retrieving data.',
      });
    }
  });

  
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

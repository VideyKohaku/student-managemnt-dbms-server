const express = require('express');
const cors = require('cors');
const MainRouter = require('./src/routes');

const app = express();
const port = 3000;



// Define your routes and middleware here
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/v1', MainRouter);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

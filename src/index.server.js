const express =  require("express");
const env = require("dotenv")
const app = express();
//const bodyParser = require('body-parser');
const mongoose = require ('mongoose')
//robustness
const authRoutes = require ('./routes/auth.js');
const adminRoutes = require ('./routes/admin/auth')
const categoryRoutes = require ('./routes/category');
//define port
env.config();

//mongodb connection
//mongodb+srv://Sheshan1999:<password>@mongodbprojects.w8euv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
mongoose.connect(
    'mongodb+srv://Sheshan1999:sheshan123@mongodbprojects.w8euv.mongodb.net/ecommerce?retryWrites=true&w=majority', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    userCreateIndex : true
}
).then(() => {
    console.log("Database connected")
})
//add middle ware
app.use(express.json());
app.use('/api', authRoutes);
app.use('/api', adminRoutes);
app.use('/api', categoryRoutes);


app.listen(process.env.PORT, ()=>{
    console.log('Server is running on port 2000');
});
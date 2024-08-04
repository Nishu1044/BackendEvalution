const express = require("express");
const mongoose = require("mongoose")
const app = express();
// const url ="mongodb://localhost:27017/onlineCourse"


const PORT = 8989
app.use(express.json())


// making modelSchema for courses
const onlineCourseSchema = mongoose.Schema({
  id:{type: "string", required: true},
  title:{type: "string", required: true},
  category:{type: "string", required: true},
  difficulty:{type: "string", required: true},
  description:{type: "string", required: true}
})
const courseModel = mongoose.model("course",onlineCourseSchema)


// making modelSchema for users
const userSchema = mongoose.Schema({
    id:{type: "string", required: true},
    username:{type: "string", required: true},
    password:{type: "string", required: true},
    enrolledCourses:[{type: "string", required: true}]
})
const userModel = mongoose.model("user",userSchema)


// connect to mongodb
mongoose.connect("mongodb://localhost:27017/onlineCourse",{
    useNewUrlParser:true,
    useUnitedTopology:true,
    useCreateIndex: true
}).then(()=>{
    console.log("connected to MongoDB");
    
})

// create New Course 
const newCourse = new courseModel({
    id: 'Course123',
    title:'introduction to coding',
    category:"coding",
    difficulty:'beginner',
    description:'this course guide the coding concept'

})

newCourse.save()
.then(()=>{
    console.log('course is saves');
})
.catch(error =>{
    console.log(error);  
})



//  create new user
const newUser = new User({
    id:'user123',
    username:'rohan',
    password:"rohan123456",
    enrolledCourses:['course123']

})

newUser.save()
.then(()=>console.log('User saved')
)
.catch(error => console.log(error)
)

// Authentication Middleware

const auth = (req,res,next)=>{
    const token = req.header("Authorization");
    if(!token){
        return res.status(401).json({message:"No token, authorization"})
    }

    try {
        const code = (token)
    } catch (error) {
        res.status(401).json({message:'Token is not valid'})
    }
}

app.get('/',(req,res) => {
    res.send('hello world')
})

const getCourse = async(req,res)=>{
    const userId = req.user.id;
    try {
        const user = await user.findById(userId).populate('enrolledCourses')
        res.json({enrolledCourses: user.enrolledCourses})
    } catch(error) {
        res.status(500).json({message: 'server error'})
    }
}


app.listen(PORT,()=>{
    console.log(`server is running ${PORT}`); 
})


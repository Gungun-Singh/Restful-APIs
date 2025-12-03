const express = require("express");
const app = express();

app.use(express.json());

const employees = [
    {
        id:1,
        name: "Gungun", 
        department: "IT",
        experience:2
    },
    {
        id:2,
        name:"Vageesha",
        department:"Finance",
        experience:3
    },
    {
        id:3,
        name: "Khushi",
        department:"HR",
        experience:1
    },
    {
        id:4,
        name:"Shivaditya",
        department:"IT",
        experience:4
    },
    {
        id:5,
        name:"Viraj",
        department:"Finance",
        experence:2
    }
]



//GET ALL EMPLOYEE
app.get("/all",(req,res)=>{
    res.json({employees})
})

//GET 1 EMPLOYEE
app.get("/all/:id",(req,res)=>{
const getId = parseInt(req.params.id);
const getSingle = employees.find((emp)=> emp.id === getId);

if(getSingle){
    res.status(200).json({
        data:getSingle,
        message:"This is an employee"
    })
}
else{
    message:"Employee not found"
}
})


//ADD AN EMPLOYEE
app.post("/add",(req,res)=>{
   const {id, name, department, experience} = req.body;
   
   const newEmployee = [
    {
        id: id || Math.floor(Math.random()*1000),
        name: name || `Name ${Math.floor(Math.random()*100)}`,
        department : department || "Unknown",
        experience : experience || 0
    }
   ]

   employees.push(newEmployee);

   res.status(200).json({
    data : newEmployee,
    message:"New employee added successfully"
   })
})


//UPDATE AN EMPLOYEE
app.put("/update/:id",(req,res)=>{
    const getId = parseInt(req.params.id);
    const empId = employees.find((update) => update.id ===getId)

    if(empId){
        empId.name = req.body.name || empId.name;
        empId.department = req.body.department || empId.department;
        empId.experience = req.body.experience || empId.experience;

        res.status(200).json({
            data: empId,
            message: "Employee details updated successfully"
        })
    }
    else{
        res.status(404).json({
            message : "Employee not found"
        })
    }
})


//DELETE AN EMPLOYEE
app.delete("/delete/:id",(req,res)=>{
    const getId = parseInt(req.params.id);
    const deleteId = employees.findIndex((deleted) => deleted.id === getId);

    if(deleteId != -1){
        const deletedEmp = employees.splice(deleteId,1);
        
        res.status(200).json({
            data : deletedEmp,
            message:"Employee details deleted successfully"
        })
    }
    else{
        res.status(404).json({
            message:"Employee not found"
        })
    }
})


//




const port =3000;
app.listen(port,()=>{
    console.log(`Server listening at port ${port}`)
});
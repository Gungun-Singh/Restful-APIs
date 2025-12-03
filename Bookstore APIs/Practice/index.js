const express = require("express");
const app =express();

//middleware
app.use(express.json());

const books = [
    {
        id:1,
        title : "verity"
    },
    {
        id:2,
        title:"A man called ove"
    },
    {
        id:3,
        title:"The book theif"
    },
    {
        id:4,
        title:"The silent patient"
    },
    {
        id:5,
        title:"A girl on the train"
    }

]
//intro route
app.get("/",(req,res)=>{
    res.json({
        message:"Hi welcome"
    })
})
//to get all books
app.get("/all", (req,res)=>{
    res.json(books);
})

app.get("/all/:bookId", (req,res)=>{
    const bookid = parseInt(req.params.bookId);
    const getSingle = books.find((item)=>item.id===bookid);

    if(getSingle){
        res.status(200).json(getSingle);

    }
    else{
        res.status(404).json({
            message:"Not found"
        });
    }

})


//add a new book
app.post("/add",(req,res)=>{
    let newBook=[];
    for(let i=0;i<2;i++)
    {
   newBook = 
        {
            id:Math.floor(Math.random()*1000),
            title: `Book ${Math.floor(Math.random()*1000)}`
        }
    books.push(newBook);
    }
    
    res.status(200).json({
        data : newBook,
        message :"New book added successfully",
    })
})


//UPDATE A BOOK
app.patch("/update/:id", (req,res)=>{
    const getId = parseInt(req.params.id);
    const findCurrentBook= books.find((bookitem)=> bookitem.id === getId)
    if(findCurrentBook){
    findCurrentBook.title = req.body.title || findCurrentBook.title;
    res.status(200).json({
        message:`Book with id ${req.params.id} updated successfully`,
        data : findCurrentBook,
    })
    }else{
        res.status(404).json({
            message: "Book not found"
        })
    }
})

app.delete("/delete/:id",(req,res)=>{
    const getId = parseInt(req.params.id);
    const findBook = books.findIndex((bookitem)=> bookitem.id === getId);

    if(findBook != -1){
        const deleteBook = books.splice(findBook,1);
        res.status(200).json({
            message:"Book deleted successfully",
            data : deleteBook[0]
        })
    }
    else{
        res.status(404).json({
            message:"Book not found"
        })
    }
})

app.listen(3000,()=>{
    console.log("server is listening at 3000");
})


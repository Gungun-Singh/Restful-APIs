const express = require("express");
const app = express();

app.use(express.json());


const movies = [
    {
        id:1,
        title: "Inception",
        genre :"SciFi",
        rating:8.6,
        year: 2010
    },
    {
        id:2,
        title:"Harry Potter",
        genre:"Kids",
        rating:7,
        year:2005
    },
    {
        id:3,
        title:"Whale",
        genre:"Emotional",
        rating:6,
        year:2020
    },
    {
        id:4,
        title:"Interstellar",
        genre:"Scifi",
        rating:8,
        year:2019
    },
    {
        id:5,
        title:"Stranger Things",
        genre:"Kids",
        rating:8,
        year:2016
    }
]


//INTRO ROUTE
app.get("/",(req,res)=>{
    res.json({
        message :"Hello Welcome"
    })
})


//GET ALL MOVIES
app.get("/all",(req,res)=>{
    res.json(movies)
})

//GET 1 MOVIE
app.get("/one/:id", (req,res)=>{
    const getid = parseInt(req.params.id);
    const getSingle = movies.find((movieId)=> movieId.id === getid);

    if(getSingle){
        res.status(200).json({
            data: getSingle,
            message :"This is a movie"
        })

    }
    else{
        res.status(404).json({
            message: "Movie Not Found"
        })
    }
})



//ADD A MOVIE
app.post("/add", (req,res)=>{
    const {id, title, genre, rating, year} = req.body;

    const newMovie =[{
        id:id || Math.floor(Math.random()*1000),
        title: title || `Movie ${Math.floor(Math.random()*100)}`,
        genre:genre || "Unknown",
        rating: rating || 0,
        year: year || 2025
    }]


movies.push(newMovie);

res.status(200).json({
    data :newMovie,
    message: "Movie added successfully"
    
});
    
})

//UPDATE A MOVIE
app.put("/update/:id", (req,res)=>{
    const getid = parseInt(req.params.id);
    const movieId = movies.find((update)=> update.id ===getid);

    if(movieId){
        movieId.title =  req.body.title || movieId.title;
        movieId.genre = req.body.genre || movieId.genre;
        movieId.rating = req.body.rating || movieId.rating;
        movieId.year = req.body.year || movieId.year;

        res.status(200).json({
            data: movieId,
            message :"Movie updated"
        })
    }else{
        res.status(404).json({
            message : "Movie not found"
        })
    }
})

//DELETE A MOVIE
app.delete("/delete/:id",(req,res)=>{
    const getId = parseInt(req.params.id);
    const deleteId = movies.findIndex((deleted)=> deleted.id === getId);

    if(deleteId != -1)
    {
        const deletedMovie = movies.splice(deleteId, 1);
        res.status(200).json({
            data :deletedMovie[0],
            message:"Movie deleted successfully"
        })
    }
    else{
        res.status(404).json({
            message:"Movie not found"
        })
    }
    
});



//GET ALL MOVIES + FILTER + SEARCH + SORT

app.get("/movies",(req,res)=>{
let results = movies;

//FILTER : GENRE
if(req.query.genre){
    results = results.filter(
        (item) => item.genre.toLowerCase() === req.query.genre.toLowerCase()
    );

}


//FILTER : MIN RATING
if(req.query.minrating){
    results = results.filter(
        (item) => item.rating >= req.query.minrating
    );
}


//SORT BY RATING
if(req.query.sort === "rating"){
    results = results.sort((a,b) => a.rating - b.rating);
}

//SORT BY YEAR
if(req.query.sort === "year"){
    result = results.sort((a,b)=> a.year - b.year);
}


    res.status(200).json({
        results
    })
})



//SERVER
const port = 3000;
app.listen(port,()=>{
    console.log(`listening at port ${port}`);
})
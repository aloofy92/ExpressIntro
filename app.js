const express = require('express')

 	const app = express()
 	const port = 3000

 	app.use(express.json()) // This line is necessary for Express to be able to parse JSON in request body's

 	let favMovieList = [{
 		title: "Star Wars",
 		starRating: 5,
 		isRecommended: true,
 		createdAt: new Date(),
 		lastModified: new Date()
 	}, {
 		title: "The Avengers",
 		starRating: 4,
 		isRecommended: true,
 		createdAt: new Date(),
 		lastModified: new Date()
 	}];

 	app.get('/', (req, res) => {
 		res.send('Hello World!')
 	})

 	app.listen(port, () => {
 		console.log(`Example app listening on port ${port}`)
 	})


	app.get('/all-movies', (req, res) => {

		let favMovies = favMovieList.map((movie) =>{
			return movie;
		})
		res.json({
			success: true,
			allMovies: favMovies
		})
	})

	app.get('/single-movie/findTitle', (req, res) => {
		let findTitle = req.params.findTitle

		let singleMovie = favMovieList.find((movie) => {
			return movie.title === findTitle
		})
		res.json({
			success: true,
			singlemovie: singleMovie
		})
	})

	app.post('/new-movie', (req, res)=> {

		if (req.body.title === undefined || typeof(req.body.title) != "string"){
			res.json({
				success: false,
				message: "a movie name is required, must be a string"
			})
			return
		}
		if (req.body.starRating === undefined || typeof(req.body.starRating) != "number" || req.body.starRating >=6){
			res.jsonres.json({
				success: false,
				message: "star rating must be a number between 1 and 5"
			})
			return
		}
		if (req.body.isReccommended === undefined || typeof(req.body.isReccommended) != "boolean"){
			res.json({
				success: false,
				message: "must be a boolean"
			})
			return
		}

	})


	const newMovie = {};
	newMovie.title = req.body.title;
	newMovie.starRating = req.body.starRating;
	newMovie.isReccommended = req.body.isReccommended;
	newMovie.createdAt = new Date();
	newMovie.lastModified = new Date();

	favMovieList.push(newMovie);
	console.log(favMovieList);

	res.json({
		success: true,
		newMovieAdded: newMovie,
		favMovieList: favMovieList
	})

	app.put('/update-movie/updateTitle', (req, res)=>{
		let findMovie = req.params.updateTitle
		let uniqueMovie = favMovieList.find((movie)=>{
			return movie.title === findMovie
		})
		let movieIndex = favMovieList.findIndex((movie)=>{
			return movie.title === findMovie
		})

		if (!uniqueMovie){
			res.json({
				success: false,
				message: "Movie not found"
			})
			return
		}
	})

	app.put('/delete-movie/deleteTitle', (req, res)=>{
		let deleteMovie = req.params.deleteTitle
		let indexforMovie = favMovieList.findIndex((movie)=>{
			return movie.title === deleteMovie
		})
		favMovieList.splice(movieIndex, 1)
		console.log(favMovieList)

			res.json({
				success: true,
				favMovieList: favMovieList
			})
		})

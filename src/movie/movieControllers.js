const Movie = require("./movieModel")

exports.addMovie = async (req, res) => {
    try {
        const newMovie = await Movie.create(req.body)
        res.status(200).send({ movie: newMovie })
    } catch (err) {
        console.log(err)
        res.status(500).send({ error: err.message })
    }
}

exports.listMovies = async (req, res) => {
    try {
        const movies = await Movie.find({})
        res.status(200).send({ movies })
    } catch (err) {
        console.log(err)
        res.status(500).send({ error: err.message })
    }
}

exports.updateMovie = async (req, res) => {
    const id = req.params.id
    try {
        const movie = await Movie.updateOne(
            { _id: id },
            { title: req.body.title, actors: req.body.actors }
        )
        res.status(200).send({ movie })
    } catch (err) {
        console.log(err)
        res.status(500).send({ error: err.message })
    }
}

exports.deleteMovie = async (req, res) => {
    const id = req.params.id
    try {
        const movie = await Movie.deleteOne({ _id: id })
        res.status(200).send({ movie })
    } catch (err) {
        console.log(err)
        res.status(500).send({ error: err.message })
    }
}
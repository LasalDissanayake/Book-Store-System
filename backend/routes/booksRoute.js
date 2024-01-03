import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

//Route for the new book(POST route ek thamai hadnne)
router.post('/', async(request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear  
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            });
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };

        const book = await Book.create(newBook);

        return response.status(201).send(book);


    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
        
    }
})

//////////////////////////////CREATE ek iwarai//////////////////////////////


//Route for get all the books(GET Route ek thmai hadnne)

router.get('/', async(request, response) => {
    try {
        const books = await Book.find({});

        return response.status(200).json({
            count: books.length,
            data: books
        })
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message });
    }
});

//////////////////////////////READ ALL THE DATA EK IWRAI//////////////////////////////

//Route for get ONE book by it's ID(GET Route ek thmai hadnne)

router.get('/:id', async(request, response) => {
    try {

        const { id } = request.params;
        const book = await Book.findById(id);

        return response.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message });
    }
});

//////////////////////////////READ ONE THE DATA EK IWRAI//////////////////////////////

//Route for Update a book

router.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear 
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear'
            });
        }

        const {id} = request.params;
        const result = await Book.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(400).json({message: 'Book not found'});
        }
        return response.status(200).send({message: 'Book updated successfully'});

    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
    //hi
});

//////////////////////////////UPDATE ek iwraai//////////////////////////////

//Route for DELETE a book

router.delete('/:id', async(request, response) =>{
    try {
        
        const {id} = request.params;
        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return response.status(400).json({message: 'Book not found'});
        }

        return response.status(200).send({message: 'Book deleted successfully'});

    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

export default router;
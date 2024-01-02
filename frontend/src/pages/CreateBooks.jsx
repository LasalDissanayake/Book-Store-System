// Importing necessary dependencies
import { useState } from "react";
import React from 'react';
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../assets/CreateBooks.css";

// Functional component for creating books
const CreateBooks = () => {
  // State variables for managing form data and loading state
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Event handler for saving the book
  const handleSaveBook = () => {
    // Creating data object from form inputs
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);

    // Making a POST request to save the book data
    axios
      .post('http://localhost:5555/books', data)
      .then(() => {
        // Resetting loading state and navigating to the home page
        setLoading(false);
        navigate('/');
      })
      .catch((error) => {
        // Handling errors by resetting loading state, showing an alert, and logging the error
        setLoading(false);
        alert('An error happened. Please check console');
        console.log(error);
      });
  };

  // JSX for rendering the create book form
  return (
    <div className="create-books-container">
      <BackButton />
      <h1 className="create-books-title">Create Book</h1>
      {loading ? <Spinner /> : ''}
      <div className="books-form-container">
        <div className="form-input-container">
          <label className='form-label'>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='form-input'
          />
        </div>
        <div className="form-input-container">
          <label className='form-label'>Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='form-input'
          />
        </div>
        <div className="form-input-container">
          <label className='form-label'>Publish Year</label>
          <input
            type='number'
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className='form-input'
          />
        </div>
        <button className='form-button' onClick={handleSaveBook}>
          Save
        </button>
      </div>
    </div>
  );
};

// Exporting the CreateBooks component
export default CreateBooks;
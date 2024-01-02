// Importing necessary dependencies
import { useState, useEffect } from "react";
import React from 'react';
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

// Functional component for EditBook
const EditBook = () => {
  // State variables for managing form data and loading state
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  useEffect(()=>{
    setLoading(true);
    axios.get(`http://localhost:5555/books/${id}`)
    .then((Response) => {
      setAuthor(Response.data.author);
      setPublishYear(Response.data.publishYear);
      setTitle(Response.data.title);
      setLoading(false);
    }).catch((error) =>{
      setLoading(false);
      alert(`An error happned. Please Check console`);
      console.log(error);
    });
  }, [])

  // Event handler for edit the book
  const handleEditBook = () => {
    // Creating data object from form inputs
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);

    // Making a PUT request to Edit the book data
    axios
      .put(`http://localhost:5555/books/${id}`, data)
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
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Book</h1>
      {loading ? <Spinner /> : ''}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
          <input
            type='number'
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}>
          Save
        </button>
      </div>
    </div>
  );
};

// Exporting the EditBook component
export default EditBook;

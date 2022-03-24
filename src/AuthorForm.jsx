import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

export default function AuthorForm(props) {
  const updateAuthor = () => {
    const form = document.querySelector(".form-container");
    const authorObj = {
      id: parseInt(form.id.value),
      first_name: form.fn.value,
      last_name: form.ln.value,
      dob: form.dob.value,
      dod: form.dod.value,
    };
    axios
      .put(`/authorsmysql/${authorObj.id}`, authorObj)
      .then((res) => {
        if (res.data.error !== null) {
          console.log(res.data.error);
          alert("Error while updating author");
        } else {
          props.loadauthours();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const addAuthor = (e) => {
    e.preventDefault();
    const authorObj = {
      id: parseInt(e.target.id.value),
      first_name: e.target.fn.value,
      last_name: e.target.ln.value,
      dob: e.target.dob.value,
      dod: e.target.dod.value,
    };
    axios
      .post("/authorsmysql", authorObj)
      .then((res) => {
        if (res.data.error !== null) {
          console.log(res.data.error);
          alert("Error while adding author");
        } else {
          props.loadauthours();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <form className='form-container bg-light clearfix' onSubmit={addAuthor}>
      <h1 className='text-center mb-4'> Author Form</h1>
      <div className='forum-group text-center'>
        <input
          type='number'
          name='id'
          className='form-control'
          placeholder='ID'
        />
        <input
          type='text'
          name='fn'
          className='form-control'
          placeholder='First Name'
        />
        <input
          type='text'
          name='ln'
          className='form-control'
          placeholder='Last Name'
        />
        <input type='date' name='dob' className='form-control' />
        <input type='date' name='dod' className='form-control' />
        <button
          type='button'
          className='btn btn-primary m-1'
          onClick={updateAuthor}>
          Update
        </button>
        <input type='submit' className='btn btn-success m-1' />
      </div>
    </form>
  );
}

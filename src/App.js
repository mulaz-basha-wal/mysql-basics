import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Author from "./Author";
import AuthorForm from "./AuthorForm";

function App() {
  const [authors, setAuthors] = useState([]);

  const loadAuthors = () => {
    axios.get("/authorsmysql").then((res) => {
      setAuthors(res.data.result);
    });
  };

  useEffect(() => {
    loadAuthors();
  }, []);

  const onClickDelete = (id) => {
    axios
      .delete(`/authorsmysql/${id}`)
      .then((res) => {
        if (res.data.error !== null) {
          console.log(res.data.error);
          alert("Error while deleting author");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    loadAuthors();
  };
  return (
    <div className='App'>
      <AuthorForm loadauthours={loadAuthors} />
      <div className='authors-list'>
        {authors.map((author) => {
          return (
            <Author key={author.id} author={author} delete={onClickDelete} />
          );
        })}
      </div>
    </div>
  );
}

export default App;

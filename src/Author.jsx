import React from "react";

export default function Author(props) {
  return (
    <div className='author-item'>
      <h5>{`${props.author.first_name} - ${props.author.last_name}`}</h5>
      <p className='muted-text'>{`${props.author.dob} to ${props.author.dod}`}</p>
      <p className='muted-text'>ID:{props.author.id}</p>
      <button
        className='btn btn-danger'
        onClick={() => {
          props.delete(props.author.id);
        }}>
        Remove
      </button>
    </div>
  );
}

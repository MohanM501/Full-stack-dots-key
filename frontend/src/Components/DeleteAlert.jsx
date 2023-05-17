import React from 'react'

const DeleteAlert = ({handleNo,handleYes}) => {
  return (
    <div>
        <h2>Confirm Delete</h2>
        <p>Are you want to Delete</p>
        <button onClick={handleYes}>YES</button>
        <button onClick={handleNo}>NO</button>
    </div>
  )
}

export default DeleteAlert
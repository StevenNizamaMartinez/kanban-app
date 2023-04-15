import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import "./BoardHeader.css"
import { useList } from '../../context/ListContext';
import EmojiPicker from '../Library/EmojiPicker';
import { useBoard } from '../../context/BoardContext';

function BoardHeader({ board }) {
  const { id } = useParams()
  const { lists, setShowForm, showForm } = useList()
  const { setBoards, updateBoard } = useBoard()
  const [show, setShow] = useState(false)
  const [showInput, setShowInput] = useState(false)
  const [title, setTitle] = useState(false)
  const [description, setDescription] = useState(false)

  const handleAddSection = () => {
    setShowForm(!showForm)
  }

  const handleEmoji = (result) => {
    setBoards((prev) => {
      return prev?.map((board) => board?._id === id ? { ...board, icon: result.native } : board)
    })
    setShow(!show)
    updateBoard.mutate({ boardId: id, board: { icon: result.native } })
  }

  const handleClick = () => {
    setShow(!show)
  }

  const handleChange = ({ target }) => {
    setBoards(prev => {
      return prev?.map((board) => board?._id === id ? { ...board, [target.name]: target.value } : board)
    })
  }

  const handleBlur = ({ target }) => {
    if (target.value === '') {
      setBoards(prev => {
        return prev?.map((board) => board?._id === id ? { ...board, [target.name]: "Untitled" } : board)
      })
    }
    updateBoard.mutate({ boardId: id, board: { [target.name]: target.value } })
    setShowInput(!showInput)
  }

  const handleInput = (e) => {
    if (e.target.name === 'title') setTitle(!title)
    if (e.target.name === 'description') setDescription(!description)
    setShowInput(!showInput)
  }

  return (
    <div className=' board-content board-header slide-left'>
      {
        show && <EmojiPicker handleEmoji={handleEmoji} />
      }
      <div className="board-title-container">
        <span className='board-icon' onClick={handleClick}>
          {board?.icon}
        </span>
        {
          showInput ?
            <input
              className="board-input board-input-title"
              type="text"
              name="title"
              onBlur={handleBlur}
              value={board?.title}
              onChange={handleChange} /> :
            <h2 onClick={handleInput} className='board-title'>  {board?.title}</h2>
        }
      </div>
      {
        showInput ?
          <input
            className="board-input board-input-description"
            type="text"
            name="description"
            onBlur={handleBlur}
            value={board?.description}
            onChange={handleChange} /> :
          <p onClick={handleInput} className='board-description'>{board?.description}</p>
      }

      <div className="board-button">
        <button onClick={handleAddSection}>ADD SECTION</button>
        <h4>{lists.filter(list => list.boardId === id).length} Sections</h4>
      </div>

    </div>
  )
}

export default BoardHeader

import React from 'react'
import { NavLink } from 'react-router-dom';
import { GoDiffAdded } from "react-icons/go";
import "./Sidebar.css"
import { useBoard } from '../../context/BoardContext';
import { FiLogOut } from "react-icons/fi";
import { useAuth } from '../../context/AuthContext';

function Sidebar() {

  const { boards, createBoard } = useBoard()
  const {logoutMutation} = useAuth()

  const handleAddBoard = () => {
    console.log('Add Board')
    createBoard.mutate()
  }

  const handlePage = (id) => {
    const prevBoard = localStorage.getItem('boardId')
    let prevPrevBoard = localStorage.getItem('prevBoardId')
    if (prevPrevBoard === id) {
      prevPrevBoard = prevBoard
    }
    localStorage.setItem('boardId', id)
    localStorage.setItem('prevBoardId', prevBoard)
  }

  const handleLogout = () => {
    logoutMutation.mutate()
    localStorage.removeItem('token')
    localStorage.removeItem('boardId')
    localStorage.removeItem('prevBoardId')
  }

  return (
    <aside className='sidebar-container'>
      <div className="sidebar-title">
        <h3 className='title-user'>
          <NavLink to='/home'>Kanban App</NavLink>
        </h3>
        <span onClick={handleLogout}><FiLogOut/></span>
      </div>
      <div className="sidebar-favorite">
        <h4 className='sidebar-section-title'>Favorites</h4>
        <div className="favorite-boards">
          {
            boards?.filter(board => board.favorite === true).map(board => (
              <p key={board?._id} className='sidebar-title-board scale-up-center '>
                <NavLink onClick={() => handlePage(board?._id)} to={`/home/${board?._id}`}>
                  {board.icon} {board.title}
                </NavLink>
              </p>
            ))
          }
        </div>
      </div>
      <div className="sidebar-private">
        <h4 className='sidebar-section-title'>
          Private
          <span onClick={handleAddBoard}><GoDiffAdded /></span>
        </h4>

        <div className="private-boards">
          {
            boards?.map(board => (
              <p key={board?._id} className='sidebar-title-board'>
                <NavLink onClick={() => handlePage(board?._id)} to={`/home/${board?._id}`}>
                  {board.icon} {board.title}
                </NavLink>
              </p>
            ))
          }
        </div>
      </div>
    </aside>
  )
}

export default Sidebar

import React from 'react'
import { useParams } from 'react-router-dom'
import { useBoard } from '../context/BoardContext'
import { BsStarFill,BsTrashFill } from "react-icons/bs"
import "./styles/Board.css"
import { useQueryClient } from '@tanstack/react-query'
import Swal from 'sweetalert2'
import BoardHeader from '../components/Layout/BoardHeader'
import List from '../components/Layout/List'

function Board() {
  const queryClient = useQueryClient()
  const { id } = useParams()
  const { boards, setBoards, updateBoard, deleteBoard } = useBoard()
  const board = boards?.find(board => board?._id === id)


  const handleDelete = () => {
    
    Swal.fire({
      title: '¿Está seguro que desea eliminar esto?',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      customClass: {
        backdrop: 'swal2-backdrop-custom-class',
        popup: 'swal2-popup-custom-class'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        setBoards(boards?.filter(board => board?._id !== id))
        deleteBoard.mutate({boardId: board?._id})
        queryClient.invalidateQueries(['boards'])
      }
    });

  }

  const handleFavorite = () => {
    const favorite = board.favorite
    setBoards(boards?.map(board => board._id === id ? {...board, favorite: !favorite} : board))
    updateBoard.mutate({boardId: id, board:{favorite: !favorite}})
    queryClient.invalidateQueries(['boards'])
  }

  return (
    <>
    <main className='board-container'>
      <div className="board-icons">
        <span className='trash' onClick={handleDelete} ><BsTrashFill /></span>
        <span 
        className={board?.favorite ? 'star favorite' : 'star'}
        onClick={handleFavorite} ><BsStarFill /></span>
      </div>
        <BoardHeader board={board} />
        <hr className='board-line'/>
        <List />

    </main>
    </>
  )
}

export default Board

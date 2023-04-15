import { createContext, useContext, useState } from "react";
import { createBoardRequest, deleteBoardRequest, getBoardsRequest, updateBoardRequest } from "../api/boardApi";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const BoardContext = createContext();

export const BoardProvider = ({ children }) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [boards, setBoards] = useState([])

  const getBoard = () => {
    return useQuery({
      queryKey: ['boards'],
      queryFn: getBoardsRequest,
      onSuccess: (data) => {
        setBoards(data)
      }
    })
  }

  const createBoard = useMutation({
    mutationKey: ['boards'],
    mutationFn : createBoardRequest,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['boards'])
    }
  }
  )
  
  const updateBoard = useMutation({
    mutationFn : updateBoardRequest,
  }
  )

  const deleteBoard = useMutation({
    mutationFn : deleteBoardRequest,
    onSuccess: () => {
      queryClient.invalidateQueries(['boards'])
      const prevBoard = localStorage.getItem('prevBoardId')
      if (!prevBoard) return navigate(`/home/${boards[0]?._id}`)
      const existBoard = boards.find(board => board._id === prevBoard)
      if (!existBoard) return navigate(`/home/${boards[0]?._id}`)
      console.log(existBoard._id);
      navigate(`/home/${existBoard._id}`)
    }
  }
  )


  return (
    <BoardContext.Provider value={{ getBoard, createBoard, deleteBoard, updateBoard, boards,setBoards }} >
      {children}
    </BoardContext.Provider>
  )
}

export const useBoard = () => {
  return useContext(BoardContext)
}

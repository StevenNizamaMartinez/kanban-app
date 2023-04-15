import { useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getBoardsRequest } from '../api/boardApi'
import { getListsRequest } from '../api/listApi'
import { getCardsRequest, updateCardPositionRequest } from '../api/cardApi'

export function useQueryBoard() {
  const [boards, setBoards] = useState([])

  useQuery({
    queryKey: ['boards'],
    queryFn : getBoardsRequest,
    onSuccess: (data) => {
      setBoards(data)
    }
  })

  return boards

}


export function useQueryList() {
  const [lists, setLists] = useState([])

  useQuery({
    queryKey: ['lists'],
    queryFn : getListsRequest,
    onSuccess: (data) => {
      setLists(data)
    }
  })

  return {lists,setLists}

}


export function useQueryCard() {
  const [cards, setCards] = useState([])

  useQuery({
    queryKey: ['cards'],
    queryFn : getCardsRequest,
    onSuccess: (data) => {
      setCards(data)
    }
  })

  const updateCardPosition = useMutation({
    mutationFn : updateCardPositionRequest
  })
  

  return {cards,setCards,updateCardPosition}
} 

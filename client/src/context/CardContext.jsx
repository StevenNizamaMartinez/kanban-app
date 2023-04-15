import { createContext, useContext, useState } from "react";
import { createCardRequest, deleteCardRequest, getCardsRequest, updateCardPositionRequest, updateCardRequest } from "../api/cardApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const CardContext = createContext();

export const CardProvider = ({ children }) => {
  const queryClient = useQueryClient()
  const [cards, setCards] = useState([])

  const getCard = () => {
    return useQuery({
      queryKey: ['cards'],
      queryFn: getCardsRequest,
      onSuccess: (data) => {
        setCards(data)
      },
      onMutate: (data) => {
        console.log(data);
      }
    })
  }

  const updateCardPosition = useMutation({
    mutationFn: updateCardPositionRequest
  })

  const createCard = useMutation({
    mutationFn: createCardRequest,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['cards'])
    }
  })

  const deleteCard = useMutation({
    mutationFn: deleteCardRequest,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['cards'])
    }
  })

  const updateCard = useMutation({
    mutationFn: updateCardRequest,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['cards'])
    }
  })

  return (
    <CardContext.Provider value={{ getCard, createCard, deleteCard, updateCard, updateCardPosition, cards, setCards }} >
      {children}
    </CardContext.Provider>
  )
}

export const useCard = () => {
  return useContext(CardContext)
}

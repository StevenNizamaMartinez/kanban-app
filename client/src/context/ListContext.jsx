import { createContext, useContext, useState } from "react";
import { createListRequest, deleteListRequest, getListsRequest, updateListRequest } from "../api/listApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const ListContext = createContext();

export const ListProvider = ({ children }) => {
  const queryClient = useQueryClient()
  const [lists, setLists] = useState([])
  const [showForm, setShowForm] = useState(false)

  const getList = () => {
    return useQuery({
      queryKey: ['lists'],
      queryFn: getListsRequest,
      onSuccess: (data) => {
        setLists(data)
      }
    })
  }

  const createList = useMutation({
    mutationFn: createListRequest,
    onSuccess: () => {
      queryClient.invalidateQueries(['lists'])
    }
  })

  const deleteList = useMutation({
    mutationFn: deleteListRequest,
    onSuccess: () => {
      queryClient.invalidateQueries(['lists'])
    }
  })

  const updateList = useMutation({
    mutationFn: updateListRequest,
    onSuccess: () => {
      queryClient.invalidateQueries(['lists'])
    }
  })


  return (
    <ListContext.Provider value={{ 
      lists, getList, createList, deleteList, updateList,
       setLists, showForm, setShowForm 
       }} >
      {children}
    </ListContext.Provider>
  )
}

export const useList = () => {
  return useContext(ListContext)
}

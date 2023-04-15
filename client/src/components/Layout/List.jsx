import React, {  useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { BiTrashAlt } from "react-icons/bi"
import { IoMdAdd } from "react-icons/io"
import Card from './Card';
import "./List.css"
import Swal from 'sweetalert2';
import { useList } from '../../context/ListContext';
import { useCard } from '../../context/CardContext';
import { handleDragEnd } from '../../custom/HandleDragEnd';

function List() {

  const containerRef = useRef(null);
  const { id } = useParams()
  const [listFormStates, setListFormStates] = useState({});
  const [listLoading, setListLoading] = useState(false)
  const { lists, createList, deleteList, updateList, showForm, setShowForm } = useList()
  const { cards, createCard, deleteCard, updateCard, setCards, updateCardPosition } = useCard()
  const listBoard = lists?.filter(list => list.boardId === id)

  const handleCreateList = (e) => {
    e.preventDefault()
    if (e.target.title.value !== '') {
      setListLoading(true)
      const data = { [e.target.title.name]: e.target.title.value, boardId: id }
      createList.mutate(data, {
        onStart: () => setListLoading(true),
        onSuccess: () => setListLoading(false),
        onError: () => setListLoading(false),
      })
      setTimeout(()=>{
        setShowForm(false)
      },100)
    }
  }

  const handleDeleteList = (e, id) => {
    e.preventDefault()
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
        deleteList.mutate(id)
      }
    });
  }

  const handleDeleteClick = () => {
    Swal.fire({
      title: '¿Está seguro que desea eliminar esto?',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        // El usuario ha confirmado que quiere eliminar, se puede ejecutar la lógica de eliminación aquí
      }
    });
  };


  const handleClickCard = (listId) => {
    setListFormStates((prevState) => ({
      ...prevState,
      [listId]: true,
    }));
  }

  const handleCreateCard = (e, listId) => {
    e.preventDefault()
    if (e.target.title.value !== '') {
      const data = { [e.target.title.name]: e.target.title.value, listId }
      createCard.mutate(data)
      setListFormStates((prevState) => ({
        ...prevState,
        [listId]: false,
      }));
    }
  }

  return (
    <DragDropContext onDragEnd={(result) => handleDragEnd({ result, cards, setCards, updateCardPosition })}>
      <section className='list-container board-content'>
        {
          showForm && <form className="input-list tracking-in-expand" onSubmit={handleCreateList}>
            <input type="text" placeholder="Add a list" name='title' /> 
            <button type='submit'> {!listLoading ? "Save Button" : "Loading"} </button>
          </form>
        }

        {
          listBoard?.map((list, index) => (
            <div className='list tracking-in-expand' key={list._id}>
              <div className="list-title">
                <h2>{list.title}</h2>
                <div className="list-icons">
                  <span onClick={(e) => handleDeleteList(e, list?._id)} className='trash'><BiTrashAlt /></span>
                  <span onClick={() => handleClickCard(list?._id)} className='add'><IoMdAdd /></span>
                </div>
              </div>
              <div className="list-cards">
                < Droppable key={list._id} index={index} droppableId={list._id} >
                  {(provided) => (
                    <div
                      key={list._id}
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className='card-container'>
                      {
                        listFormStates[list._id] && <form className='form-card' onSubmit={(e) => handleCreateCard(e, list?._id)}>
                          <input ref={containerRef} type="text" placeholder="Add a card" name='title' />
                          <button type='submit'>Save Card</button>
                        </form>
                      }
                      <Card list={list}/>
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable >
              </div>
            </div>
          ))

        }

      </section >
    </DragDropContext >
  )
}

export default List



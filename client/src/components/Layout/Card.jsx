import { Draggable } from '@hello-pangea/dnd'
import { useState } from 'react';
import { useCard } from '../../context/CardContext';
import Modal from '../Library/Modal';


function Card({ list }) {
  const { cards } = useCard()
  const [data, setData] = useState({})
  const [isOpen, setIsOpen] = useState(false);

  if (!cards) {
    return "Loading...";
  }

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleCard = (id) => {
    setTimeout(() => {
      setData(cards?.find((card) => card._id === id));
      setIsOpen(true);
    }, 100)
  }

  return (
    <>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} card={data} />
      {
        cards?.filter(card => card.listId === list._id).map((card, i) => (
          <Draggable key={card?._id} draggableId={card._id} index={i} >
            {
              (provided) => (
                <div
                  key={card?._id}
                  onClick={() => handleCard(card?._id)}
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className='card'>
                  <h3>{card.title}</h3>
                </div>
              )
            }
          </Draggable>
        ))
      }
    </>
  )
}

export default Card


export const handleDragEnd = ({ result, cards, setCards,updateCardPosition }) => {
  const { source, destination } = result;
  if (!destination) {
    return;
  }
  const sourceListId = source.droppableId;
  const destListId = destination.droppableId;

  if (sourceListId === destListId) {
    const sourceCards = [...cards.filter(card => card.listId === sourceListId)];
    const movedCard = sourceCards[source.index];
    sourceCards.splice(source.index, 1);
    const destIndex = destination.index;
    sourceCards.splice(destIndex, 0, movedCard);
    const newCards = [...cards.filter(card => card.listId !== sourceListId), ...sourceCards];
    setCards(newCards);
    updateCardPosition.mutate(sourceCards)
  } else {
    const sourceCards = [...cards.filter(card => card.listId === sourceListId)];
    const movedCard = { ...sourceCards[source.index], position: destination.index, listId: destListId };
    let updatedSourceCards = sourceCards.filter((card, index) => index !== source.index);
    updatedSourceCards = updatedSourceCards.map((card, index) => ({ ...card, position: index }));
    const destinyCards = [...cards.filter(card => card.listId === destListId)];
    const destinyIndex = destination.index;
    destinyCards.splice(destinyIndex, 0, movedCard);
    const newCards = [...cards.filter(card => card.listId !== sourceListId && card.listId !== destListId), ...updatedSourceCards, ...destinyCards];
    setCards(newCards);
    updateCardPosition.mutate(destinyCards)
  }
};





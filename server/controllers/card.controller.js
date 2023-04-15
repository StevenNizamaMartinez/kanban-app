import mongoose from "mongoose";
import cardModel from "../models/card.model.js";

export const getCards = async (req, res) => {
  const { id } = res.locals.data;
  try {
    const cards = await cardModel.find({ userId: id });
    res.json(cards.sort((a, b) => a.position - b.position));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCard = async (req, res) => {
  const { id } = res.locals.data;
  const { listId } = req.body;
  try {
    const cards = await cardModel.find({listId});
    const position = cards.length;
    const newCard = new cardModel({ ...req.body, position, userId: id });
    await newCard.save();
    res.json(newCard);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const updateCard = async (req, res) => {
  const { id } = req.params;
  const { title,content } = req.body;
  try {
    const card = await cardModel.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );
    res.json(card);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCard = async (req, res) => {
  const { id } = req.params;
  try {
    const card = await cardModel.findByIdAndDelete(id);
    res.json(card);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateCardPosition = async (req,res) => {
  const cards = req.body
  console.log(req.body);
  try {
    // Itera sobre las tarjetas y actualiza sus posiciones en la base de datos
    for (const [index, card] of cards.entries()) {
      const { _id: cardId, listId, position } = card;
      await cardModel.findByIdAndUpdate(new mongoose.Types.ObjectId(cardId), { listId, position: index });
    }
    res.send("Actualizando...")
    console.log('Las posiciones de las tarjetas se han actualizado correctamente');
  } catch (err) {
    console.error(`Error al actualizar las posiciones de las tarjetas: ${err}`);
  }
}


// export const updateCardPosition = async (req, res) => {
//   const { id } = req.params;
//   const { positionInit, positionEnd } = req.body;
  
//   try {
//     // Obtener todas las cartas de la lista
//     const cards = await cardModel.find({ listId: id });
//     const cardToMove = cards.find(card => card.position === parseInt(positionInit));
//     const finalPosition = parseInt(positionEnd);
//     const isMovingUp = cardToMove.position > finalPosition;
//     console.log(finalPosition);
//     // Actualizar la posición de la carta que se está moviendo
//     await cardModel.findByIdAndUpdate(
//       cardToMove._id,
//       { position: finalPosition },
//       { new: true }
//     );

//     // Actualizar las posiciones de las demás cartas
//     const cardsToUpdate = isMovingUp
//       ? cards.filter(card => card.position >= finalPosition && card.position < cardToMove.position)
//       : cards.filter(card => card.position > cardToMove.position && card.position <= finalPosition);

//     for (let i = 0; i < cardsToUpdate.length; i++) {
//       const card = cardsToUpdate[i];
//       const newPosition = isMovingUp ? card.position + 1 : card.position - 1;
//       await cardModel.findByIdAndUpdate(card._id, { position: newPosition }, { new: true });
//     }
//     const cardsUpdate = await cardModel.find({ listId: id });
//     res.send(cardsUpdate);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

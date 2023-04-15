import boardModel from "../models/board.model.js";

export const getBoards = async (req, res) => {
  const { id } = res.locals.data;
  try {
    const boards = await boardModel.find({ userId: id });
    res.json(boards);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const createBoard = async (req, res) => {
  const { id } = res.locals.data;
  try {
    const newBoard = new boardModel({ userId: id });
    await newBoard.save();
    res.json(newBoard);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const deleteBoard = async (req, res) => {
  const { id } = req.params;
  try {
    const board = await boardModel.findByIdAndRemove(id);
    if (!board) return res.status(404).json({ message: "Board not found" });
    res.json(board);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const updateBoard = async (req, res) => {
  const { id } = req.params;
  const updateFields = req.body;
  console.log(updateFields);
  if (!updateFields.title) {
    updateFields.title = "Untitled Board";
  }
  try {
    const board = await boardModel.findByIdAndUpdate(id, updateFields, {new:true});
    if (!board) return res.status(404).json({ message: "Board not found" });
    res.json(board);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

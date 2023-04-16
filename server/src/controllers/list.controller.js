import listModel from "../models/list.model.js";

export const getLists = async (req, res) => {
  const { id } = res.locals.data;
  try {
    const list = await listModel.find({ userId: id });
    if (!list) return res.status(404).json({ message: "List not found" });
    res.json(list);
  }
  catch (error) {
    res.status(500).json({ message: error });
  }
}


export const createList = async (req, res) => {
  const { id } = res.locals.data;
  const data = req.body;
  console.log(data);
  if (!data.boardId) return res.status(400).json({ message: "BoardId is required" })
  try {
    const lists = await listModel.find({ userId: id });
    const position = lists.length;
    const newList = new listModel({ ...data, position, userId: id });
    const list = await newList.save();
    res.json(list);
  }
  catch (error) {
    res.status(500).json({ message: error });
  }
}

export const updateList = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  try {
    const list = await listModel.findByIdAndUpdate(id,{title},{new:true});
    if (!list) return res.status(404).json({ message: "List not found" });
    res.json(list);
  }
  catch (error) {
    res.status(500).json({ message: error });
  }
}

export const deleteList = async (req,res) => {
  const { id } = req.params;
  try {
    const list = await listModel.findByIdAndDelete(id);
    if (!list) return res.status(404).json({ message: "List not found" });
    res.json(list);
  }
  catch (error) {
    res.status(500).json({ message: error });
  }
}

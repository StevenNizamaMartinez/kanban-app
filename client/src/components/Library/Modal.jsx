import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ReactQuill from "react-quill";
import { useCard } from "../../context/CardContext";
import "react-quill/dist/quill.snow.css";
import "./Modal.css"

function Modal({ isOpen, setIsOpen, card }) {
  const { updateCard } = useCard()
  const [value, setValue] = useState(card?.content);

  useEffect(() => {
    setValue(card?.content)
  }, [card?.content])

  const handleClose = () => {
    setIsOpen(false);
    updateCard.mutate({ id: card?._id, content: value })
  }

  const handleChange = (newValue) => {
    setValue(newValue);
  }

  return (
    <>
      {isOpen ? ReactDOM.createPortal(
        <div className="modal-overlay scale-up-center">
          <div className="modal">
            <h1 className="modal-title">Hola</h1>
            <button className="modal-close" onClick={handleClose}>
              Cerrar
            </button>
            <ReactQuill value={value} onChange={handleChange} />
          </div>
        </div>,
        document.getElementById("modal-root")
      ) : null}
    </>
  );
}

export default Modal;

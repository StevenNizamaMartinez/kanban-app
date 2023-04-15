export const getCardStyle = (isDragging, draggableStyle) => {
  // Estilo base de la tarjeta
  const style = {
    userSelect: "none",
    padding: 16,
    margin: "0 0 8px 0",
    minHeight: "50px",
    borderRadius: "3px",
    background: "#fff",
    boxShadow: "0px 1px 1px rgba(0,0,0,0.2)",
    transition: "background-color 0.2s ease",
  };

  // Si la tarjeta está siendo arrastrada, cambia su estilo
  if (isDragging) {
    style.background = "#e6e6e6";
    style.boxShadow = "0px 4px 3px rgba(0,0,0,0.2)";
  }

  // Combinar los estilos base con los estilos proporcionados por la biblioteca
  return {
    ...style,
    ...draggableStyle,
  };
};

const Note = ({ note, toggle }) => {
  let label = note.important ? 'make unimportant' : 'make important';
  return (
    <>
      <span>{note.content}</span>
      <button onClick={toggle}>{label}</button>
    </>
  );
}

export default Note

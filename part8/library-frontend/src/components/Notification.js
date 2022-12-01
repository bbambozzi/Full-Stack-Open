const Notification = ({ msg }) => {
  if (!msg) {
    return null;
  }
  return (
    <>
      <p>{msg}</p>
    </>
  )

}

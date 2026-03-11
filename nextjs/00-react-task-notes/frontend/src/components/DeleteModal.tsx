import "./styles/DeleteModal.css"

interface Props {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

function DeleteModal({isOpen, onClose, onConfirm}:Props){
  if(!isOpen) return null;

  return(
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Delete Task</h3>
        <p>Are you sure you want to delete this task?</p>

        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button className="delete-btn" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal;

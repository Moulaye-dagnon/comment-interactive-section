import './modal.css'
export function Modal({handleCancel, handleDelete}){
	return (

		<>
			
			<div className='shadow'>
			<div className='Modal'>
			<h3 className="Modal-title">
				Delete Comment 
			</h3>
			<p className="comment-warning">
			Are you sure you want to delete this comment? This will remove the comment and can’t be undone.
			</p>
			<div className='btn-modal'>
			<button onClick={handleCancel} className="btn-cancel">Cancel</button>
			<button onClick={handleDelete} className="btn-delete">yes, delete</button>
			</div>
		</div>
			</div>
		
		</>
	)
}
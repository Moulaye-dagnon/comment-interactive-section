import { useContext, useEffect, useReducer, useState } from "react";
import "./allComments.css";
import { Comments } from "../CommentItem/commentItem.jsx";
import { FormComment } from "../main-Form/FormContent.jsx";
import { currentUserContext, setdataCommentsContext } from "../../utils/contex.jsx";
import { CommentReducteur } from "../../Function/CommentReducter.jsx";
import { Modal } from "../Modal/modal.jsx";
export function AllComments({ data }) {
  const [Data, setData] = useState(data);
  const { currentUser, comments } = Data;
  const [dataComments, setDataComments] = useReducer(
    CommentReducteur,
    comments
  );
  const [displayModal, setdislplayModal] = useState(false)
  const [idDelete,setidDelete]= useState('')

	useEffect(()=>{
		const AllData = JSON.parse((localStorage.getItem('Comments ')))
		if(AllData){
			setDataComments({
				type: 'localStorage',
				Data : AllData
			})
		}
	},[])
	const handleDelete = ()=>{
		setDataComments({
			type: "Deleted",
			id: idDelete,
		  });
		setdislplayModal(false)
	}
	const handleCancel = ()=>{
		setdislplayModal(false)
	}
	
	if(displayModal){
		document.body.classList = 'body'
	}else{
		document.body.classList = ''
	}
  return (
		<>
		
			<currentUserContext.Provider value={currentUser}>
				<setdataCommentsContext.Provider value={setDataComments}>
					{displayModal && <Modal handleCancel={handleCancel} handleDelete={handleDelete}/>}
				<div className="Container ">

					<section className="Section-Comments">

					{dataComments.map((comment) => {
						if (comment.replies) {
						return (
							<div key={comment.id} className="all">
							{
								<Comments
								commentData={comment} 
								idDelete={setidDelete}
								Modal={setdislplayModal}
								/>
							}
							<div className="reply">
								{comment.replies.map((reply) => {
								return (
									<Comments
									key={reply.id}
									commentData={reply}
									idDelete={setidDelete}
									Modal={setdislplayModal}
									/>
								);
								})}
							</div>
							</div>
						);
						}
						return (
						<div key={comment.id} className="all">
							<Comments commentData={comment} />
						</div>
						);
					})}
					</section>

					<FormComment/>
				</div>
				</setdataCommentsContext.Provider>
			</currentUserContext.Provider>
		</>
  );
}

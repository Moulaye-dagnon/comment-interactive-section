import { useContext, useReducer, useState } from "react";
import "./allComments.css";
import { Comments } from "../CommentItem/commentItem.jsx";
import { FormComment } from "../main-Form/FormContent.jsx";
import { currentUserContext, setdataCommentsContext } from "../../utils/contex.jsx";
import { CommentReducteur } from "../../Function/CommentReducter.jsx";
export function AllComments({ data }) {
  const [Data, setData] = useState(data);
  const { currentUser, comments } = Data;
  const [dataComments, setDataComments] = useReducer(
    CommentReducteur,
    comments
  );

  return (
		<currentUserContext.Provider value={currentUser}>
			<setdataCommentsContext.Provider value={setDataComments}>
			<div className="Container">
				<section className="Section-Comments">
				{dataComments.map((comment) => {
					if (comment.replies) {
					return (
						<div key={comment.id} className="all">
						{
							<Comments
							commentData={comment}
							currentUser={currentUser}
							/>
						}
						<div className="reply">
							{comment.replies.map((reply) => {
							return (
								<Comments
								key={reply.id}
								commentData={reply}
								currentUser={currentUser}
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

				<FormComment
				currentUser={currentUser}
				/>
			</div>
			</setdataCommentsContext.Provider>
		</currentUserContext.Provider>
  );
}

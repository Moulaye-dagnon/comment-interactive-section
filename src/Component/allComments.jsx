import { useContext, useState } from "react";
import "./allComments.css";
import { Comments } from "./commentItem";
import { FormComment } from "./FormContent";
import { dataCommentsContext } from "../utils/contex.jsx";
export function AllComments({ data }) {
  const [Data, setData] = useState(data);
  const { currentUser, comments } = Data;
  const [dataComments, setDataComments] = useState(comments);
  const [editComment, setEditComment] = useState("");
  const [replyComment, setReplyComment] = useState("");
  const [recordComment, setRecordComment] = useState("");


  

  return (
	
    <dataCommentsContext.Provider value={dataComments}>
      <div className="Container">
        <section className="Section-Comments">
          {dataComments.map((comment) => {
            if (comment.replies) {
              return (
                <div key={comment.id} className="all">
                  {
                    <Comments
                      commentData={comment}
                      setDataComments={setDataComments}
                      dataComments={dataComments}
                      currentUser={currentUser}
                      setEditComment={setEditComment}
                      editComment={editComment}
                    />
                  }
                  <div className="reply">
                    {comment.replies.map((reply) => {
                      return (
                        <Comments
                          key={reply.id}
                          commentData={reply}
                          setDataComments={setDataComments}
                          dataComments={dataComments}
                          currentUser={currentUser}
                          setEditComment={setEditComment}
                          editComment={editComment}
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
          setDataComments={setDataComments}
          dataComments={dataComments}
        />
      </div>
    </dataCommentsContext.Provider>
  );
}

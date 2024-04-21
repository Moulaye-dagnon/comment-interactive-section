import { useContext, useReducer, useState } from "react";
import "./allComments.css";
import { Comments } from "../CommentItem/commentItem.jsx";
import { FormComment } from "../main-Form/FormContent.jsx";
import { dataCommentsContext } from "../../utils/contex.jsx";
import { CommentReducteur } from "../../Function/CommentReducter.jsx";
export function AllComments({ data }) {
  const [Data, setData] = useState(data);
  const { currentUser, comments } = Data;
  const [dataComments, setDataComments] = useReducer(
    CommentReducteur,
    comments
  );

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
                      currentUser={currentUser}
                    />
                  }
                  <div className="reply">
                    {comment.replies.map((reply) => {
                      return (
                        <Comments
                          key={reply.id}
                          commentData={reply}
                          setDataComments={setDataComments}
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
          setDataComments={setDataComments}
        />
      </div>
    </dataCommentsContext.Provider>
  );
}
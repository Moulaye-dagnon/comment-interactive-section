import "./CommentItem.css";
import icon_plus from "../../assets/icon-plus.svg";
import icon_minus from "../../assets/icon-minus.svg";
import icon_reply from "../../assets/icon-reply.svg";
import icon_delete from "../../assets/icon-delete.svg";
import icon_edit from "../../assets/icon-edit.svg";

import { useContext, useEffect, useState } from "react";
import { FormComponent } from "../Form/Form";
import { currentUserContext, setdataCommentsContext } from "../../utils/contex";
// import { Modal } from "../Modal/modal";
export function Comments({ commentData, idDelete,Modal}) {

	

  const setDataComments = useContext(setdataCommentsContext);
  const currentUser = useContext(currentUserContext);

  const [Reply, setReply] = useState(false);
  const [Edit, setEdit] = useState(false);
  //For incremnet the Score
  const incrementLike = (id) => {
    setDataComments({
      type: "incrementScore",
      id: id,
    });
  };

  //For increment the Score
  const decrementLike = (id) => {
    setDataComments({
      type: "decrementScore",
      id: id,
    });
  };

  // that allow to display the form for reply
  const displayReplyForm = () => {
    setReply((v) => !v);
  };
  // the function for reply a comment
  const handleReplyComment = (e) => {
    e.preventDefault();
    setDataComments({
      type: "added",
      value: e.target[0].value,
      CommentToReply: commentData,
      currentUser: currentUser,
    });
    e.target.reset();
    setReply((v) => !v);
  };

  //for Delete a comment
  const handleDelete = (id) => {
	idDelete(id)
	Modal(true)
  };

  //that allow to display the form for Edit ta comment of current user
  const FormEdit = ({ id }) => {
    const submit = (e) => {
      e.preventDefault();
      setDataComments({
        type: "Edited",
        value: e.target[0].value,
        id: id,
      });

      setEdit(false);
    };
    return <FormComponent pseudo={false} submit={submit} btnName={"update"} />;
  };

  return (
    <div className="CommentItemsWithReply">
      <div className="CommentItem">
        <div className="Comment-header">
          <div className="profil">
            <picture>
              <source srcSet={commentData.user.image.webp} />
              <img
                className="comment-profil"
                src={commentData.user.image.png}
                alt=""
              />
            </picture>

            <span className="profil-pseudo">{commentData.user.username}</span>

            {commentData.user.username == currentUser.username ? (
              <span className="profil-you">you</span>
            ) : (
              ""
            )}

            <span className="comment-date">{commentData.createdAt} </span>
          </div>
          {Edit ? (
            <FormEdit id={commentData.id} />
          ) : (
            <p className="comment-body">
              {" "}
              {commentData.replyingTo ? (
                <>
                  <span>@{commentData.replyingTo}</span> {commentData.content}
                </>
              ) : (
                commentData.content
              )}
            </p>
          )}
        </div>
        <div className="Comment-like">
          <img
            className="icon=plus"
            onClick={(e) => incrementLike(commentData.id)}
            src={icon_plus}
            alt=""
          />
          <span> {commentData.score} </span>
          <img
            className="icon-minus"
            onClick={(e) => decrementLike(commentData.id)}
            src={icon_minus}
            alt=""
          />
        </div>
        {commentData.user.username == currentUser.username ? (
          <div className="Edit-Delete">
            <div
              onClick={(e) => handleDelete(commentData.id)}
              className="Comment-Delete"
            >
              <img src={icon_delete} alt="" />
              Delete
            </div>
            <div onClick={(e) => setEdit((e) => !e)} className="Comment-Edit">
              <img src={icon_edit} alt="" />
              Edit
            </div>
          </div>
        ) : (
          <div onClick={displayReplyForm} className="Comment-Reply">
            <img src={icon_reply} alt="" /> Reply
          </div>
        )}
      </div>
      {Reply && <FormComponent btnName={"Reply"} submit={handleReplyComment} />}
    </div>
  );
}

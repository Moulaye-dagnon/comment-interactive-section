import './CommentItem.css'
import icon_plus from '../assets/icon-plus.svg' 
import icon_minus from '../assets/icon-minus.svg' 
import icon_reply from '../assets/icon-reply.svg' 
import icon_delete from '../assets/icon-delete.svg' 
import icon_edit from '../assets/icon-edit.svg' 

import { useContext, useState } from 'react'
export function Comments({commentData , setDataComments , dataComments,currentUser,setEditComment,editComment}){
	const [Reply , setReply ] = useState(false)
	


	const incrementLike = (id)=>{
		let incrementLikeComment;
		let object = dataComments.find((comment)=> comment.id == id)
		if (object) {
			 incrementLikeComment = dataComments.map((comment)=>{
				if(comment.id == id){
					let item = {...comment , 'score': comment.score +1}
					return item
				}
				return comment
			})
		}
		// else{
		// 	incrementLikeComment = dataComments.map((comment)=>{
		// 			let commentReplies = comment.replies.map((reply)=>{
		// 				if(reply.id == id){
		// 					let item = {...comment , 'score': comment.score +1}
		// 					return item
		// 				}
		// 				return comment
		// 			})
		// 			let  OneComment = {...comment , 'replies': commentReplies}
	
		// 			return  OneComment || comment
				
		// 	})
			
		// }
		setDataComments(incrementLikeComment)

	}
	const decrementLike = (id)=>{
		let decrementLikeComment;
		let object = dataComments.find((comment)=> comment.id == id)
		if (object) {
			decrementLikeComment = dataComments.map((comment)=>{
				if(comment.id == id){
					let item = {...comment , 'score': comment.score - 1}
					return item
				}
				return comment
			})
		}
		setDataComments(decrementLikeComment)
	}
	
	const handleReply = ()=>{
		setReply( v=> !v)
	}	
	const handleDelete = (id)=>{
		let updateData ;
		let object = dataComments.find((comment)=> comment.id == id)
		if (object) {
			updateData = dataComments.filter((comment)=>comment.id != id)
		} else {
			updateData = dataComments.map(comment=>{
				const deleteComment = comment.replies.filter(reply=>{
					return reply.id != id
				})
				 const OneComment = {...comment, 'replies': deleteComment } 
				
				 return OneComment
			})	
		}

		setDataComments(updateData)
 	}
	
	
	
	return (
			<>
					<div className='CommentItem'>
					<div className='Comment-header'>
						<div className='profil'>
						<picture>
							<source srcSet={commentData.user.image.webp}/>
							<img className='comment-profil' src={commentData.user.image.png} alt="" />
						</picture>
						
						<span className='profil-pseudo'>{commentData.user.username}</span>

						{commentData.user.username == 'juliusomo' ?(
							<span className='profil-you'>you</span>
						): ''}

						<span className='comment-date'>{commentData.score} mois </span>
						</div>
						<p className='comment-body'>{ commentData.replyingTo ? (
							<>
							<span>@{commentData.replyingTo}</span> {commentData.content}
							</>
						) : commentData.content
						}</p>
						
					</div>
					<div className='Comment-like'>
						<img className='icon=plus' onClick={(e)=>incrementLike(commentData.id)} src={icon_plus} alt="" />
						<span> {commentData.score} </span>
						<img className='icon-minus' onClick={(e)=>decrementLike(commentData.id)} src={icon_minus} alt="" />
					</div>
					{ 
					commentData.user.username == 'juliusomo' ?(
							<div className='Edit-Delete'>
								<div onClick={(e)=>handleDelete(commentData.id)} className="Comment-Delete">
									<img src={icon_delete} alt="" />
									Delete
								</div>
								<div  className='Comment-Edit'> 
									<img src={icon_edit} alt="" />
									Edit
								</div>
								
							</div>
							
						
					):
					( 
						<div onClick={handleReply} className='Comment-Reply'>
						<img   src={icon_reply} alt="" /> Reply
					</div>
						
					)
					}
				</div>

			</>
		
	)
}
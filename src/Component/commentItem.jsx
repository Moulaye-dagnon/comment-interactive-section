import './CommentItem.css'
import icon_plus from '../assets/icon-plus.svg' 
import icon_minus from '../assets/icon-minus.svg' 
import icon_reply from '../assets/icon-reply.svg' 
import icon_delete from '../assets/icon-delete.svg' 
import icon_edit from '../assets/icon-edit.svg' 

import { useContext, useState } from 'react'
import { FormComponent } from './Form'
export function Comments({commentData , setDataComments , dataComments,currentUser,setEditComment,editComment}){
	const [Reply , setReply ] = useState(false)
	const [Edit, setEdit]= useState(false)
	

	const incrementLike = (id)=>{
		let object = dataComments.find((comment)=> comment.id == id)
		if (object) {
			let incrementLikeComment = dataComments.map((comment)=>{
				if(comment.id == id){
					let item = {...comment , 'score': comment.score +1}
					return item
				}
				return comment
			})
			setDataComments(incrementLikeComment)

		}
		else{
			let incrementLikeComment = dataComments.map((comment)=>{
					if(comment.replies.length !== 0){
						let items = comment.replies.map(item=>{
							if(item.id == id){
								return {...item, 'score': item.score + 1}
							}
							return item
						})
						return {...comment , 'replies': items}
					}
					return comment
				
			})
			setDataComments(incrementLikeComment)
		}

	}
	const decrementLike = (id)=>{
		let object = dataComments.find((comment)=> comment.id == id)
		if (object) {
			let decrementLikeComment = dataComments.map((comment)=>{
				if(comment.id == id){
					let score = comment.score >0 ? comment.score - 1 : 0
					let item = {...comment , score }
					return item
				}
				return comment
			})
			setDataComments(decrementLikeComment)

		}else{
			let decrementLikeComment = dataComments.map((comment)=>{
				if(comment.replies.length !== 0){
					let items = comment.replies.map(item=>{
						if(item.id == id){
							let score = item.score >0 ? item.score - 1 : 0
							return {...item, 'score': score}
						}
						return item
					})
					return {...comment , 'replies': items}
				}
				return comment
			
		})
		setDataComments(decrementLikeComment)
		}
	}
	
	const displayReplyForm = ()=>{
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
	const FormEdit = ({id})=>{
			const submit = (e)=>{
				e.preventDefault()
				const value = e.target[0].value
				if(value){
					const verif = dataComments.find(f=> f.id == id)
				if(verif){
					let updateData = dataComments.map(comment=>{
						if(comment.id == id){
							return {...comment, 'content': value}
						}
						return comment
					})
					setDataComments(updateData)
				}else{
					let updateData = dataComments.map((comment)=>{
						if(comment.replies.length !== 0){
							let items= comment.replies.map(item=>{
								if(item.id == id){
									return {...item , 'content': value}
								}
								return item
							})
							
							return {...comment , 'replies': items}
						}
						return comment
					})
					setDataComments(updateData)
				}
					
				setEdit(false)
				}
			}
		return (
			<FormComponent pseudo={false}  submit={submit} btnName={'update'}/>
		)
	}
	const handleReplyComment = (e)=>{
		e.preventDefault()
		let value = e.target[0].value;
		const id = Math.random().toString(36).substring(2, 9);
		const currentTime = new Date();
		let newRecors = {
		  id: id,
		  content: value,
		  createdAt: Date.now(),
		  score: 0,
		  user: {
			image: {
			  png: "../../public/images/avatars/image-juliusomo.png",
			  webp: "../../public/images/avatars/image-juliusomo.webp",
			},
			username: currentUser.username,
		  },
          replyingTo: commentData.user.username,
		};
		let updateData = dataComments.map(comment=>{
			if(comment.id == commentData.id){
				if(comment.replies){
					let r = [newRecors, ...comment.replies ]
					return {...comment, 'replies': r}
				}
			}else {
				if(commentData.replyingTo && comment.user.username == commentData.replyingTo){
					let r = [ ...comment.replies, newRecors ]
					return {...comment, 'replies': r}
				}
				
			}

			

			return comment
		});
		setDataComments(updateData);
		e.target.reset();
		setReply( v=> !v)
	}
	
	return (
			<div className="CommentItemsWithReply">
					<div className='CommentItem'>
					<div className='Comment-header'>
						<div className='profil'>
						<picture>
							<source srcSet={commentData.user.image.webp}/>
							<img className='comment-profil' src={commentData.user.image.png} alt="" />
						</picture>
						
						<span className='profil-pseudo'>{commentData.user.username}</span>

						{commentData.user.username == currentUser.username ?(
							<span className='profil-you'>you</span>
						): ''}

						<span className='comment-date'>{commentData.createdAt}  </span>
						</div>
							{Edit ? ( <FormEdit id={commentData.id} />):(
									<p className='comment-body'>  { commentData.replyingTo ? (
										<>
										<span>@{commentData.replyingTo}</span> {commentData.content}
										</>
									) : commentData.content
									}</p>
								)
								}
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
								<div onClick={(e)=>setEdit(e=>!e)}  className='Comment-Edit'> 
									<img src={icon_edit} alt="" />
									Edit
								</div>
								
							</div>
							
						
					):
					( 
						<div onClick={displayReplyForm} className='Comment-Reply'>
						<img   src={icon_reply} alt="" /> Reply
					</div>
						
					)
					}
				</div>
				{Reply && <FormComponent btnName={'Reply'} submit={handleReplyComment} />}

			</div>
		
	)
}


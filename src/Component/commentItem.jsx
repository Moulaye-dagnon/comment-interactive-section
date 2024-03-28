import './CommentItem.css'
import icon_plus from '../assets/icon-plus.svg' 
import icon_minus from '../assets/icon-minus.svg' 
import icon_reply from '../assets/icon-reply.svg' 
import { dataContext, setdataContext } from '../utils/contex'
import { useContext, useState } from 'react'
import { Form } from './form'
export function Comments({commentData}){
	const [likeValue, setlikeValue ] = useState(commentData.score)
	const [Reply , setReply ] = useState(false)
	
	const [Value , setValue] = useState('')
	const incrementLike = ()=>{
		setlikeValue(l=> l+1)
	}
	const decrementLike = ()=>{
		setlikeValue(l=> l-1)
	}
	
	const handleReply = ()=>{
		setReply( v=> !v)
	}	

	const setData = useContext(setdataContext)
	const Data = useContext(dataContext)

	// const handleSubmit= (e)=>{
	// 	e.preventDefault()
	// 	console.log(t);
	// 	// setData(
	// 	// 	Data.comments.find(f=>f.id == item.id).replies.push({
	// 	// 		'id':1
	// 	// 	})
	// 	// )
	// }
	return (
			<>
					<div className='CommentItem'>
					<div className='Comment-header'>
						<div className='profil'>
						<img className='comment-profil' src={commentData.user.image.png} alt="" />
						<span className='profil-pseudo'>{commentData.user.username}</span>
						<span className='comment-date'>{commentData.score} mois </span>
						</div>
						<p className='comment-body'>{ Value ? Value: commentData.content}</p>
						
					</div>
					<div className='Comment-like'>
						<img className='icon=plus' onClick={incrementLike} src={icon_plus} alt="" />
						<span> {likeValue} </span>
						<img className='icon-minus' onClick={decrementLike} src={icon_minus} alt="" />
					</div>
					<div onClick={handleReply} className='Comment-Reply'>
						<img   src={icon_reply} alt="" /> Reply
					</div>
				</div>
				{
					Reply && (
						<Form  holder={commentData.username} />
					)
				} 
			</>
		
	)
}
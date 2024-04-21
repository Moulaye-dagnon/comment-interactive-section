export function CommentReducteur(DataComment, action ){
	switch(action.type){
		case 'added':{
		if(!action.CommentToReply){
			const newId = Math.random().toString(36).substring(2, 9)
			let newRecors = {
			  id: newId,
			  content: action.value,
			  createdAt: "now",
			  score: 0,
			  user: {
				image: {
				  png: action.currentUser.image.png,
				  webp: action.currentUser.image.webp,
				},
				username: action.currentUser.username,
			  },
			  replies: [],
			};
			let updateData = [...DataComment, newRecors];
			return updateData 
		}
		if(action.CommentToReply){
			const newId = Math.random().toString(36).substring(2, 9);
			let newRecors = {
		  		id: newId,
				content: action.value,
				createdAt: Date.now(),
				score: 0,
				user: {
					image: {
						png: "../../public/images/avatars/image-juliusomo.png",
						webp: "../../public/images/avatars/image-juliusomo.webp",
					},
					username: action.currentUser.username,
				},
				replyingTo: action.CommentToReply.user.username,
			};
			let updateData = DataComment.map(comment=>{
				if(comment.id == action.CommentToReply.id){
				if(comment.replies){
					let r = [newRecors, ...comment.replies ]
					return {...comment, 'replies': r}
				}
			}else {
				if(action.CommentToReply.replyingTo && comment.user.username == action.CommentToReply.replyingTo){
					let r = [ ...comment.replies, newRecors ]
					return {...comment, 'replies': r}
				}
				
			}
			return comment
		});
		return updateData;

		}
		}
		case 'Edited':{
				if(action.value){
					const verif = DataComment.find(f=> f.id == action.id)
				if(verif){
					let updateData = DataComment.map(comment=>{
						if(comment.id == action.id){
							return {...comment, 'content': action.value}
						}
						return comment
					})
					return updateData
				}else{
					let updateData = DataComment.map((comment)=>{
						if(comment.replies.length !== 0){
							let items= comment.replies.map(item=>{
								if(item.id == action.id){
									return {...item , 'content': action.value}
								}
								return item
							})
							
							return {...comment , 'replies': items}
						}
						return comment
					})
					return updateData
				}
			}
		}
		case 'Deleted':{
			let updateData ;
			let object = DataComment.find((comment)=> comment.id == action.id)
			if (object) {
				updateData = DataComment.filter((comment)=>comment.id != action.id)
			} else {
				updateData = DataComment.map(comment=>{
					const deleteComment = comment.replies.filter(reply=>{
						return reply.id != action.id
					})
					 const OneComment = {...comment, 'replies': deleteComment } 
					
					 return OneComment
				})	
			}
	
			return updateData
		}
		case 'incrementScore':{
			let object = DataComment.find((comment)=> comment.id == action.id)
		if (object) {
			let incrementLikeComment = DataComment.map((comment)=>{
				if(comment.id == action.id){
					let item = {...comment , 'score': comment.score +1}
					return item
				}
				return comment
			})
			return incrementLikeComment

		}
		else{
			let incrementLikeComment = DataComment.map((comment)=>{
					if(comment.replies.length !== 0){
						let items = comment.replies.map(item=>{
							if(item.id == action.id){
								return {...item, 'score': item.score + 1}
							}
							return item
						})
						return {...comment , 'replies': items}
					}
					return comment
				
			})
			return  incrementLikeComment
		}
		}
		case 'decrementScore':{
			let object = DataComment.find((comment)=> comment.id == action.id)
		if (object) {
			let decrementLikeComment = DataComment.map((comment)=>{
				if(comment.id == action.id){
					let score = comment.score >0 ? comment.score - 1 : 0
					let item = {...comment , score }
					return item
				}
				return comment
			})
			return decrementLikeComment

		}else{
			let decrementLikeComment = DataComment.map((comment)=>{
				if(comment.replies.length !== 0){
					let items = comment.replies.map(item=>{
						if(item.id == action.id){
							let score = item.score >0 ? item.score - 1 : 0
							return {...item, 'score': score}
						}
						return item
					})
					return {...comment , 'replies': items}
				}
				return comment
			
		})
		return  decrementLikeComment
		}
		}
		default :{
			throw Error ('Action inconnue'+ action.type) 
		}
}
}
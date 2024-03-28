import { useContext, useState } from 'react'
import './form.css'
import { dataContext, setdataContext } from '../utils/contex'
export function Form({onsbmit , holder,  }){
	const setData = useContext(setdataContext)
	const Data = useContext(dataContext)
	const [value, setvalue]= useState('')
	const hanleSubmit = (e)=>{
		e.preventDefault()
		const d = Data.find(item =>item.id == 1 )
		d.replies.push(  {
			"id": 10,
			"content": "test",
			"createdAt": "1 month ago",
			"score": 12,
			"user": {
			  "image": { 
				"png": "../../public/images/avatars/image-amyrobson.png",
				"webp": "../../public/images/avatars/image-amyrobson.webp"
			  },
			  "username": "amyrobson"
			}
		  })

		//   setData(

		// 	// {
		// 	// 	...Data,
		// 	// 	comments: [
		// 	// 		...Data.comments,
		// 	// 		d
		// 	// 	]
		// 	// }
		//   )
		console.log(d.replies);
		console.log(d);

	}
	return (
		<form onSubmit={hanleSubmit} className="formContainer">
			<div className="Form-profil">
				<img src="../../public/images/avatars/image-juliusomo.png" alt="" />
			</div>
			<div className='textComment'>
				<textarea onChange={(e)=> setvalue(e.target.value)} placeholder={`@${holder}`}  />
			</div>
			<button className='btn-send' type='submit' >Send</button>
		</form>
	)
}


// Data.comments.map(id=>{
// 	if(id.id ==1){
// 		return {
// 			...id,
// 			'replies': [
// 				...id.replies,
// 				{
// 					"id": 3,
// 					"content": "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
// 					"createdAt": "1 week ago",
// 					"score": 4,
// 					"replyingTo": "maxblagun",
// 					"image": { 
// 						"png": "../../public/images/avatars/image-juliusomo.png",
// 						"webp": "../../public/images/avatars/image-juliusomo.webp"
// 					  },
// 					  "username": "juliusomo"
// 				  }
// 			]
// 		}
// 	}
// 	return id
// })
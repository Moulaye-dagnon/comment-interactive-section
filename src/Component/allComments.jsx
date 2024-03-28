import { useContext, useState } from 'react'
import './allComments.css'
import { Comments } from './commentItem'
import { setdataContext, dataContext } from '../utils/contex'
export function AllComments({data}){
	const [Data , setData] = useState(data.comments)
	

	return (
			<>		
			<setdataContext.Provider value={setData}>
				<dataContext.Provider value={Data} >
				{ Data.map(item =>{
						if(item.replies){
							return (
								<div key={item.id} className="all">
									<Comments  commentData={item} />
									<div className="reply">
										{item.replies.map(it =>{
											return <Comments key={it.id}  commentData={it} />
										})}
									</div>
								</div>
							)
						}
						return ( <div  key={item.id} className="all">
							<Comments  commentData={item} />
						</div>
						)
					})
				} 
				</dataContext.Provider>
			</setdataContext.Provider>


	</>
	)
}
{/* <Comments commentData={data}/>
				{data.replies && (
					<div className="reply">
						<hr />
						{data.replies.map(reply=>{
							return <Comments key={reply.id} commentData={reply}  />
						})}
					</div>
				)} */}
import "./form.css";
export function FormComponent({submit,pseudo = true  , btnName}){
	return(
		<form onSubmit={submit} className={pseudo ? 'formContainer' : 'EditForm'}>
		{pseudo && 	<div className="Form-profil">
			<img src="../../public/images/avatars/image-juliusomo.png" alt="" />
		  </div>}
		<div className='textComment'>
		  <textarea />
		</div>
		<button className="btn-send"  type="submit">
		  {btnName}
		</button>
	  </form>
	)
}
import { Ipost } from "@/types"
const Form = ({
  type,post,setPost,
  submitting,handleSubmit
}:{
  type:string,
  post:any,
  setPost:(post : Ipost)=>void,
  handleSubmit:(e:React.SyntheticEvent)=>Promise<void>,
  submitting:boolean
}) => {
  return (
    <section className="mt-10 w-full px-6">
      <h1 className="head_text green_gradient text-left">{type} Prompt</h1>
      <p className="desc text-left">{type} and share amazing prompts with community</p>


      <form onSubmit={handleSubmit} className="w-full p-6 flex flex-col gap-5 glassmorphism my-8">
        <label className="font-semibold text-gray-600">Your AI prompt
          <textarea rows={8} cols={10} className="outline-none form_textarea" value={post?.title} placeholder="write your prompt here" onChange={(e)=>{
            setPost({
              ...post!,
              title:e.target.value
            })
          }} />
        </label>

        {/* tag */}
        <label className="font-semibold text-gray-600 mt-8">Tag (#webDev,#mobileDev)
            <input type="text" placeholder="tag .." value={post?.tag} onChange={(e)=>setPost({
              ...post!,
              tag:e.target.value
            })} className="form_input" />
        </label>

        <div className="flex justify-end gap-4">
            <button className=" text-primary font-semibold" onClick={handleSubmit}>{submitting ? `${type}...` : `${type}`}</button>
            <button className="px-6 py-2 rounded-full bg-orange-600 text-white font-semibold">cancel</button>
        </div>
      </form>
    </section>
  )
}

export default Form

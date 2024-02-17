import { Ipost } from "@/types";
import PromptCard from "./PromptCard";
import Link from "next/link";

const Profile = ({ name, desc, data, handleEdit, handleDelete }:{
    name:string,
    desc:string,
    data:Ipost[],
    handleEdit:(id:string)=>void,
    handleDelete:(id:string)=>void
}) => {
  return (
    <section className='w-full my-16'>
      <h1 className='text-start text-4xl font-bold'>
        <span className='blue_gradient'>{name} Profile</span>
      </h1>
      <p className='text-xl mt-4'>{desc}</p>

      <div className='mt-10 prompt_layout'>
        {data.length ? data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post._id)}
            handleDelete={() => handleDelete && handleDelete(post._id)}
          />
        )) : <Link href={"/create-prompt"}>create a prompt now</Link> }
      </div>
    </section>
  );
};

export default Profile;
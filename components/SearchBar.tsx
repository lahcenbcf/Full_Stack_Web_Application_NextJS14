const SearchBar = ({
    searchHandle,
    searchText,setSearchText
}:{
    searchHandle:(e:React.SyntheticEvent)=>Promise<void>,
    searchText:string,
    setSearchText:(v:string)=>void
}) => {
  return (
    <form className="max-w-md w-full mx-auto my-4 flex gap-2 items-center">
            <input type="text" className="form_input" placeholder="enter your keywords" value={searchText} onChange={(e)=>setSearchText(e.target.value)} />
            <span className="black_btn" onClick={searchHandle}>search</span>
    </form>
  )
}

export default SearchBar

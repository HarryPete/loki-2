
const ForumKey = ({type, keyword, handleKeywords, removeKeyWord}) =>
{        
    return <div className={`bg-gray-200 rounded p-1 w-fit relative text-xs cursor-pointer`} onClick={()=> {type === "read" ? handleKeywords(keyword) : removeKeyWord(keyword)}}>{keyword}</div>
}

export default ForumKey
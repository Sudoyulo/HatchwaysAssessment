import "./assessment.css"

const Tags = (props) => {

  const { request, setRequest, stuId } = props;

  const addTag = (value) => {
    let copy = [...request];
    copy[stuId].tag.push(value)
    setRequest(copy)
  }

  const myTags = request[stuId].tag.map((tag) => {
    return (
      <button key={tag}> {tag} </button>
    )
  })

  return (
    <div>
      <div className="tags">
        {myTags}
      </div>
      <input className="tag-input" placeholder="Add a tag" onKeyPress={e => { if (e.key === "Enter") { addTag(e.target.value); e.target.value = "" } }} />
    </div>
  )

}

export default Tags;
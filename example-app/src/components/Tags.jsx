import "./assessment.css"

const Tags = (props) => {

  const { data, setdata, stuId } = props;

  const addTag = (value) => {
    let copy = [...data];
    copy[stuId].tag.push(value);
    setdata(copy)
  }

  const myTags = data[stuId].tag.map((tag, index) => {
    return (<button key={index}> {tag} </button>)
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
import "./assessment.css"

const Tags = (props) => {

  const { request, setRequest, stuId } = props;


  const addTag = () => {

    let copy = [...request];
    copy[stuId].tag.push("1")
    console.log(copy)
    setRequest(copy)

  }

  const myTags = request[stuId].tag.map((tag) => {
    return (
      <p> {tag} </p>
    )
  })

  return (
    <div>
      <div className="tags">
        {myTags}
      </div>
      <button onClick={() => { addTag() }} > Add Tag</button>
    </div>
  )

}

export default Tags;
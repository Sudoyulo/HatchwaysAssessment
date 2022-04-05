

const Tags = (props) => {

  const { student, setRefresh } = props;

  const addTag = (tag) => {
    console.log('added')
    student.tag.push(tag)
    setRefresh(1)
  }

  return (
    <div>
      <button onClick={() => { addTag(student.firstName) }} >{student.tag} hi</button>
    </div>
  )

}

export default Tags;


const Tags = (props) => {

  const { student } = props;

  student.tag.push(student.firstName)

  return (
    <div>
      <button>Add tags</button>
    </div>
  )

}

export default Tags;
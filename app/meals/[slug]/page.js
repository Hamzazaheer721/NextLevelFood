const SharePage = ({ params }) => {
  return (
    <div>
      <h1>Dynamic Page</h1>
      <span>Slug :</span>
      <span> {params.slug} </span>
    </div>
  )
}

export default SharePage

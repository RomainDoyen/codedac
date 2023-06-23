import React from 'react'
import { useNavigate } from 'react-router-dom'

const MostPopular = ({blogs}) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="blog-heading text-start pt-3 py-2 mb-4">
        <p className='blog-heading-title'>Le plus populaire</p>
      </div>
      {blogs?.map((item) => (
        <div className="row pb-3" key={item.id} style={{cursor: "pointer"}} onClick={() => navigate(`/details/${item.id}`)}>
            <div className="col-5 align-self-center">
                <img src={item.imgUrl} alt={item.title} className="most-popular-img" />
            </div>
            <div className="col-7 padding">
                <div className="text-start most-popular-font">{item.title}</div>
                <div className="text-start most-popular-font-meta">{item.timestamp.toDate().toDateString()}</div>
            </div>
        </div>
      ))}
    </div>
  )
}

export default MostPopular
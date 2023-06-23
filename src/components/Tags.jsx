import React from 'react'

const Tags = ({tags}) => {
  return (
    <div>
      <div>
        <div className='blog-heading text-start py-2 mb-4'>
          <p className='blog-heading-title'>Tags</p>
        </div>
      </div>
      <div className="tags">
        {tags?.map((tag, index) => (
          <p className="tag" key={index}>{tag}</p>
        ))}
      </div>
    </div>
  )
}

export default Tags

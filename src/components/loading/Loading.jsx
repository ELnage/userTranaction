import React from 'react'
import { MagnifyingGlass } from 'react-loader-spinner'

export default function Loading() {
  return (
    <div className='vh-100 d-flex justify-content-center align-items-center  bg-black bg-opacity-75'>
        <MagnifyingGlass
  visible={true}
  height="200"
  width="200"
  ariaLabel="magnifying-glass-loading"
  wrapperStyle={{}}
  wrapperClass="magnifying-glass-wrapper"
  glassColor="#c0efff"
  color="#e15b64"
  />
    </div>
  )
}

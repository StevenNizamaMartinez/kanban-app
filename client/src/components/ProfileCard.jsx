import React from 'react'
import "./ProfileCard.css"
import { useAuth } from '../context/AuthContext'

function ProfileCard() {

  const {user} = useAuth()

  return (
    <section className='container--grid'>
      <section className='profile--card-container'>
        <div className='profile--card'>
          <h3>Name:</h3>
          <h2>{user?.name}</h2>
          <h3>Email</h3>
          <h2>{user?.email}</h2>
        </div>
      </section>
      <img src="./profile-content.svg" />
    </section>
  )
}

export default ProfileCard

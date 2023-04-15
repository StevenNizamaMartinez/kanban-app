import React from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { useBoard } from '../context/BoardContext';
import { useList } from '../context/ListContext';
import { useCard } from '../context/CardContext';
import Sidebar from '../components/Layout/Sidebar';
import ProfileCard from '../components/ProfileCard';
import './styles/Home.css'

function Home() {

  const { id } = useParams()
  const { getBoard } = useBoard()
  const { getList } = useList()
  const { getCard } = useCard()
  const { Lists } = getList()
  const { Boards } = getBoard()
  const { Cards } = getCard()

  return (
    <div className='home-container'>
      <Sidebar />

      {
        id ?
          <Outlet />
          :
          <ProfileCard />
      }

    </div>
  )
}

export default Home

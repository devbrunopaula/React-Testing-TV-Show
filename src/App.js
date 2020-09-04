import React, {useState, useEffect} from 'react'
import './styles.css'
import {fetchShow} from './api/fetchShow'
import Dropdown from 'react-dropdown'
import parse from 'html-react-parser'
import {formatSeasons} from './utils/formatSeasons'
import Episodes from './components/Episodes'

export default function App() {
  const [show, setShow] = useState(null)
  const [seasons, setSeasons] = useState([])
  const [selectedSeason, setSelectedSeason] = useState('')
  const episodes = seasons[selectedSeason] || []

  useEffect(() => {
    let isSubscribed = true
    const getShow = async () => {
      const response = await fetchShow()
      if (isSubscribed) {
        setShow(response)
        setSeasons(formatSeasons(response._embedded.episodes))
      }
    }
    getShow()

    return () => (isSubscribed = false)
  }, [])

  const handleSelect = (e) => {
    setSelectedSeason(e.value)
  }

  if (!show) {
    return <h2>Fetching data...</h2>
  }

  return (
    <div className='App' data-testid='app'>
      <img className='poster-img' src={show.image.original} alt={show.name} />
      <h1>{show.name}</h1>
      {parse(show.summary)}
      <Dropdown
        data_testid='options'
        options={Object.keys(seasons)}
        onChange={handleSelect}
        value={selectedSeason || 'Select a season'}
        placeholder='Select an option'
      />
      <Episodes episodes={episodes} />
    </div>
  )
}

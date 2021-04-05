

import React,{useState} from 'react'
import {SearchUser} from '../store/actions/Utils'
import {useDispatch, useSelector} from 'react-redux'
import {history, useHistory} from 'react-router-dom'


import { ReactSearchAutocomplete } from 'react-search-autocomplete'

function Playground() {


    const dispatch = useDispatch()
    const history = useHistory()
    const searchUser = useSelector(state => state.user.searchUserList)
    const config = { headers: { 
        'Content-Type':'application/json',
        'Authorization': "Bearer " + localStorage.getItem('access_token')
      }}


  const handleOnSearch = (string, results) => {
    dispatch(SearchUser(string, config))
  }

  const handleOnSelect = (item) => {
    // the item selected
    history.push(`/profile/${item.username}`)
  }

  const handleOnFocus = () => {
    console.log('Focused')
  }

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ width: 400 }}>
          <ReactSearchAutocomplete
            items={searchUser}
            onSearch={handleOnSearch}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            autoFocus
          />
        </div>
      </header>
    </div>
  )
}

export default Playground
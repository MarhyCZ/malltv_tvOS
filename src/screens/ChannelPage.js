import PropTypes from 'prop-types'
import API from '../api/index.js'
import React, { useEffect, useState } from 'react'
import * as TVDML from 'tvdml'

import Loader from './Loader'
import EntityLockup from '../components/entityLockup'

function ChannelPage (props) {
  // const context = props.context
  // const name = props.name;
  // const counter = props.counter;
  // const context = props.context
  const [loading, setLoading] = useState(true)
  const [state, setState] = useState()

  useEffect(() => {
    console.log(props)
    async function fetchData () {
      // You can await here
      API.getChannel(props.channel.EntityId)
        .then(data => {
          if (data !== undefined) {
            setState(data)
            console.log(data)
            setLoading(false)
          }
        })
      // ...
    }
    fetchData()
    console.log('probihafetch')
  }, []) // Or [] if effect doesn't need props or state

  if (loading === true) {
    return <Loader />
  }
  return (
    <document>
      <productBundleTemplate>
        <background>
        </background>
        <banner>
          <stack>
            <title>{state.Title}</title>
            <row>
              <text><badge src="resource://tomato-fresh"/>{state.Counts.Subscribers.Count} Odběratelů</text>
              <text>1hr 54min</text>
              <text>Comedy</text>
              <text>2015</text>
              <badge src="resource://mpaa-pg" class="badge" />
              <badge src="resource://cc" class="badge" />
            </row>
            <description handlesOverflow ="true">{state.Description}</description>
            <row>
              <buttonLockup>
                <badge src="resource://button-preview" />
                <title>Preview</title>
              </buttonLockup>
              <buttonLockup type="buy">
                <text>$9.99</text>
                <title>Buy</title>
              </buttonLockup>
            </row>
          </stack>
          <img src={state.Hero} />
        </banner>
        <shelf>
          <header>
            <title>Tituly</title>
          </header>
          <section>
            {state.Series.Entities.map(entity => {
              return (
                <EntityLockup entity={entity} section={state.Series} />
              )
            })}
          </section>
        </shelf>
        <shelf>
          <header>
            <title>Videa</title>
          </header>
          <section>
            {state.Videos.Entities.map(entity => {
              return (
                <EntityLockup entity={entity} section={state.Videos} />
              )
            })}
          </section>
        </shelf>
      </productBundleTemplate>
    </document>
  )
}

export default ChannelPage

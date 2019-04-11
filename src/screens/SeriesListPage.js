import PropTypes from 'prop-types'
import API from '../api/index.js'
import React, { useEffect, useState } from 'react'
import * as TVDML from 'tvdml'

import Loader from './Loader'
import { withAppContext } from '../components/withAppContext'
import EntityLockup from '../components/entityLockup.js'

function SeriesListPage (props) {
  const inititalSectionId = props.category.Id || null // Coming from Discover page
  const [loading, setLoading] = useState(true)
  const [state, setState] = useState({})
  const [sectionId, setId] = useState(inititalSectionId)

  useEffect(() => {
    console.log(props)
    // console.log(context)
    async function fetchData () {
      // You can await here
      API.getSeries(sectionId)
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
  }, [sectionId]) // Or [] if effect doesn't need props or state

  if (loading === true) {
    return <Loader />
  }
  return (
    <document>
      <head>
        <style>{`
        .banner {
          padding-left: 0;
          padding-top: 0;
          padding-right: 0;
        }
      `}</style>
      </head>
      <stackTemplate style={{ }}>
        <background>
          <img class="blurOverlayImage" src="/resources/images/background/background_2.jpg" />
        </background>
        <banner class="blurOverlayBanner">
          <title style="tv-visual-effect: none; color: rgba(0, 0, 0, 0.6);">Pořady</title>
        </banner>
        <collectionList>
          <segmentBarHeader style={{ 'tv-align': 'center', 'tv-text-style': 'body' }}>
            <segmentBar style={{ 'max-width': '1720' }}>
              {state.Sections.map(section => {
                return (
                  <segmentBarItem onHighlight={event => { console.log('loool'); setId(section.SectionId) }}>
                    <title>{section.SectionTitle}</title>
                  </segmentBarItem>
                )
              })}
            </segmentBar>
          </segmentBarHeader>
          <grid>
            <section>
              {state.Entities.map(entity => {
                return (
                  <EntityLockup entity={entity} section={state} />
                )
              })}
            </section>
          </grid>
        </collectionList>
      </stackTemplate>
    </document>
  )
}

SeriesListPage.defaultProps = {
  category: {
    highlight: true
  }
}

export default SeriesListPage

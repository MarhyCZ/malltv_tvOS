import API from '../api/index.js'
import React, { useState, useEffect } from 'react'
import * as TVDML from 'tvdml'

import Loader from './Loader'
import EntityLockup from '../components/entityLockup'

const Discover = React.memo((props) => {
  const [resumed, setResume] = useState(0)
  const [loading, setLoading] = useState(true)
  const [state, setState] = useState({
    'Hero': {
      'Entities': [
        {
          'Id': 1,
          'EntityId': 1,
          'Title': 'Načítání',
          'Thumbnail': '',
          'HeroThumbnail': '',
          'Badge': '',
          'Tags': '',
          'ShareUrl': ''
        }
      ]
    }
  }
  )
  TVDML
    .subscribe(TVDML.event.RESUME)
    .pipe(() => {
      setResume(resumed + 1)
    })

  useEffect(() => {
    console.log('discover říká:' + resumed)
    async function fetchData () {
      // You can await here
      API.getHome()
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
  }, [resumed]) // Or [] if effect doesn't need props or state

  if (loading === true) {
    return <Loader />
  }
  return (
    <document>
      <head>
        <style>{`
          .title {
            tv-text-style: title1;
          }
          .pill {
            tv-position: center;
            tv-align:center;
            text-align:center;
          }
          .withOverlay {
            tv-tint-color: linear-gradient(top, 0.00, rgba(0,0,0,0.35), 1.00, rgba(0,0,0,0.5));  
          }
          .categoryOverlay {
            tv-tint-color: linear-gradient(top, 0.00, rgba(0,0,0,0.7), 1.00, rgba(0,0,0,0.7));  
          }
        `}</style>
      </head>
      <stackTemplate>
        <collectionList>
          <carousel>
            <section>
              {state.Hero.Entities.map(entity => {
                return (
                  <lockup class="withOverlay" key={entity.Title} onSelect={event => TVDML.navigate('seriepage', entity)}>
                    <img src={entity.Carousel} width="1728" height="600" />
                    <overlay>
                      <title>{entity.Title}</title>
                    </overlay>
                  </lockup>
                )
              })}
            </section>
          </carousel>
          <shelf>
            <header>
              <title>Kategorie</title>
            </header>
            <section>
              {state.Categories.map(category => {
                return (
                  <lockup key={category.Title} onSelect={event => TVDML.navigate('serieslistpage', category)}>
                    <img class="categoryOverlay" src={category.Image} width="350" height="145"/>
                    <overlay>
                      <title class="pill">{ category.Title }</title>
                    </overlay>
                  </lockup>
                )
              })}
            </section>
          </shelf>
          {state.Sections.map(section => {
            return (
              <shelf>
                <header>
                  <title>{section.SectionTitle}</title>
                </header>
                <section>
                  {section.Entities.map(entity => {
                    return (
                      <EntityLockup entity={entity} section={section} options={{ 'highlight': 'false' }}/>
                    )
                  })}
                </section>
              </shelf>
            )
          })}
        </collectionList>
      </stackTemplate>
    </document>
  )
})

export default Discover

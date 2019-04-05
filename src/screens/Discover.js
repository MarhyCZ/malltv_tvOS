import API from '../api/index.js'
import React, { useState, useEffect } from 'react'
import * as TVDML from 'tvdml'
import { link } from '../utils'

import Loader from './Loader'

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
          setState(data)
          console.log(data)
          setLoading(false)
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
        `}</style>
      </head>
      <stackTemplate>
        <banner>
          <title></title>
        </banner>
        <collectionList>
          <carousel>
            <section>
              {state.Hero.Entities.map(entity => {
                return (
                  <lockup class="withOverlay" key={entity.Title} onSelect={event => TVDML.navigate('showpage', entity)}>
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
                  <lockup key={category.Title} onSelect={event => TVDML.navigate('showpage', category)}>
                    <img class="overlay" src={category.Image} width="350" height="145"/>
                    <overlay>
                      <title class="pill">{ category.Title }</title>
                    </overlay>
                  </lockup>
                )
              })}
            </section>
          </shelf>
          <shelf>
            <section>
              {state.Hero.Entities.map(entity => {
                return (
                  <lockup key={entity.Title} onSelect={event => TVDML.navigate('showpage', entity)}>
                    <img src={entity.Thumbnail} width="250" height="250" />
                    <title>{entity.Title}</title>
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
                    let image = entity.Thumbnail || entity.ThumbnailUrl || entity.SerieImageUrl
                    let imgWidth = entity.ThumbnailUrl ? 320 : 210
                    let imgHeight = entity.ThumbnailUrl ? 180 : 290
                    if (entity.Logo) {
                      return (
                        <monogramLockup>
                          <monogram src={entity.Logo}/>
                          <title>{entity.Title}</title>
                        </monogramLockup>
                      )
                    }
                    return (
                      <lockup key={entity.Title} onSelect={event => {
                        section.CardType === 'isVideo' ? TVDML.navigate('play', entity)
                          : TVDML.navigate('showpage', entity)
                      }}>
                        <img src={image} width={imgWidth} height={imgHeight} />
                        <title>{entity.Title}</title>
                      </lockup>
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

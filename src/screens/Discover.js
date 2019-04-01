import PropTypes from 'prop-types'
import API from '../api/index.js'
import React, { useState, useEffect, useContext } from 'react'
import * as TVDML from 'tvdml'
import { link } from '../utils'
import { showMessageFactory } from '../helpers/show-message'

import Loader from './Loader'
import { withAppContext } from '../components/withAppContext'
import { AppContext } from '../components/state.js'

const Discover = React.memo((props) => {
  // const context = props.context
  // const name = props.name;
  // const counter = props.counter;
  //const context = useContext(AppContext)
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

  useEffect(() => {
    //console.log(context.resumeCount)
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
  }, []) // Or [] if effect doesn't need props or state

  if (loading === true) {
    console.log('berfore request')
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
          .overlay {
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
                  <lockup key={entity.Title}>
                    <img src={entity.Carousel} width="1728" height="600" />
                    <title>{entity.Title}</title>
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
                  <lockup key={category.Title} onSelect={event => TVDML.navigate('showinfo', category)}>
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
                  <lockup key={entity.Title} onSelect={event => TVDML.navigate('showinfo', entity)}>
                    <img src={entity.Thumbnail} width="250" height="250" />
                    <title>{entity.Title}</title>
                  </lockup>
                )
              })}
            </section>
          </shelf>
          <shelf>
            <header>
              <title>Oblíbenci</title>
            </header>
            <section>
              {state.Sections[2].Entities.map(entity => {
                return (
                  <monogramLockup>
                    <monogram src={entity.Logo}/>
                    <title>{entity.Title}</title>
                  </monogramLockup>
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
                    let image = entity.Thumbnail || entity.SerieImageUrl
                    return (
                      <lockup key={entity.Title} onSelect={event => TVDML.navigate('showinfo', entity)}>
                        <img src={image} width="320" height="180" />
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

export default withAppContext(Discover)

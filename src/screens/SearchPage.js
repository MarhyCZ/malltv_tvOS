import PropTypes from 'prop-types'
import API from '../api/index.js'
import React, { useEffect, useState, useLayoutEffect } from 'react'
import * as TVDML from 'tvdml'
import { link } from '../utils'
import { showMessageFactory } from '../helpers/show-message'

import Loader from './Loader'

function SearchPage (props) {
  // const context = props.context
  // const name = props.name;
  // const counter = props.counter;
  // const context = props.context
  const [loading, setLoading] = useState(true)
  const [state, setState] = useState({})
  const node = React.createRef()

  useEffect(() => {
    console.log(state)
    let keyboard = node.current.getFeature('Keyboard')
    keyboard.onTextChange = () => {
      console.log(keyboard.text)
      updateResults(keyboard.text)
    }
  }, []) // Or [] if effect doesn't need props or state

  const updateResults = (searchString) => {
    API.getSearch(searchString)
      .then(data => {
        console.log(data)
        setState(data)
      })
  }
  return (
    <document>
      <searchTemplate>
        <searchField ref={node} />
        <collectionList>
          {Object.values(state).map(section => {
            if (typeof section === 'string' || section === null) { return null }
            if (!section.Entities) { return null }
            if (section.Entities === null) { return null }
            if (section.Entities.length === 0) { return null }
            console.log('proslo')
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
                        <monogramLockup onSelect={event => TVDML.navigate('showpage', entity)}>
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
      </searchTemplate>
    </document>
  )
}

export default SearchPage

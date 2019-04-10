import PropTypes from 'prop-types'
import API from '../api/index.js'
import React, { useEffect, useState, useLayoutEffect } from 'react'
import * as TVDML from 'tvdml'
import { link } from '../utils'
import { showMessageFactory } from '../helpers/show-message'

import Loader from './Loader'
import EntityLockup from '../components/entityLockup'

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
    if (searchString !== '') {
      API.getSearch(searchString)
        .then(data => {
          console.log(data)
          setState(data)
        })
    } else {
      setState({})
    }
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
                    return (
                      <EntityLockup entity={entity} section={section} />
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

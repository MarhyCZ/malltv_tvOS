import PropTypes from 'prop-types'
import API from '../api/index.js'
import React, { useEffect, useState } from 'react'
import * as TVDML from 'tvdml'
import { link } from '../utils'
import { showMessageFactory } from '../helpers/show-message'

import Loader from './Loader'
import { withAppContext } from '../components/withAppContext'
import EpisodeLockup from '../components/episodeLockup'

function SeriePage (props) {
  // const context = props.context
  // const name = props.name;
  // const counter = props.counter;
  // const context = props.context
  const [loading, setLoading] = useState(true)
  const [state, setState] = useState({
    'SerieId': 44,
    'EntityId': 2130,
    'Name': 'stylista',
    'Title': 'Stylista',
    'SerieImage': 'https://puma.gjirafa.com/api/storage/malltv/images/serie/background-mobile/stylista.jpg',
    'SerieHero': 'https://puma.gjirafa.com/api/storage/malltv/images/serie/hero-mobile/stylista.png',
    'TrailerEntityId': 2805,
    'Description': 'HTML POPIS',
    'ShortDescription': 'Muzete hodnotit na CSFD',
    'AboutUsDescription': 'Hraji Michal M a Mall.TV 2018',
    'Tags': '1 série | 8 ep.',
    'Url': 'serial',
    'Sections': [
      {
        'Id': 74,
        'TotalEntities': 8,
        'SectionTitle': 'Stylista',
        'EntitiesPerPage': 4,
        'CardType': 'isVideo',
        'ErrorMessage': null,
        'IsSortable': true,
        'SortOptions': [
          {
            'SortId': 1,
            'SortTitle': 'Abecedně A-Z'
          },
          {
            'SortId': 2,
            'SortTitle': 'Nejsledovanější'
          },
          {
            'SortId': 3,
            'SortTitle': 'Nejnovější'
          }
        ],
        'IsChangableSection': true,
        'Sections': [
          {
            'SectionId': 74,
            'SectionTitle': 'Stylista'
          },
          {
            'SectionId': 120,
            'SectionTitle': 'Bonusy'
          }
        ],
        'Entities': [
          {
            'Id': 801,
            'EntityId': 2676,
            'Title': 'S1:E1 Létající pes',
            'PublishDate': 'před 5 měsíci',
            'Views': null,
            'WatchedPercentage': 0,
            'ThumbnailUrl': 'https://vlora.gjirafa.com/api/media/malltv/t0zygt/standart.jpg',
            'SerieId': 44,
            'SerieImageUrl': 'https://vlora.gjirafa.com/api/storage/malltv/images/serie/mobile-a/stylista.jpg',
            'SerieName': 'Stylista',
            'Badge': '',
            'Duration': '11:15',
            'Subscribed': false,
            'Prelive': false,
            'Live': false,
            'ShareUrl': 'https://www.mall.tv/1-letajici-pes-2'
          }
        ],
        'HasSectionPage': false
      },
      {
        'Id': 120,
        'TotalEntities': 0,
        'SectionTitle': 'Bonusy',
        'EntitiesPerPage': 4,
        'CardType': 'isVideo',
        'ErrorMessage': null,
        'IsSortable': true,
        'SortOptions': [
          {
            'SortId': 1,
            'SortTitle': 'Abecedně A-Z'
          },
          {
            'SortId': 2,
            'SortTitle': 'Nejsledovanější'
          },
          {
            'SortId': 3,
            'SortTitle': 'Nejnovější'
          }
        ],
        'IsChangableSection': true,
        'Sections': [
          {
            'SectionId': 74,
            'SectionTitle': 'Stylista'
          },
          {
            'SectionId': 120,
            'SectionTitle': 'Bonusy'
          }
        ],
        'Entities': [

        ],
        'HasSectionPage': false
      }
    ],
    'Counts': {
      'EntityId': 2130,
      'Subscribed': false,
      'Likes': {
        'Enabled': true,
        'Show': true,
        'Count': 0,
        'StrCount': ''
      }
    },
    'HasTrailer': true
  }
  )

  useEffect(() => {
    console.log(props)
    // console.log(context)
    async function fetchData () {
      // You can await here
      API.getSerie(props.show.EntityId)
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
      <head>
        <style>{`
        .banner {
          padding-left: 0;
          padding-top: 0;
          padding-right: 0;
        }
      `}</style>
      </head>
      <stackTemplate theme="dark" style={{ }}>
        <background>
          <heroImg src={state.SerieImage} width="3840" height="760" />
        </background>

        {/* <background>
          <img class="blurOverlayImage" src="/resources/images/background/background_2.jpg" />
        </background>
        <banner class="blurOverlayBanner">
          <title style="tv-visual-effect: none; color: rgba(0, 0, 0, 0.6);">Title</title>
        </banner> */}
        <identityBanner>
          <background>
            <img src={state.SerieImage} width="1920"height="375" />
            <text style={{ 'color': 'rgb(255,255,255)' }}>{state.ShortDescription}</text>
          </background>
          <title>{state.Title}</title>
          <subtitle>{state.Tags}</subtitle>
          <row>
            <buttonLockup>
              <badge src="resource://button-follow" />
              <title>Od nejnovějších</title>
            </buttonLockup>
            <buttonLockup>
              <badge src="resource://button-checkmark" />
              <title>Title 2</title>
            </buttonLockup>
            <buttonLockup>
              <badge src="resource://button-add" />
              <title>Title 3</title>
            </buttonLockup>
          </row>
        </identityBanner>
        <collectionList>
          <grid>
            <header>
              <title>Epizody</title>
            </header>
            <section>
              {state.Sections[0].Entities.map(entity => {
                return (
                  <EpisodeLockup entity={entity} />
                )
              })}
            </section>
          </grid>
        </collectionList>
      </stackTemplate>
    </document>
  )
}

export default SeriePage

import PropTypes from 'prop-types'
import API from '../api/index.js'
import React, { useLayoutEffect, useState } from 'react'
import * as TVDML from 'tvdml'
import { link } from '../utils'
import { showMessageFactory } from '../helpers/show-message'

import Loader from './Loader'
import { withAppContext } from '../components/withAppContext'

function ShowInfo (props) {
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

  useLayoutEffect(() => {
    console.log(props)
    // console.log(context)
    async function fetchData () {
      // You can await here
      API.getSerie(props.show.EntityId)
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
    return <Loader />
  }
  return (
    <document>
      <stackTemplate style={{ }}>
        <background>
          <heroImg src={state.SerieImage} />
        </background>
        <identityBanner>
          <background>
            <img src={state.SerieImage} height="380" width="1920"/>
            <heroImg src={state.SerieImage}/>
          </background>
          <title>{state.Title}</title>
          <subtitle>{state.Tags}</subtitle>
          <row>
            <buttonLockup>
              <badge src="resource://button-follow" />
              <title>Title 1</title>
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
          <shelf>
            <header>
              <title>Shelf title</title>
            </header>
            <section>
              <lockup>
                <img src="" width="308" height="308" />
                <title>Title 1</title>
              </lockup>
            </section>
          </shelf>
        </collectionList>
      </stackTemplate>
    </document>
  )
}

export default ShowInfo

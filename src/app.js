import * as TVDML from 'tvdml'

import Discover from './screens/Discover'

import AppMenu from './components/menu'
import ShowPage from './screens/ShowPage'
import ChannelPage from './screens/ChannelPage'
import SearchPage from './screens/SearchPage'
import Player from './components/player'
import ErrorPage from './screens/ErrorPage'

import API from './api'

TVDML
  .subscribe(TVDML.event.LAUNCH)
  .pipe(TVDML.render(() => (
    <AppMenu />
  )))

TVDML
  .subscribe(TVDML.event.RESUME)
  .pipe(() => {
    API.refreshToken()
  })

TVDML
  .handleRoute('discover')
  .pipe(TVDML.render(() => (
    <Discover />
  )))

TVDML
  .handleRoute('showpage')
  .pipe(TVDML.render((payload) => (
    <ShowPage show={payload.navigation} />
  )))

TVDML
  .handleRoute('channelpage')
  .pipe(TVDML.render((payload) => (
    <ChannelPage channel={payload.navigation} />
  )))

TVDML
  .handleRoute('searchpage')
  .pipe(TVDML.render(() => (
    <SearchPage/>
  )))

TVDML
  .handleRoute('play')
  .pipe((payload) => {
    Player.play(payload.navigation)
  })

TVDML
  .handleRoute('errorpage')
  .pipe(TVDML.render((payload) => (
    <ErrorPage message={payload.navigation}/>
  )))

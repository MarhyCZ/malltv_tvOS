import * as TVDML from 'tvdml'

import Screen1 from './screens/Screen1'
import Screen2 from './screens/Screen2'
import Screen3 from './screens/Screen3'
import Discover from './screens/Discover'

import AppMenu from './components/menu'
import ShowPage from './screens/ShowPage'
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
  .handleRoute('page2')
  .pipe(TVDML.render(() => (
    <Screen2 />
  )))

TVDML
  .handleRoute('page3')
  .pipe(TVDML.render(() => (
    <Screen3 />
  )))

TVDML
  .handleRoute('showpage')
  .pipe(TVDML.render((payload) => (
    <ShowPage show={payload.navigation} />
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

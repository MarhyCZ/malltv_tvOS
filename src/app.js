import * as TVDML from 'tvdml'

import Screen1 from './screens/Screen1'
import Screen2 from './screens/Screen2'
import Screen3 from './screens/Screen3'
import Discover from './screens/Discover'

import store from './redux/store'
import {
  launchApp,
  resumeApp,
  suspendApp
} from './redux/ducks/app'

import AppMenu from './components/menu'
import ShowPage from './screens/ShowPage'
import Player from './components/player'

TVDML
  .subscribe(TVDML.event.LAUNCH)
  .pipe(payload => store.dispatch(launchApp(payload)))

TVDML
  .subscribe(TVDML.event.SUSPEND)
  .pipe(() => store.dispatch(suspendApp()))

TVDML
  .subscribe(TVDML.event.RESUME)
  .pipe(() => store.dispatch(resumeApp()))

TVDML
  .subscribe(TVDML.event.LAUNCH)
  .pipe(TVDML.render(() => (
    <AppMenu />
  )))

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
  .handleRoute('play')
  .pipe((payload) => {
    Player.play(payload.navigation)
  })

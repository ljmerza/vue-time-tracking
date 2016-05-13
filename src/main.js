import Vue from 'vue'

// import app main page template
import App from './App'
// import home template
import Home from './components/Home.vue'
// import timeEntries template for displaying and adding time entries
import TimeEntries from './components/TimeEntries.vue'
// import form input template to add a new logTime
import LogTime from './components/LogTime.vue'

// import route and XHR resource addons
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

// add router and resource modules to vue
Vue.use(VueResource)
Vue.use(VueRouter)

// create a new route object to add routes
const router = new VueRouter()

router.map({
  // maps home path to the imported Home template
  '/home': {
    component: Home
  },
  // maps to time entries template imported above
  '/time-entries': {
    component: TimeEntries,
    // inside TimeEntries template there is another route (subroute) to add new entries
    subRoutes: {
      '/log-time': {
        component: LogTime
      }
    }
  }
})

// redirects all other requests to home page
router.redirect({
  '*': '/home'
})

// start vue router on app.vue file that was imported with element that has id=app
router.start(App, '#app')

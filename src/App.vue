<template>
  <div id="wrapper">

    <!--navbar-->
    <nav class="navbar navbar-default">
      <div class="container">
        <a class="navbar-brand" href="#">
          <i class="glyphicon glyphicon-time"></i>
          Vue Tracker
        </a>
        <ul class="nav navbar-nav">
          <li><a v-link="'/home'">Home</a></li>
          <li><a v-link="'/notes'">Notes</a></li>
          <li><a v-link="'/goals'">Goals</a></li>
          
        </ul>
      </div>
    </nav>
    
    <!--container for time tracker-->
    <div class="container-fluid">
      <div class="row">
        <!--total time panel-->
        <div class="col-xs-3">
          <weather-view :coordinates='coordinates'></weather-view>
        </div><!--total time panel-->

        <!--router element-->
        <div class="col-xs-9 little-padd">
          <router-view :coordinates='coordinates'></router-view>
        </div><!--router element-->
      </div>
    </div><!--container for time tracker-->
  </div>

</template>

<script>
  import weatherView from './components/weatherView.vue'

  export default {
    components: { 'weatherView': weatherView },
    data () {
      return {
        coordinates: {
          lat: 0,
          long: 0
        }
      }
    },
    methods: {
      // get coordinates of browser, store in data, call getWeather event in child components
      getCoordinates () {
        navigator.geolocation.getCurrentPosition( (position) => {
          this.coordinates.lat = position.coords.latitude
          this.coordinates.long = position.coords.longitude
        })
      }
    },
    events: {
      // get coordinates when event is fired from another component
      getCoordinatesEvent () {
        this.getCoordinates()
      }
    },
    ready () {
      this.getCoordinates()
    },
    watchers: {
      'coordinates': (val, oldVal) => {
        console.log('watcher')
        this.$broadcast('getWeatherEvent')
      }
    }

  }
</script>

<style>
.little-padd{
  padding-left: 5px;
  padding-right: 20px;
}
</style>





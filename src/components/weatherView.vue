<template>
	<!--template can only have one root element or will become fragment nstane and not be passed prop variables-->
	<div>
		<div class="panel panel-default panel-date">
		<div class="panel-body text-center">
			<!--use moment.js to set time format with moment filter-->
			<h2>{{ someDay | moment "dddd" }}</h2>
			<h2>{{ someDate | moment "MMMM Do" }}</h2>
		</div>
	</div>
	<div class="panel panel-default panel-weather">
		<div class="panel-header">
			<div class="container-fluid">
				<div class="row">
					<div class="col-xs-12 text-center" >
						<!--show city if data collected else show button to manually get coordinates-->
						<h6 v-show=weather.city>{{ weather.city }} <i class="fa fa-cog" aria-hidden="true"></i></h6>
						<div v-show=!weather.city>
							<h6 >To get weather data allow location</h6>
							<button class="btn btn-default-btn-lg" @click='getCoordinatesFromParent()'>Here</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="panel-body">
			<div class="container-fluid">
				<div class="row">
					<div class="col-xs-12 col-md-7 text-center">
						<h1 v-show=weather.temp>{{ weather.temp | parseInt }}&deg;</h1>
					</div>
					<div class="col-xs-12 col-md-5">
						<img class='img-responsive' v-show=weather.weatherImgURL v-bind:src=weather.weatherImgURL alt="">
					</div>
				</div>
				<div class="row">
					<div class="col-xs-12">
						<h3 v-show=weather.description>{{ weather.description }}</h3>
						<h5 v-show=weather.temp_min>{{ weather.temp_min | parseInt }}&deg; / {{ weather.temp_max | parseInt }}&deg;</h5>
					</div>
				</div>
			</div>
		</div>
		<div class="panel-footer">
			<div class="container-fluid">
				<div class="row">
					<div class="col-xs-6">
						<h4 v-show=weather.humidity><span>{{ weather.humidity | parseInt}}</span>%</h4>
					</div>
					<div class="col-xs-6">
						<h4 v-show=weather.wind><span>{{ weather.wind | parseInt }}</span>mph</h4>
					</div>
				</div>
			</div>
		</div>
	</div>
	
</template>

<script>
	export default {
		// set name of this component
		name: 'weatherView',

		// initialize all variables
		// use return so new variables for each component instance
		data () {
			return {
				weather: {
					city: '',
					temp: 0,
					temp_min: 0,
					temp_max: 0,
					humidity: 0,
					description: '',
					wind: 0 ,
					weatherImgURL: ''
				// },
				// coordinates: {
				// 	lat: 0,
				// 	long: 0
				}
			}
		},
		// get rid of decimals for temperatures
		filters: {
			parseInt (val) {
				return parseInt(val)
			}
		},
		props: {
			coordinates: Object
		},
		methods: {
			// call openWeatherMap API and store data in component variables
			getWeather () {
				let url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + this.coordinates.lat + '&lon=' + this.coordinates.long + '&APPID=11fae9d767a5976dd7b7255594f776b9&units=imperial'
				this.$http.get(url)
				.then( (data) => {
					this.weather.city = data.data.name
					this.weather.temp = data.data.main.temp
					this.weather.temp_min = data.data.main.temp_min
					this.weather.temp_max = data.data.main.temp_max
					this.weather.humidity = data.data.main.humidity
					this.weather.description = data.data.weather[0].description
					this.weather.wind = data.data.wind.speed
					this.weather.weatherImgURL = 'http://openweathermap.org/img/w/' + data.data.weather[0].icon + '.png'
				})
				.catch( (err) => {
					console.log(err)
				})
			},
			// fire event to parent component that gets coordinates
			getCoordinatesFromParent () {
				this.$dispatch('getCoordinatesEvent')
			}
		},
		events: {
			getWeatherEvent () {
				this.getWeather()
			}
		}
	}
</script>

<style src='./weatherView/style.css'>/style>
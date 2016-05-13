<template>
  <div>
    <!-- if the route's path is NOT log time link to log-time route -->
    <button
      v-if="$route.path !== '/time-entries/log-time'"
      v-link="'time-entries/log-time'"
      class="btn btn-primary">
      Log Time
    </button>

    <!-- if path is log-time then display header -->
    <div v-if="$route.path === '/time-entries/log-time'">
      <h3>Log Time</h3>
    </div>

    <hr>

    <!-- this is where route adds template html - nested route -->
    <router-view></router-view>


    <div class="time-entries">
      <!-- if no entries then display no entries -->
      <p v-if="!timeEntries.length">
        <strong>No Time entries yet</strong>
      </p>
      <div class="list-group">
        <!-- for each entry in array display user info, time info, date, comment, and delete function call -->
        <a class="list-group-item" v-for="timeEntry in timeEntries">
          <div class="row">
            <div class="col-sm-2 user-details">
            <!-- using colon is same as using 'v-bind' directive -->
              <img :src="timeEntry.user.image" class="avatar img-circle img-responsive">
              <p class="text-center">
                <strong>
                  {{ timeEntry.user.firstName }}
                  {{ timeEntry.user.lastName }}
                </strong>
              </p>
            </div>

            <div class="col-sm-2 text-center time-block">
              <h3 class="list-group-item-text total-time">
                <i class="glyphicon glyphicon-time"></i>
                {{ timeEntry.totalTime }}
              </h3>
              <p class="label label-primary text-center">
                <i class="glyphicon gyphicon-calendar"></i>
                {{ timeEntry.date }}
              </p>
            </div>

            <div class="col-sm-7 comment-section">
              <p>{{ timeEntry.comment }}</p>
            </div>

            <div class="col-sm-1">
              <!-- call deleteTimeEntry function with this timeEntry object passed
              use @click to bind click event to given function -->
              <button class="btn btn-xs btn-danger delete-button" @click="deleteTimeEntry(timeEntry)">
                X
              </button>
            </div>
          </div>
        </a>

      </div>
    </div>
  </div>
</template>


<script>
  export default{
    // add data in this scope
    data () {
      // start with existing time entry
      let existingEntry = {
        user: {
          firstName: 'Leonardo',
          lastName: 'Merza',
          email: 'Ljmerza@gmail.com',
          image: 'https://s.gravatar.com/avatar/cca2cfc633f3c18262e0dbcee6dfc9c4?s=80'
        },
        comment: 'First time entry',
        totalTime: 1.5,
        date: '2016-5-13'
      }
      return {
        timeEntries: [existingEntry]
      }
    },
    // add methods in this scope - deleteTimeEntry method
    methods: {
      deleteTimeEntry (timeEntry) {
        let index = this.timeEntries.indexOf(timeEntry)
        if (window.confirm('Are you sure you want to delete this time entry?')) {
          this.timeEntries.splice(index, 1)
          // dispatch event with the data deleted to listen in other components (sidebar)
          this.$dispatch('deleteTime', timeEntry)
        }
      }
    },
    // add events in this scope - save time entries
    events: {
      timeUpdate (timeEntry) {
        this.timeEntries.push(timeEntry)
        return true
      }
    }
  }
</script>

<style>
  .avatar {
    height: 75px;
    margin: 0 auto;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .user-details {
    background-color: #f5f5f5;
    border-right: 1px solid #ddd;
    margin: -10px 0;
  }
  .time-block {
    padding: 10px;
  }
  .comment-section {
    padding: 20px;
  }
</style>

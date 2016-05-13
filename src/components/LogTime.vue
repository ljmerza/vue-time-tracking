<template>
  <div class="form-horizontal">
    <div class="form-group">
      <div class="col-sm-6">
        <label>Date</label>
        <input
          type="date"
          class="form-control"
          v-model="timeEntry.date"
          placeholder="Date"
        />
      </div>
      <div class="col-sm-6">
        <label>Hours</label>
        <input
          type="number"
          class="form-control"
          v-model="timeEntry.totalTime"
          placeholder="Hours"
        />
      </div>
    </div>
    <div class="form-group">
      <div class='col-sm-12'>
        <label>Comment</label>
        <input
          type="text"
          class="form-control"
          name="comment"
          v-model="timeEntry.comment"
          placeHolder="Comment">
      </div>
    </div>
    <button class="btn btn-primary" @click="save()">Save</button>
    <button class="btn btn-danger" v-link=""/time-entries"">Cancel</button>
    <hr>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        timeEntry: {
          // default entries on user object
          user: {
            firstName: 'Leonardo',
            lastName: 'Merza',
            email: 'Ljmerza@gmail.com',
            image: 'https://s.gravatar.com/avatar/cca2cfc633f3c18262e0dbcee6dfc9c4?s=80'
          }
        }
      }
    },
    methods: {
      // takes user input data and dispatches it out of component for others to access
      save () {
        let timeEntry = this.timeEntry
        this.$dispatch('timeUpdate', timeEntry)
        this.timeEntry = {}
      }
    }
  }
</script>

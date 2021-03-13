<template>
  <div class="container">
    <app-alert :alert="alert" @close="alert = null"></app-alert>

    <form class="card" @submit.prevent="createPerson">
      <h2>DataBase</h2>

      <div class="form-control">
        <label for="name">Enter Name</label>
        <input type="text" id="name" v-model.trim="name">
      </div>

      <button class="btn primary" :disabled="name.length === 0">Create person</button>
    </form>

    <app-loader v-if="loading"></app-loader>

    <app-people-list
      v-else
      :people="people"
      @load="loadPeople"
      @remove="removePerson"
    ></app-people-list>
  </div>
</template>

<script>
import AppPeopleList from './components/AppPeopleList'
import axios from 'axios'
import AppAlert from './components/AppAlert'
import AppLoader from './components/AppLoader'

export default {
  data () {
    return {
      name: '',
      people: [],
      alert: {},
      loading: false
    }
  },
  mounted () {
    this.loadPeople()
  },
  methods: {
    async createPerson () {
      const response = await fetch('https://vue-with-http-6de8e-default-rtdb.europe-west1.firebasedatabase.app/people.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: this.name
        })
      })

      const firebaseData = await response.json()

      this.people.push({
        firstName: this.name,
        id: firebaseData.nmae
      })

      this.name = ''
    },
    async loadPeople () {
      try {
        this.loading = true
        const { data } = await axios.get('https://vue-with-http-6de8e-default-rtdb.europe-west1.firebasedatabase.app/people.json')
        if (!data) {
          throw new Error('People List is empty')
        }
        this.people = Object.keys(data).map(key => {
          return {
            id: key,
            ...data[key]
          }
        })
        this.loading = false
      } catch (error) {
        this.alert = {
          type: 'danger',
          title: 'Error',
          text: error.message
        }
        this.loading = false
      }
    },
    async removePerson (id) {
      try {
        const name = this.people.find(person => person.id === id).firstName
        await axios.delete(`https://vue-with-http-6de8e-default-rtdb.europe-west1.firebasedatabase.app/people/${id}.json`)
        this.people = this.people.filter(person => person.id !== id)
        this.alert = {
          type: 'primary',
          title: 'Success',
          text: `User named "${name}" has been deleted`
        }
      } catch (error) {

      }
    }
  },
  components: {
    AppPeopleList,
    AppAlert,
    AppLoader
  }
}
</script>

<style scoped>

</style>

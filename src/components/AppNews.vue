<template>
   <div class="card">
      <h3>{{ title }}</h3>
      <app-button
         @action="open"
      >{{ isNewsOpen ? 'Close' : 'Open' }}</app-button>
      <app-button
         color="danger"
         @action="unmark"
         v-if="wasRead"
      >No read</app-button>
      <div v-if="isNewsOpen">
         <hr />
         <p >Lorem ipsum ium, expedita minus quoluptas, doloribus rem aperiam labore quidem neque ad qui!</p>
         <app-button
            color="primary"
            @action="mark"
            v-if="!wasRead"
         >Read</app-button>

         <app-news-list></app-news-list>
      </div>
    </div>
</template>

<script>
import AppButton from './AppButton'
import AppNewsList from './AppNewsList'
export default {
  props: {
    wasRead: Boolean,
    title: {
      type: String,
      required: true
    },
    id: {
      type: Number,
      required: true
    },
    isOpen: {
      type: Boolean,
      required: false,
      default: false,
      validator (value) {
        return true
      }
    }
  },
  emits: {
    'open-news': null,
    'read-news' (id) {
      if (id) {
        return true
      }
      console.warn('No id for emit read-news')
    },
    unmark: null
  },
  data () {
    return {
      isNewsOpen: this.isOpen
    }
  },
  methods: {
    open () {
      this.isNewsOpen = !this.isNewsOpen
      if (this.isNewsOpen) {
        this.$emit('open-news')
      }
    },
    mark () {
      this.isNewsOpen = false
      this.$emit('read-news', this.id)
    },
    unmark () {
      this.$emit('unmark', this.id)
    }
  },
  components: {
    AppButton,
    AppNewsList
  }
}
</script>

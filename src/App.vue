<template>
  <div class="container pt-1">
    <div class="card">
      <h2>News {{ now }}</h2>
      <span>Opened: {{ openRate }} | Readed: {{ readRate }}</span>
    </div>
    <app-news
      v-for="(item) in news"
      :key="item.id"
      :title="item.title"
      :id="item.id"
      :is-open="item.isOpen"
      :was-read="item.wasRead"
      @open-news="openRate++"
      @read-news="readNews"
      @unmark="unReadNews"
    ></app-news>
  </div>
</template>

<script>
import AppNews from './components/AppNews'

export default {
  data () {
    return {
      now: new Date().toLocaleDateString(),
      news: [
        { title: 'Joe Biden win', id: 1, isOpen: false, wasRead: false },
        { title: 'Trump lose', id: 2, isOpen: false, wasRead: false },
        { title: 'Trump lose', id: 3, isOpen: false, wasRead: false },
        { title: 'Trump lose', id: 4, isOpen: false, wasRead: false }
      ],
      openRate: 0,
      readRate: 0
    }
  },
  methods: {
    readNews (id) {
      const index = this.news.findIndex(news => news.id === id)
      this.news[index].wasRead = true
      this.readRate++
    },
    unReadNews (id) {
      const news = this.news.find(news => news.id === id)
      news.wasRead = false
      this.readRate--
    }
  },
  provide () {
    return {
      title: 'All news list',
      news: this.news
    }
  },
  components: {
    'app-news': AppNews
  }
}
</script>

<style scoped>
  h2 {
    color: darkorchid;
  }
</style>

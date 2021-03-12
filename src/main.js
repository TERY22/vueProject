import { createApp } from 'vue'
import App from './App.vue'
import TheHeader from './components/TheHeader'
import './theme.css'

// App -> AppNews -> AppNewsList

const app = createApp(App)

app.component('the-header', TheHeader)

createApp(App).mount('#app')

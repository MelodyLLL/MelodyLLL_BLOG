import { defineClientConfig } from '@vuepress/client'
import CustomLayout from './layouts/CustomLayout.vue'
// import CommentComp from './components/CommentComp.vue'


export default defineClientConfig({
  layouts: {
    CustomLayout,
  },
  enhance({ app }) {
    // app.use(CommentComp)
  },
})
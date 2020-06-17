<template>
  <v-layout row wrap>
    <v-flex xs12 sm10 md10>
      <v-card class="info">
        <v-card-text>
          <p>
            <v-icon>info</v-icon>
            未ログイン時のレートリミットはIPアドレス毎に60回/時です
          </p>
          <!--<p v-if="error && error.response && error.response.status">{{error.response.status}}</p>-->
          <!--<p v-if="error && error.response && error.response.data">{{error.response.data}}</p>-->
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex v-for="post in posts" :key="post.id" xs12 sm10 md10>
      <app-post :post="post" />
    </v-flex>
    <v-flex xs12 sm10 md10>
      <v-card ripple @click.native="onNextClick">
        <v-card-text class="text-sm-center">
          <p v-if="!loading">
            <v-icon>cached</v-icon>
            もっと読む
          </p>
          <p v-else>
            <v-progress-circular
              indeterminate
              :size="50"
              color="primary"
            />読み込み中……
          </p>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-snackbar v-model="snack.show" right>
      {{ snack.msg }}
      <v-btn flat color="pink" @click.native="snack.show = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-layout>
</template>

<script>
import AppPost from '~/components/Post'
import { getPosts } from '~/cache/posts'

export default {
  components: {
    AppPost,
  },
  async asyncData({ app }) {
    try {
      const posts = await (process.server
        ? getPosts(app)
        : app.$axios.$get('/api/v2/items'))
      return { posts }
    } catch (e) {
      return { posts: [], page: 0 }
    }
  },
  data() {
    return {
      page: 1,
      loading: false,
      snack: {
        msg: '',
        show: false,
      },
    }
  },
  mounted() {
    if (this.page === 0) {
      this.onNextClick()
    }
  },
  methods: {
    async onNextClick() {
      if (this.loading) {
        return
      }
      if (
        typeof navigator.onLine !== 'undefined' &&
        navigator.onLine === false
      ) {
        this.showSnack('オフラインです')
        return
      }
      this.loading = true
      try {
        const page = this.page + 1
        const { data } = await this.$axios.get(`/api/v2/items?page=${page}`)
        this.posts.push(...data)
        this.page = page
      } catch (e) {
        this.showSnack('読み込みに失敗しました')
        console.error(e)
      } finally {
        this.loading = false
      }
    },
    showSnack(message) {
      this.snack.msg = message
      this.snack.show = true
    },
  },
}
</script>

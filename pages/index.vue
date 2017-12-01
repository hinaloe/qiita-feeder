<template>
    <v-layout row wrap>
        <v-flex xs12 sm10 md10>
            <v-card class="info">
                <v-card-text>
                    <p>未ログイン時のレートリミットはIPアドレス毎に60回/時です</p>
                </v-card-text>
            </v-card>
        </v-flex>
        <v-flex xs12 sm10 md10 v-for="post in posts" :key="post.id">
            <app-post :post="post"/>
        </v-flex>
        <v-flex xs12 sm10 md10>
            <v-card ripple @click.native="onNextClick">
                <v-card-text class="text-sm-center">
                    <p v-if="!loading">
                        <v-icon>cached</v-icon>
                        もっと読む
                    </p>
                    <p v-else>読み込み中……</p>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
  import AppPost from '../components/Post'

  export default {
    async asyncData ({app}) {
      const posts = await app.$axios.get('/api/v2/items')
      return {posts: posts.data}
    },
    data () {
      return {
        page: 1,
        loading: false
      }
    },
    methods: {
      async onNextClick () {
        if (this.loading) {
          return
        }
        this.loading = true
        try {
          this.page++
          const {data} = await this.$axios.get(`/api/v2/items?page=${this.page}`)
          this.posts.push(...data)
        } catch (e) {
          //
        } finally {
          this.loading = false
        }
      }
    },
    components: {
      AppPost
    }
  }
</script>

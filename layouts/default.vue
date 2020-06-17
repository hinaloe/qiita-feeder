<template>
  <v-app>
    <v-navigation-drawer
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="isMenuOpen"
      fixed
      app
    >
      <v-list>
        <v-list-tile
          router
          :to="item.to"
          :key="i"
          v-for="(item, i) in items"
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app :clipped-left="clipped" dark color="primary">
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
        class="hidden-md-and-down"
      >
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="miniVariant = false,isMenuOpen=!isMenuOpen"
        class="hidden-lg-and-up"
      >
        <v-icon>menu</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <v-container grid-list-lg>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer  app class="pa-3">
      <span>&copy; 2017 hinaloe</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        clipped: false,
        items: [
          {icon: 'rss_feed', title: '新着投稿', to: '/'},
          {icon: 'info', title: 'About', to: '/about'}
        ],
        miniVariant: true,
        isMenuOpen: null,
        title: 'Qiita Feeder'
      }
    }
  }
</script>
<style>
  .btn {
    text-transform: none;
  }
</style>

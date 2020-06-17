<template>
  <v-app>
    <v-navigation-drawer
      v-model="isMenuOpen"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-tile
          v-for="(item, i) in items"
          :key="i"
          router
          :to="item.to"
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon" />
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title" />
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app :clipped-left="clipped" dark color="primary">
      <v-btn
        icon
        class="hidden-md-and-down"
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'" />
      </v-btn>
      <v-btn
        icon
        class="hidden-lg-and-up"
        @click.stop=";(miniVariant = false), (isMenuOpen = !isMenuOpen)"
      >
        <v-icon>menu</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-toolbar>
    <v-content>
      <v-container grid-list-lg>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer app class="pa-3">
      <span>&copy; 2017 hinaloe</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      items: [
        { icon: 'rss_feed', title: '新着投稿', to: '/' },
        { icon: 'info', title: 'About', to: '/about' },
      ],
      miniVariant: true,
      isMenuOpen: null,
      title: 'Qiita Feeder',
    }
  },
}
</script>
<style>
.btn {
  text-transform: none;
}
</style>

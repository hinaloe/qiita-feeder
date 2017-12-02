import Vue from 'vue'
import Vuetify from 'vuetify'
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  theme: {
    primary: colors.lightBlue.base, // a color that is not in the material colors palette
    accent: colors.lightBlue.accent2,
    secondary: colors.lightBlue.lighten2,
    info: colors.teal.lighten3,
    warning: colors.amber,
    error: colors.deepOrange.accent4,
    success: colors.green.accent3
  }
})

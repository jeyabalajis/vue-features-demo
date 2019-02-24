<template>
  <v-app id="app">
    <v-navigation-drawer absolute v-model="drawer" app>      
      <v-layout column>
          <v-flex xs12 sm6 md8 text-xs-center layout align-center justify-center>
              <img src="128px-Vue.js_Logo_2.svg.png" alt="Vue" class="mt-5 mb-3" style="width: 120px">
          </v-flex>
      </v-layout>
      <v-list>
        <v-divider></v-divider>
        <template v-for="(item) in menu_items">
            <v-list-tile exact :key="item.title" :href="item.href" :to="{name: item.href}">
                <v-list-tile-action style="padding-left:10px;">
                    <v-icon light v-html="item.icon"></v-icon>
                </v-list-tile-action>
                <v-list-tile-content class="subheading">
                    <v-list-tile-title v-html="item.title"></v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </template>        
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="primary" dark fixed app>
      <v-toolbar-side-icon v-if="$route.params.type!='Action'" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>
        {{pageTitle}}
      </v-toolbar-title>
    </v-toolbar>
    <v-content class="grey lighten-4">
        <router-view></router-view>
    </v-content>
    <v-footer color="primary" app>
        <span class="white--text caption pa-2 mx-3">  &copy; Made with love by Jeyabalaji</span>
    </v-footer>
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      drawer: true,
      pageTitle: this.$store.state.pageTitle,
      menu_items: [
        {
          href: "home",
          router: true,
          title: "Home",
          icon: "home"
        },
        {
          href: "componentBasics",
          router: true,
          title: "Component Basics",
          icon: "launch"
        }
      ],      
    };
  },
  created() {
    if (typeof this.pageTitle == 'undefined' || this.pageTitle == null) {
      this.pageTitle = "Vue Advanced Features Demo";
    }
  }
};
</script>
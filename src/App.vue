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
            <v-list-tile exact :key="item.title" :href="item.href" :to="{name: item.title, params: item.params}">
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
        <v-btn icon v-if="$route.params.type=='Action'" v-on:click="goBack()">
            <v-icon>arrow_back</v-icon>
        </v-btn>
      <v-toolbar-side-icon v-if="$route.params.type!='Action'" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>
        <template v-if="$route.params.pageName">
          {{$route.params.pageName}}
        </template>
        <template v-else>
          Vue Advanced Features
        </template>
      </v-toolbar-title>
    </v-toolbar>
    <v-content class="grey lighten-4">
        <router-view></router-view>
    </v-content>
    <v-footer color="primary" app>
        <span class="white--text caption pa-2 mx-3">  &copy; Made with passion by <a href="https://www.jeyabalaji.com" class="white--text caption">Jeyabalaji Subramanian </a></span>
    </v-footer>
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      drawer: true,
      menu_items: [
        {
          href: "home",
          router: true,
          title: "Home",
          icon: "home",
          params: {
            pageName: "Vue Advanced Features",
            type: "List"
          }          
        },
        {
          href: "componentBasics",
          router: true,
          title: "Component Basics",
          icon: "launch",
          params: {
            pageName: "Component Basics",
            type: "Action"
          }          
        },
        {
          href: "componentEvents",
          router: true,
          title: "Component Communication",
          icon: "settings_input_component",
          params: {
            pageName: "Component Communication",
            type: "Action"
          }
        },
        {
          href: "conditionalRendering",
          router: true,
          title: "Conditional Rendering",
          icon: "build",
          params: {
            pageName: "Conditional Rendering",
            type: "Action"
          }
        },
        {
          href: "networkFetch",
          router: true,
          title: "Network Fetch",
          icon: "build",
          params: {
            pageName: "Network Fetch",
            type: "Action"
          }
        }        
      ],
    };
  },
  methods: {
    goBack: function () {
        this.$router.go(-1);
    }
  }
};
</script>
<style>
html {
  overflow-y: auto !important;
}
</style>


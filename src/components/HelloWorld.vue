<template>
  <v-container align-center grid-list-md>
      <v-layout>
        <v-flex xs12 sm6 offset-sm3>
          <v-card>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0 title">Vue Advanced Features</h3>                
              </div>
            </v-card-title>
            <v-card-text class="subtitle">
              {{ card_text_1 }}
              <br><br>
              {{ card_text_2 }}
            </v-card-text>
            <v-card-actions>
              <v-btn flat color="orange" @click.native="fnVisit('Component Basics')">Start Exploring!</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
        card_text_1: 'The purpose of this project is to explain some of the key advanced features of Vue such as Routing, Components & Events. I have used Vuetify framework to build the UI fast & beautiful! I have intentionally made the UI barebones so that you get straight into the concepts.',
        card_text_2: "Hope you enjoy this demo & start building beautiful things with Vue!",
      ecosystem: [
        {
          text: 'vuetify-loader',
          href: 'https://github.com/vuetifyjs/vuetify-loader'
        },
        {
          text: 'github',
          href: 'https://github.com/vuetifyjs/vuetify'
        },
        {
          text: 'awesome-vuetify',
          href: 'https://github.com/vuetifyjs/awesome-vuetify'
        }
      ],
      importantLinks: [
        {
          text: 'Documentation',
          href: 'https://vuetifyjs.com'
        },
        {
          text: 'Chat',
          href: 'https://community.vuetifyjs.com'
        },
        {
          text: 'Made with Vuetify',
          href: 'https://madewithvuetifyjs.com'
        },
        {
          text: 'Twitter',
          href: 'https://twitter.com/vuetifyjs'
        },
        {
          text: 'Articles',
          href: 'https://medium.com/vuetify'
        }
      ],
      whatsNext: [
        {
          text: 'Explore components',
          href: 'https://vuetifyjs.com/components/api-explorer'
        },
        {
          text: 'Select a layout',
          href: 'https://vuetifyjs.com/layout/pre-defined'
        },
        {
          text: 'Frequently Asked Questions',
          href: 'https://vuetifyjs.com/getting-started/frequently-asked-questions'
        }

      ]
    }),
    methods:{
      fnVisit: function(router_name) {
        this.$router.replace(
          {
            name: router_name
          }
        );
      }
    }
  }
</script>

<style>

</style>

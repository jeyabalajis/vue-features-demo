<template>
  <v-container fluid grid-list-sm>
    <v-layout column>
      <v-flex xs12>
        <v-card class="elevation-3">
          <v-card-title class="title">
            Control Room            
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="buttonText"
                placeholder="Please enter a text"
                prepend-icon="text_format"
                hint="Please type something!"
              >
              </v-text-field>
              <v-autocomplete
                v-bind:items="colorItems"
                v-model="colorItem"
                prepend-icon="colorize"
                hint="Choose a color!"
                persistent-hint                
              ></v-autocomplete>
              <v-layout row>
                <v-flex xs12 sm4>
                  <v-switch
                      :label="`Round`"
                      v-model="propRound"
                      true-value="true"
                  ></v-switch>    
                </v-flex>
                <v-flex xs12 sm4>
                  <v-switch
                      :label="`Outline`"
                      v-model="propOutline"
                      true-value="true"
                  ></v-switch>    
                </v-flex>
                <v-flex xs12 sm4>
                  <v-switch
                      :label="`Loading`"
                      v-model="propLoading"
                  ></v-switch>    
                </v-flex>
              </v-layout>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <BasicComponent 
          :button-text="buttonText" 
          :compColor="colorItem"
          :propRound="propRound"
          :propOutline="propOutline"
          :propLoading="propLoading"
        >
        </BasicComponent>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// @ is an alias to /src
import BasicComponent from '@/components/BasicComponent.vue'

export default {
  name: 'ComponentBasics',
  components: {
    BasicComponent
  },
    data() {
      return {
        buttonText: "",
        colorItems: [
          "primary",
          "accent",
          "warning",
          "error"
        ],
        colorItem: "primary",
        propRound: false,
        propOutline: false,
        propLoading: false 
      };      
    },
    methods: {

    },
    created() {
      this.$store.commit("setPageTitle", "Component Basics");
      console.log(JSON.stringify(this.$route.params));
    }
}
</script>
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
            <v-text-field
              v-model.number="noPizzas"
              type="number"
              placeholder="How many pizzas do you need?"
              prepend-icon="fastfood"
              hint="Enter total pizzas you need!"
            ></v-text-field>
            <v-text-field
              v-model.number="noCokes"
              type="number"
              placeholder="How many cokes do you need?"
              prepend-icon="fastfood"
              hint="Enter total cokes you need!"
            ></v-text-field>     
            <v-btn 
                color="primary" 
                dark
                :loading="orderSubmitted"
                @click.native="orderSubmitted = !orderSubmitted"
            >
            Deliver Fast!
            </v-btn>                   
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <template v-if="orderSubmitted">
          <WorkflowComponent 
            :mini="mini"
            :noPizzas="noPizzas" 
            :noCokes="noCokes" 
          >
          </WorkflowComponent>
        </template> 
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// @ is an alias to /src
import WorkflowComponent from '@/components/WorkflowComponent.vue'

export default {
  name: 'ComponentEvents',
  components: {
    WorkflowComponent
  },
    data() {
      return {
        mini: false,
        noPizzas: null,
        noCokes: null,
        orderSubmitted: false  
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
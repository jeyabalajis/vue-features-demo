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
              :error-messages="noPizzasErrors"
              @input="$v.noPizzas.$touch()"
              @blur="$v.noPizzas.$touch()"
            ></v-text-field>
            <v-text-field
              v-model.number="noCokes"
              type="number"
              placeholder="How many cokes do you need?"
              prepend-icon="fastfood"
              hint="Enter total cokes you need!"
              :error-messages="noCokesErrors"
              @input="$v.noCokes.$touch()"
              @blur="$v.noCokes.$touch()"
            ></v-text-field>
            <v-btn 
                color="primary" 
                dark
                :loading="orderSubmitted"
                @click.native="orderSubmitted = !orderSubmitted; orderCompleted = false;"
                :disabled="$v.fast_food_group.$invalid"
            >
            Deliver Fast!
            </v-btn>    
            <v-alert v-model="orderCompleted" outline color="info" icon="info">
              Your food is here. Enjoy your food!
            </v-alert>                              
          </v-card-text>
        </v-card>     
      </v-flex>
      <v-flex xs12>
        <template v-if="orderSubmitted">
          <WorkflowComponent 
            :mini="mini"
            :noPizzas="noPizzas" 
            :noCokes="noCokes" 
            v-on:complete="fnWorkflowCompleted()"
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
import { required, between } from "vuelidate/lib/validators";

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
        orderSubmitted: false,
        orderCompleted: false
      };
    },
    validations: {
      noPizzas: {
        required,
        between: between(1, 10)
      },
      noCokes: {
        between: between(1, 15)
      },
      fast_food_group: [
        'noPizzas',
        'noCokes'
      ]
    },
    methods: {
      fnWorkflowCompleted: function() {
        this.orderSubmitted = false;
        this.orderCompleted = true;
      }
    },
    created() {
      this.$store.commit("setPageTitle", "Component Basics");
    },
    computed: {
      noPizzasErrors() {
        const errors = [];
        if (!this.$v.noPizzas.$dirty) return errors;
        !this.$v.noPizzas.required &&
          errors.push("Please enter the total no. of pizzas you need.");

        !this.$v.noPizzas.between &&
          errors.push("You cannot order more than 10 pizzas at once!!");
        return errors;
      },
      noCokesErrors() {
        const errors = [];
        if (!this.$v.noCokes.$dirty) return errors;

        !this.$v.noCokes.between &&
          errors.push("You cannot order more than 15 cokes at once!!");
        return errors;
      }      
    }
}
</script>
<template>
    <v-card class="elevation-3" height="250px">
        <v-card-title class="title">
        Demo Room
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
            <v-form>
                <v-btn 
                    :color="compColor" 
                    dark
                    block
                    :round="propRound"
                    :outline="propOutline"
                    :loading="propLoading"
                >
                {{buttonText}}
                </v-btn>
            </v-form>
        </v-card-text>
    </v-card>    
</template>
<script>
  export default {
    props: {
        buttonText: {
        type: String,
        required: true,
        default: "Click Me!"
        },
        compColor: {
            type: String,
            required: true,
            default: "primary"
        },
        propRound: {
            type: Boolean,
            required: true,
            default: false
        },
        propOutline: {
            type: Boolean,
            required: true,
            default: false
        },
        propLoading: {
            type: Boolean,
            required: true,
            default: false
        }                
    },
    data() {
        return {};
    },
    created() {
        // console.log("button text: " + this.buttonText);
    }
  }
</script>

<style>

</style>
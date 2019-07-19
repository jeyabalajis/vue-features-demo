<template>
    <v-layout row>
        <v-flex xs12 sm6>
            <v-card flat height="400px">
                <v-card-title class="title">
                    Choose your input
                </v-card-title>
                <v-card-text>
                    <v-form>
                        <v-select
                            label="Choose your category"
                            :items="qodCategories"
                            v-model = "qodCategory"
                        >
                        </v-select>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-flex>
        <v-flex xs12 sm6>
            <template v-for="(quote) in quotes">
                <v-card flat height="400px" v-bind:key="quote.quote">
                    <v-card-title class="title">
                        {{ quote.title }}
                    </v-card-title>
                    <v-img
                    :src="quote.background">
                    </v-img>
                    <v-card-text>
                        {{ quote.quote }}
                    </v-card-text>
                </v-card>
            </template>
        </v-flex>
    </v-layout>
</template>
<script>
var qodService = require("../services/qodService");
export default {
    data() {
        return {
            qodCategories: [
                "inspire",
                "management",
                "sports"
            ],
            qodCategory: null,
            quotes: []
        }
    },
    watch: {
        qodCategory(newVal){
            this.fetchQuote();
        }
    },
    methods: {
        fetchQuote: function(){
            var params = {
                category: this.qodCategory
            }            
            qodService.getQod(
                params,
                function(result, response, error) {
                    if (result) {
                        if (response.data.contents.quotes) {
                            /* Retrieve the record from the result */
                            this.quotes = response.data.contents.quotes;
                        } else {
                            console.log("quotes not available")
                        }
                    } else {
                        console.log("the service returned error")
                    }
                    }.bind(this)                
            )
        }
    },
}
</script>
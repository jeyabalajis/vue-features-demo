<template>
    <v-container fluid grid-list-xs>
        <v-layout row>
            <template v-for="product in products">
                <v-flex xs12 sm4 v-bind:key="product">
                    <v-card flat>
                        <v-card-title class="title">
                            {{ product.product_name }}
                        </v-card-title>
                        <v-card-text>
                            {{ product.seller}}
                        </v-card-text>
                    </v-card>
                </v-flex>
            </template>
        </v-layout>
    </v-container>
</template>
<script>
export default {
    data() {
        return {
            products: [
                {
                    "product_name": "iPhone 6",
                    "seller": "ABCD",
                    "price": 26000
                },
                {
                    "product_name": "iPhone 10",
                    "seller": "XYZD",
                    "price": 80000
                },
                {
                    "product_name": "One plus 7",
                    "seller": "ABCD",
                    "price": 32000
                }                                
            ]
        }
    },
}
</script>

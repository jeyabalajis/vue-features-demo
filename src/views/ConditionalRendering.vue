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
                            label="Choose slices"
                            :items="sliceOptions"
                            v-model = "noOfSlices"
                        >
                        </v-select>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-flex>
        <v-flex xs12 sm6>
            <v-card flat height="400px">
                <v-card-title class="title">
                    Your Pizza
                </v-card-title>
                <v-card-text>
                    <v-container fluid align-center>
                        <v-layout align-center>
                            <v-flex xs12>
                                <v-progress-circular
                                    :size="150"
                                    :width="15"
                                    :rotate="360"
                                    :value="noOfSlices*25"
                                    color="primary"
                                    style="font-size: 30px"
                                >
                                </v-progress-circular>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>
<script>
export default {
    data() {
        return {
            noOfSlices: null,
            sliceOptions: [1, 2, 3, 4]
        }
    },
}
</script>

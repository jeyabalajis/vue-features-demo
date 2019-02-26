<template>
    <v-card class="elevation-3">
        <v-card-title class="title">
        Pizza Order Status 
        </v-card-title>
        <v-divider></v-divider>
        <template v-if="progressBar">
            <v-progress-linear
            v-bind:indeterminate="progressBar"
            v-bind:active="progressActive"
            height="2"
            ></v-progress-linear>
        </template>
        <template v-if="(typeof workflowInstance != 'undefined' && workflowInstance != null)">
            <v-card-text>
                <v-stepper flat v-model="stepperMonitor" non-linear :id="mainStepper">
                    <v-stepper-header>
                        <template v-for="(stage,index) in workflowInstance.stages">
                        <v-stepper-step
                            :step="stage.stage_order"
                            :complete="stepperMonitor > stage.stage_order"
                            :editable="stepperMonitor == stage.stage_order"
                            :key="stage.stage_name"
                        >
                            {{ stage.stage_name }}
                            <small>{{ stage.stage_desc}}</small>
                        </v-stepper-step>
                        <v-divider 
                            v-if="index != workflowInstance.stages.length-1"
                            :key="stage.stage_name"
                        ></v-divider>
                        </template>
                    </v-stepper-header>
                    <template v-if="!mini">
                        <v-card flat>
                            <v-card-text>
                                TBD....
                            </v-card-text>
                        </v-card>
                    </template>
                </v-stepper>
            </v-card-text>
        </template>
    </v-card>    
</template>
<script>
import * as workerInterval from "worker-interval";

export default {
props: {
    mini: {
        type: Boolean,
        required: true,
        default: false
    },
    noPizzas: {
        type: Number,
        required: true
    },
    noCokes: {
        type: Number,
        required: true
    }                
},
data() {
    return {
        stepperCount: 0,
        stepperMonitor: 0,
        mainStepper: "mainStepper",
        steps: 1,
        wfSync: false,
        wfClosed: false,
        interval: "",
        progressBar: true,
        progressActive: false,
        workflowInstance: {
            workflow_name: "Pizza Delivery",
            stages: [
                {
                    stage_order: 1,
                    stage_name: "START",
                    stage_desc: "Receiving Order" ,
                    status: "ACTIVE"  
                },
                {
                    stage_order: 2,
                    stage_name: "COOK",
                    stage_desc: "Preparing your Order...",
                    status: "PENDING"   
                },
                {
                    stage_order: 3,
                    stage_name: "DELIVER",
                    stage_desc: "Delivering your Order...",
                    status: "PENDING"      
                }
            ],
            currentStage: {}
        }
    };
},
watch: {
    wfSync: function() {
        if (this.wfSync) {
            this.interval = workerInterval.setInterval(
                function refreshWorkflow() {
                this.getWorkflowSummary();
                }.bind(this),
                1000
            );
        } else {
            workerInterval.clearInterval(this.interval);
        }
    }
},
created() {
    this.wfSync = true;
},
beforeDestroy() {
    workerInterval.clearInterval(this.interval);
    this.wfSync = false;
},
methods: {
    fnActivateProgressBar: function() {
      this.progressBar = true;
      this.progressActive = true;
    },
    fnResetProgressBar: function() {
      this.progressBar = false;
      this.progressActive = false;
    },
    getWorkflowSummary: function() {
        this.fnActivateProgressBar();

        if (
            typeof this.workflowInstance.stages != "undefined" &&
            this.workflowInstance.stages != null &&
            this.workflowInstance.stages.length > 0
        ) {
        var index, length;
        length = this.workflowInstance.stages.length;
        this.stepperCount = this.workflowInstance.stages.length;
        var completedCount = 0;
        for (index = 0; index < length; ++index) {
            if (
            this.workflowInstance.stages[index].status == "ACTIVE"
            ) {
                this.stepperMonitor = this.workflowInstance.stages[
                    index
                ].stage_order;
                this.currentStage = this.workflowInstance.stages[index];
                break;
            } else {
                if (
                    this.workflowInstance.stages[index].status ==
                    "COMPLETED"
                ) {
                    completedCount = completedCount + 1;
                }
            }
        }
        if (completedCount >= this.stepperCount) {
            this.fnResetProgressBar();
            this.stepperMonitor = this.stepperCount + 1;
            this.wfClosed = true;
            this.wfSync = false;
            this.$emit("complete");
        }
        }
    }        
}
}
</script>

<style>

</style>
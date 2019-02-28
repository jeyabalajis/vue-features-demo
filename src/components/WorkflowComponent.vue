/* eslint-disable */
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
                            <small>{{ stage.stage_sub_title}}</small>
                        </v-stepper-step>
                        <v-divider 
                            v-if="index != workflowInstance.stages.length-1"
                            :key="index"
                        ></v-divider>
                        </template>
                    </v-stepper-header>
                    <template v-if="!mini && currentStage">
                        <v-card flat>
                            <v-card-title>
                            </v-card-title>
                            <v-card-text>
                                <v-layout row align-content-center>
                                    <template v-if="currentStage">
                                        <v-flex xs12 sm1>
                                            <v-avatar color="teal">
                                            <span class="white--text headline">
                                                {{currentStage.stage_order}}
                                            </span>
                                            </v-avatar>                                
                                        </v-flex>
                                        <v-flex xs12 sm10>
                                            <div class="fnGetClass">
                                                {{fnGetTaskDesc}}
                                            </div>
                                        </v-flex>
                                    </template>
                                </v-layout>
                            </v-card-text>
                        </v-card>
                    </template>
                    <template v-if="wfClosed">
                        <v-card flat>
                            <v-card-text>
                                <div class="pa-5 ma-5 title">
                                    {{wfClosedText}}
                                </div>
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
        intervalUpd: "",
        progressBar: true,
        progressActive: false,
        currentStage: null,
        currStageIndex: 0,
        wfClosedText: "Order shipped. Enjoy your meal!",
        workflowInstance: {
            workflow_name: "Pizza Delivery",
            stages: [
                {
                    stage_order: 1,
                    stage_name: "START",
                    stage_sub_title: "Order Received",
                    stage_desc: "Your Order is received! Please sit tight while we get it cooked...." ,
                    status: "ACTIVE"  
                },
                {
                    stage_order: 2,
                    stage_name: "COOK",
                    stage_sub_title: "Preparing your Order...",
                    stage_desc: "Yay! Started cooking your order... can't wait to deliver...." ,
                    status: "PENDING"   
                },
                {
                    stage_order: 3,
                    stage_name: "DELIVER",
                    stage_sub_title: "Delivering your Order...",
                    stage_desc: "Here we come! Shipping your order to your home" ,
                    status: "PENDING"
                }
            ]            
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
                this.noPizzas*1000+this.noCokes*200
            );
        } else {
            workerInterval.clearInterval(this.interval);
        }
    }
},
created() {
    this.wfSync = true;
    this.getWorkflowSummary();
},
beforeDestroy() {
    workerInterval.clearInterval(this.interval);
    this.wfSync = false;
},
computed: {
    fnGetClass() {
        switch(this.$vuetify.breakpoint.name) {
            case 'xs':
                return "caption py-6";
            case 'sm':
                return "caption py-6";
            case 'md':
                return "subtitle py-6";
            case 'lg':
                return "title py-6";
            case 'xl':
                return "title py-6";
        }
    },
    fnGetTaskDesc() {
        switch(this.$vuetify.breakpoint.name) {
            case 'xs':
                return this.currentStage.stage_sub_title;
            case 'sm':
                return this.currentStage.stage_sub_title;
            case 'md':
                return this.currentStage.stage_desc;
            case 'lg':
                return this.currentStage.stage_desc;
            case 'xl':
                return this.currentStage.stage_desc;
        }
    }
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
    fnMarkStageCompleted: function(index) {        
        setTimeout(
            ()=> {
                this.workflowInstance.stages[index].status = "COMPLETED";    
                if (index < this.workflowInstance.stages.length-1) {
                    this.workflowInstance.stages[index+1].status = "ACTIVE";
                    this.currStageIndex = index+1;
                }
            },
            1000
        );
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
                this.currentStage = null;
                this.stepperMonitor = this.stepperCount + 1;
                this.wfClosed = true;
                this.wfSync = false;
                this.$emit("complete");
            }
        }

        // Simulating a workflow operation that happens in the backend
        this.fnMarkStageCompleted(this.currStageIndex);

    }        
}
}
</script>

<style>

</style>
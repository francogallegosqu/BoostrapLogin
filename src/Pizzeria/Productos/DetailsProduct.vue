<template>
    <div >
        <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
      <!-- Card stats -->
      <b-row>
        <b-col xl="3" md="6">
          <stats-card title="Total traffic"
                      type="gradient-red"
                      sub-title="350,897"
                      icon="ni ni-active-40"
                      class="mb-4">

            <template slot="footer">
              <span class="text-success mr-2">3.48%</span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </b-col>
        <b-col xl="3" md="6">
          <stats-card title="Total traffic"
                      type="gradient-orange"
                      sub-title="2,356"
                      icon="ni ni-chart-pie-35"
                      class="mb-4">

            <template slot="footer">
              <span class="text-success mr-2">12.18%</span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </b-col>
        <b-col xl="3" md="6">
          <stats-card title="Sales"
                      type="gradient-green"
                      sub-title="924"
                      icon="ni ni-money-coins"
                      class="mb-4">

            <template slot="footer">
              <span class="text-danger mr-2">5.72%</span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>

        </b-col>
        <b-col xl="3" md="6">
          <stats-card title="Performance"
                      type="gradient-info"
                      sub-title="49,65%"
                      icon="ni ni-chart-bar-32"
                      class="mb-4">

            <template slot="footer">
              <span class="text-success mr-2">54.8%</span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </b-col>
      </b-row>
    </base-header>
       
        <b-card-body class="px-lg-5 py-lg-5">
              <div class="text-center text-muted mb-4">
                 <h2>{{product.Tittle}}</h2>
              </div>
              <validation-observer v-slot="{handleSubmit}" ref="formValidator">
                <b-form role="form" @submit.prevent="handleSubmit(onSubmit)">
                  <base-input alternative
                              class="mb-3"
                              name="Tittle"
                              :rules="{required: true}"
                              prepend-icon="ni ni-email-83"
                              placeholder="Tittle"
                              v-model="model.Tittle">
                  </base-input>

                  <base-input alternative
                              class="mb-3"
                              name="Price"
                              :rules="{required: true, min: 2}"
                              prepend-icon="ni ni-lock-circle-open"
                              type="number"
                              placeholder="Price"
                              v-model="model.Price">
                  </base-input>

                  
                  <div class="text-center">
                    <base-button  type="primary" native-type="submit" class="my-4">Update Pizza</base-button>
                  </div>
                </b-form>
              </validation-observer>
            </b-card-body>
        
    </div>
</template>

<script>
import BaseHeader from "@/components/BaseHeader";
import Notifications from 'vue-notification'

import Products from '@/api/Products'
export default {
    components:{
        BaseHeader,
        Notifications,
    },
    props:{
        id:{
            type:[Number,String],
            default:null,
            
        },
        // data:{
        //     type:Object,
            
        //     default:()=>{return {}}
        // }
    },
    data(){
        return{
           
          product:{},
          model:{
              Tittle:'',
              Price:'',
              Description:''
          }
            
        }
    },
    created(){
        Products.getId(this.id)
        .then(response => {
            let model =response.data
            this.model.Tittle=model.Tittle
            this.model.Price =model.Price
            this.Description =model.Description
            
            })
        // if( Object.entries(this.data).length===0 &&  this.id){
        //     Products.getId(this.id)
        //     .then(response => {this.product =response.data
        //         console.log(this.product)})
        //     .catch(error => console.log(error))
        // }else {
        //     this.product=this.data
        // }
        console.log(this.$route.params)
        const data = this.$route.params.data || null
        
        if(!data && this.id){
            Products.getId(this.id)
            .then(response => {this.product =response.data
                console.log(this.product)})
            .catch(error => console.log(error))
        }else {
            this.product=data
        }
    },
    // computed:{
    //     product:{
    //         get(){ 
    //             return this.data
    //             },
    //         set(value){ this.product = value}
            
    //     }
    // }
    methods:{
        onSubmit(){
            Products.updateById(this.id,this.model)
            .then(response =>{ 
              
              this.$router.push({name:'products'})
              // this.$toast.success('Success Update')
              })
            .catch(error =>{ 
              console.error(error)
              this.$toast.error(this.error)})
        }
    }
}
</script>
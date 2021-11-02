<template>
    <div>
        <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
      <!-- Card stats -->
      <b-row>
        
       
      </b-row>
    </base-header>
       <b-row >
         <b-col cols=3></b-col>
           <b-col cols="5">
        <b-card class=" mt-4 " >

              <div class="text-center text-muted mb-4">
                 <h2>Create Pizza</h2>
              </div>
              <validation-observer v-slot="{handleSubmit}" ref="formValidator">
                <b-form role="form" @submit.prevent="handleSubmit(onSubmit)">
                  <base-input alternative
                              class="mb-3"
                              name="Tittle"
                              :rules="{required: true}"
                              prepend-icon="ni ni-basket"
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
                  <b-form-textarea alternative
                              class="mb-3"
                              name="Price"
                              :rules="{required: true, min: 2}"
                              prepend-icon="ni ni-lock-circle-open"
                              type="tex"
                              placeholder="Description"
                              v-model="model.Description">
                  </b-form-textarea>

                  
                  <div class="text-center">
                    <base-button  type="primary" native-type="submit" class="my-4">Add Pizza</base-button>
                  </div>
                </b-form>
              </validation-observer>
        </b-card>
        </b-col>
        </b-row>

    </div>
</template>

<script>

import Products from '@/api/Products'
export default {
    components:{
       
    },
    data(){
        return{          
          model:{
              Tittle:'',
              Price:'',
              Description:''
          }
            
        }
    },
    mounted(){
        
            
        
    },
    methods:{
        onSubmit(){
            Products.addProduct(this.model)
            .then(response =>{ 
              
              this.$router.push({name:'products'})
              // this.$toast.success('Success Update')
              })
            .catch(error =>{ 
              console.error(error)
              this.$toast.error(this.error)})
            // console.log(this.model)
        }
    }
}
</script>
<template>
  <div>
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

            <template slot="actions" slot-scope="data">
              <button class="btn btn-dark" @click="update(data)" :ref="'btn' + data.index">Update</button>
            </template>
          </stats-card>
        </b-col>
      </b-row>
    </base-header>
    <h2></h2>
    
    
      <b-card-group class="m-4" columns>
      <ProductCard  v-for="(product) in products" 
      :key="product.id" 
      :data="product" 
      
      >
       
      </ProductCard>
      </b-card-group>
    
  </div>
</template>

<script>
import BaseHeader from "@/components/BaseHeader";
import Notifications from 'vue-notification'
import Products from '@/api/Products'
import ProductCard from '@/Pizzeria/Productos/components/ProductCard'
import { mapActions} from 'vuex'
import {mapState} from 'vuex'
// import { mapMutations } from "vuex";
export default {
  name: "Products",
  components: {
    BaseHeader,
    Notifications,
    ProductCard

  },
  data() {
    return {
       
    };
  },
  created(){
    this.GET_ALL_PRODUCTS()
    this.SET_USER()
    this.GET_FILTER(this.user.id)
     
  },
  computed:{
    ...mapState("MUser", ["user"]),
    ...mapState('Mproducts',['products']),
    ...mapState("Mcarry", ["carry","orders","orderonhold","detailsorder"]),
    
  },
  methods:{
    // ...mapMutations(["ADD_CARRY"]),
    ...mapActions("Mproducts",["get_simple","GET_ALL_PRODUCTS"]),
    // ...mapActions('Mproducts',['GET_PRODUCTS','DELETE_PRODUCT']),
    ...mapActions('Mcarry',['ADD_CARRY','GET_ORDERS','ADD_WAITING','GET_PRODUCTS','GET_FILTER']),
    ...mapActions('MUser',['SET_USER']),
    
    eliminarTarea(id){
      this.DELETE_PRODUCT(id)
      this.$toast.error('Deleted Product')
      console.log(id)
    },
    addCarry(product){
      // Products.createOrder()
      this.ADD_CARRY(product)
      this.$toast.success('Added Product')
    },
    
  }
};
</script>

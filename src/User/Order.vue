<template>
  <div>
    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
      <!-- Card stats -->
      <b-row> </b-row>
    </base-header>
    <h2>Monto Total {{ calculo }}</h2>
    <h2>Usuario {{ this.user.id }}</h2>
    <!-- <h2>Fecha {{fecha}}</h2> -->
    <h2>
      <span> Fecha {{ Date.now() || moment("dddd, MMMM Do YYYY") }}</span>
    </h2>
    <ul>
      <li v-for="item in carry" :key="item.id">{{ item }}</li>
    </ul>
    <ul>
      <li v-for="item in this.pendientes.detalle_ordens" :key="item.id">{{ item }}</li>
    </ul>
  
    <Carry></Carry>
    <b-button @click="registerOrder2">Register Order</b-button>
  </div>
</template>

<script>
import Carry from "@/User/Carry";
import { mapState } from "vuex";
import { mapActions } from "vuex";
import Products from "@/api/Products";
export default {
  name: "order",
  components: {
    Carry
  },
  data(){
    return{
      pendientes:{}
    }
  },
  created(){
  },
  mounted(){
    
  },
  computed: {
    
    ...mapState("Mcarry", ["carry","orders","detailsorder","orderonhold"]),
    ...mapState("MUser", ["user"]),
    
    arreglo() {
      let arreglo = [];
      let reformattedArray = this.carry.map(obj => {
        let robj = {
          product: obj.id,
          Quantity: obj.Quantity
        };
        arreglo.push(robj);
      });

      return arreglo;
    },
    calculo() {
      let TotalAmount = 0;
      this.carry.map(obj => {
        TotalAmount = TotalAmount + obj.Price * obj.Quantity;
      });
      return TotalAmount;
    }

  },
  methods: {
    ...mapActions("MUser", ["SET_USER"]),
    ...mapActions("Mcarry",["GET_ORDERS","ADD_WAITING","UPDATE_ORDER","SET_OBJ","DELETE_DETAILS_ORDER"]),
    registerOrder() {
      this.SET_USER();
      let obj = {
        TotalAmount: this.calculo,
        user: this.user
      };
      Products.createOrder(obj).then(response => {
        console.log(response);
        this.arreglo.map(obj => {
          let robj = {
            order: response.data.id,
            product: obj.product,
            Quantity: obj.Quantity
          };

          Products.createDetailsOrder(robj).then(response => {
            console.log(response.data);
          });
        });
      });
    },
    registerOrder2(){
      console.log(this.detailsorder)
      let valor=0
      this.detailsorder.map(obj=>{
        valor =valor+ (obj.Quantity)
        
      })
      let obj = {
        TotalAmount: valor,
        
      };
      console.log(this.orderonhold.id,obj)
      this.SET_OBJ(obj)
      this.UPDATE_ORDER(this.orderonhold.id)
      this.DELETE_DETAILS_ORDER()
      console.log("exitosa!")
    }
  }
};
</script>

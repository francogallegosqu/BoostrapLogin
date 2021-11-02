<template>
  <div>
    <b-card
      :title="data.Tittle"
      img-src="https://media-cdn.tripadvisor.com/media/photo-s/16/d2/a7/79/pizaza-pizza-with-mushrooms.jpg"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 20rem;"
      class="mb-2"
    >
      <b-card-text> Precio S/.{{ data.Price }} </b-card-text>
      <b-button-group size="sm" class="">
        <b-button
          href="#"
          variant="primary"
          :to="{ name: 'product', params: { id: data.id, data: data } }"
          >Editar</b-button
        >

        <b-button variant="secondary" @click="eliminarTarea(data.id)"
          >Eliminar</b-button
        >
        <b-button @click="addCarry(data)" v-if="qtyCart===0">Add Carry</b-button>
        <div class="botones" v-else>
            <button class="btns" @click="inc(data)">+</button>
            <button class="btns" @click="dec(data)">-</button>
        </div>
        <b-button @click="addCarry2(data)">addcarry2</b-button>
      </b-button-group>
    </b-card>
  </div>
  <!-- <b-card >
        <router-link :to="{ name: 'product', params: { id: data.id, data: data }}"><h2>{{data.Tittle}}</h2></router-link>
        
    </b-card> -->
</template>

<script>
import {mapState} from 'vuex'
import { mapActions} from 'vuex'
import Products from '@/api/Products'
import _ from 'lodash';
export default {
  props: {
    data: {
      type: Object,
      required: true
      // default:()=>{return {}}
    }
  },
  created(){
    this.SET_USER();
  },
  computed:{
    ...mapState('Mcarry',['carry','orders','orderonhold']),
    ...mapState("MUser", ["user"]),
    qtyCart(){
            var busqueda = _.find(this.carry, ['id',this.data.id])
            
            if(typeof busqueda == 'object'){
               return busqueda.Quantity
            }else{
              return 0;
            }
        }
  },
  methods:{
    ...mapActions("MUser", ["SET_USER"]),
    // ...mapMutations(["ADD_CARRY"]),
    ...mapActions('Mproducts',[
      'GET_PRODUCTS',
      'DELETE_PRODUCT',
    ]),
    ...mapActions('Mcarry',['ADD_CARRY','UPDATE_CARRY_QTY','UPDATE_CARRY_DEC','ADD_CARRY','USERID']),
    eliminarTarea(id){
      this.DELETE_PRODUCT(id)
      this.$toast.error('Deleted Product')
      console.log(id)
    },
    addCarry(product){
      // Products.createOrder()
      var busqueda = _.find(this.carry, ['id',this.data.id])
      if(typeof busqueda != 'object'){
        let modelCarry={
        id:product.id,
        Tittle:product.Tittle,
        Price:product.Price,
        Description:product.Description,
        Quantity:1
        }
      this.ADD_CARRY(modelCarry)
      this.$toast.success('Added Product')
      }
      
    },
    inc(product){
      this.UPDATE_CARRY_QTY(product)
      this.$toast.success('+1 Product')
    },
    dec(product){
      this.UPDATE_CARRY_DEC(product)
      this.$toast.success('-1 Product')
    },
    addCarry2(product){
      this.USERID(this.user.id)
      this.ADD_CARRY(product)
      // if(this.orderonhold === null){
      //   console.log("carrito vacio")
      //   let obj = {
      //     TotalAmount:0,
      //     user: this.user.id
      //   };
      //   Products.createOrder(obj).then(response => {
      //   console.log(response);
      //     let robj = {
      //       order: response.data.id,
      //       product: product.id,
      //       Quantity: 1
      //     };
      //     Products.createDetailsOrder(robj).then(response => {
      //       console.log(response.data);
      //     });
        
      // });

      
      // }
      // else {
      //   console.log("carrito lleno")
        
      //    let robj = {
      //       order: this.orderonhold.id,
      //       product: product.id,
      //       Quantity: 1
      //     };
      //     console.log(robj)
      //     Products.createDetailsOrder(robj).then(response => {
      //       console.log(response.data);
      //     });
      //     console.log("peticion exitosa!")
      // }
    }
  },
};
</script>

<template>
  <div>
    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
      <!-- Card stats -->
      <b-row> </b-row>
    </base-header>
    <h2 class="text-center m-3">CARRY</h2>
    <div>
      <b-table striped hover :items="detailsorder" >
        <template #cell(actions)="data">
          <b-button>{{ `comprar S/. ${data.item.Price}` }}</b-button>
        </template>
      </b-table>
    </div>
    <!-- <ul>
      <li v-for="item in detailsorder" :key="item.id" >{{item.Quantity}}</li>
    </ul> -->
   
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapActions } from "vuex";
export default {
  name: "carry",
  data() {
    return {
     
      
      fields: [
        "Tittle",
        { key: "Price", label: "precio" },
        "Description",
        "Quantity",
        "actions"
      ]
    };
  },
  created(){
    this.SET_USER()
    
    this.GET_FILTER(this.user.id)
    
  },
  mounted(){
  },
  computed: {
    ...mapState("MUser", ["user"]),
    ...mapState("Mcarry", ["carry","orders","orderonhold","detailsorder"]),
  },
  methods:{
    ...mapActions("Mcarry",["GET_ORDERS","ADD_WAITING","GET_PRODUCTS","GET_FILTER"]),
    ...mapActions('MUser',['SET_USER']),
  }
};
</script>

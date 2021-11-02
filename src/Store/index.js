import Vue from 'vue'
import Vuex from 'vuex'
import Products from '@/api/Products'
import Mproducts from '@/modules/products'
import Mcarry from '@/modules/carry'
import MUser from '@/modules/User'
Vue.use(Vuex,"vuex")
export default new Vuex.Store({
    user:null,

    state:{
    
        
        
    },
    mutations:{
       
        
        
    },
    actions:{
        
        
    },
    modules:{
        Mproducts,
        Mcarry,
        MUser
    }
})


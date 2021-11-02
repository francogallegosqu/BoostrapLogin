import Products from '@/api/Products'
export default {
    namespaced:true,
    state:{
        products:[],
    },
    mutations:{
        SET_PRODUCTS(state,payload){
            state.products =payload
        },
        DELETE_PRODUCT(state,id){
            state.products = state.products.filter(e=> e["id"] !=id)
        }
    },
    actions:{
        GET_ALL_PRODUCTS({commit}){
            Products.get()
                .then(response => {
                    commit('SET_PRODUCTS',response.data)
                    console.log(response.data)
                })
                    .catch(error => console.error(error))
        },
        DELETE_PRODUCT({commit},id){
            commit('DELETE_PRODUCT',id)
            Products.deleteById(id)
                .then(response => {
                    
                    })
                    .catch(error => console.log(error))
        },
        get_simple({commit}){
            Products.get().then(response=>{
                console.log(response.data)
            })
        }
    },

}
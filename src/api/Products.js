

import Api from './index' 

const token = JSON.parse(localStorage.getItem("token"));
            
export default{
    
    async get_count_products(){
        return Api.get('/products/count');
    },
    async get(){
        return Api.get('/products')
    },
    async getId(id){
        return Api.get('/products/'+id)
    },
    async updateById(id,form){
        return Api.put(`/products/${id}`,form)
    },
    async addProduct(form){
        return Api.post('/products',form,
        {
            headers:{
                Authorization:'Bearer '+ token.jwt
            }
        })
    },
    async deleteById(id){
        return Api.delete(`/products/${id}`,{
            headers:{
                Authorization:'Bearer '+ token.jwt
            }
        })
    },
    async createOrder(form){
        return Api.post('/orders',form)
    },
    async createDetailsOrder(form){
        return Api.post('/detalle-ordens',form)
    }

    
    
}
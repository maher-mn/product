const home={template:`
<table class="table table-striped">
<thead>

<tr>
<th>product</th>
<th> 
            <div class="d-flex flex-row">

            <input class="form-control m-2"
                v-model="nameFilter"
                v-on:keyup="FilterFn()"
                placeholder="Filter"></div>
                <button type="button" class="btn btn-light"
                @click="sortResult('name',true)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                </svg>
                </button>            
name
<button type="button" class="btn btn-light"
@click="sortResult('name',false)">
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
<path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
</svg>
</button>
</th>
<th>


<button type="button" class="btn btn-light"
@click="sortResult('price',true)">
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
<path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
</svg>
</button>  

price
<button type="button" class="btn btn-light"
@click="sortResult('price',false)">
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
<path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
</svg>
</button>

</th>
</tr>
</thead>
<tbody>
<tr v-for="dep in product">
<td><img width="50px" height="50px" :src="PhotoPath+dep.image"/></td>
<td>{{dep.name}}</td>
<td>{{dep.price}}</td>
</tr>
</tbody>
</thead>
</table>

`,

data(){

    return{ 
    product:[],
    nameFilter:"",
    name:"",
    ProductWithoutFilter:[],
    PhotoFileName:"",
    PhotoPath:variables.IMG_URL
}
    
},
methods:{
    refreshData(){
        axios.get(variables.API_URL+"product").then((response)=>{
        this.product=response.data;
         this.ProductWithoutFilter=response.data;   
    });

    },
    FilterFn(){
        var nameFilter=this.nameFilter;

        this.product=this.ProductWithoutFilter.filter(
            function(el){
                return  el.name.toString().toLowerCase().includes(
                   nameFilter.toString().trim().toLowerCase()
             
               
                )
            });
    },
    sortResult(prop,asc){
        this.product=this.ProductWithoutFilter.sort(function(a,b){
            if(asc){
                return (a[prop]>b[prop])?1:((a[prop]<b[prop])?-1:0);
            }
            else{
                return (b[prop]>a[prop])?1:((b[prop]<a[prop])?-1:0);
            }
        })
    },
   


},

mounted:function(){
    this.refreshData();
}
}
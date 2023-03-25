import {createApp} from 'Vue'
// const {createApp} = Vue

const app = createApp(
    {
        data()
        {
            return 
            {
                dataBase: ""
            }
        },
        create()
        {
            
        },
        methods()
        {
            async startHome(){
                try{
                    const res = await fetch("https://mindhub-xj03.onrender.com/api/amazing")
                    const data =  await res.json()
                    this.dataBase = "hola"
                    
                }
                catch(error){
                    console.log(error)
                }
            }
        }

    }
).mount('#app')
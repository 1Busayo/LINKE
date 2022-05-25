import axios from 'axios'




const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhbXVlbCIsImlhdCI6MTY1MzA3OTg2Mn0.S2wUncLsGmnQMhhfikizzIfKoSl3xKsapVheElKw-tg'

export const POST = async (data) => {

    axios.post("http://localhost:3000/adduser", data, {
  headers: {
    'Authorization': `${token}` 
  }
})
} 


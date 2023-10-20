// const { LineAxisOutlined } = require("@mui/icons-material");

axios
  .get("http://127.0.0.1:8000/detty/")
  .then((resp)=>{
    let lists = resp.data
    lists.map((list)=>{
      console.log(list)
      let holder = document.getElementById("holder")
      let ul = document.createElement("ul")
      let h3 = document.createElement("h3")
      h3.innerText = list.fields.event_name
      ul.appendChild(h3)
      holder.appendChild(ul)
    })
  })
  .catch((err)=>{
    console.log(err)
    alert("Something failed")
  })
import {useState} from "react";
import api from "../services/api";

export default function Admin(){

const [form,setForm]=useState({
year:"",
difficulty:"easy",
question:"",
options:"",
answer:"",
explanation:""
});

const submit=async()=>{

const token=
localStorage.getItem("token");

await api.post(
"/api/questions",
{
...form,
options:form.options.split(",")
},
{
headers:{
Authorization:
`Bearer ${token}`
}
}
);

alert("Question Added");

};

return(

<div>

<h1>Admin Panel</h1>

<input
placeholder="Year"
onChange={(e)=>
setForm({
...form,
year:e.target.value
})
}
/>

<input
placeholder="Question"
onChange={(e)=>
setForm({
...form,
question:e.target.value
})
}
/>

<input
placeholder="Options comma separated"
onChange={(e)=>
setForm({
...form,
options:e.target.value
})
}
/>

<input
placeholder="Correct Answer"
onChange={(e)=>
setForm({
...form,
answer:e.target.value
})
}
/>

<textarea
placeholder="Explanation"
onChange={(e)=>
setForm({
...form,
explanation:e.target.value
})
}
/>

<button onClick={submit}>
Add Question
</button>

</div>

);

}
import  { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import axios from 'axios'
import './App.css'
const backend = "https://mehrad-backend-nodejs.herokuapp.com/employees"
function App() {
  const [fName, setfName] = useState('');
  const [lName, setlName] = useState('');
  const [email, setEmail] = useState('');
  const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   const fetchData = async() => {
  //     const response = await fetch('http://localhost:3000/employees');
  //     const jsonResponse = await response.json();
  //     setPosts(jsonResponse);
  //     console.log(jsonResponse);
  //   }
  //   fetchData();
  // }, []);


  

function getEmployees() {
    useEffect(() => {
    const fetchData = async() => {
      const response = await fetch(backend);
      const jsonResponse = await response.json();
      setPosts(jsonResponse);
      console.log(jsonResponse);
    }
    fetchData();
  }, []);
}
const handleSubmit = async () => {
  const data = { 
    first_name: fName,
    last_name: lName,
    email: email
  }
  const response = await fetch(backend, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  const jsonResponse = await response.json();
  console.log(jsonResponse);
}


const deletePost = async (id) => {
  axios.delete(`${backend}/${id}`)
  .then(res => {
    console.log(res)
    window.location.reload(true);
  }
  )
  .catch(err => {
    console.log(err)
  }
  )
}

getEmployees()
  return (
    <div className="App">
      {/* <form onSubmit={postEmp}>
        <button type="submit">Get Name</button>
      </form>
      <form onSubmit={addEmployee}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)}></input>
        <button type="submit">Get Name</button>
      </form> */}
      <div className="block p-6 rounded-lg shadow-lg bg-white max-w-md">
  <form onSubmit={handleSubmit}>
    <div className="grid grid-cols-2 gap-4">
      <div className="form-group mb-6">
        <input  value={fName} onChange={e => setfName(e.target.value)} type="text" className="form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput123"
          aria-describedby="emailHelp123" placeholder="First name"></input>
      </div>
      <div className="form-group mb-6">
        <input  onChange={e => setlName(e.target.value)} value={lName} type="text" className="form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput124"
          aria-describedby="emailHelp124" placeholder="Last name"></input>
      </div>
    </div>
    <div className="form-group mb-6">
      <input onChange={e => setEmail(e.target.value)} value={email} type="email" className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput125"
        placeholder="Email address"></input>
    </div>
    <div className="form-group form-check text-center mb-6">
    </div>
    <button type="submit" className="
      w-full
      px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out">Add employee</button>
  </form>
</div>
    <div className="grid grid-cols-2 gap-4">
      {posts.map((post) => (
        <div key={post.id}>
          <p className="text-white font-medium">{post.first_name} {post.last_name}</p>
          <p className="text-blue-600">{post.email}</p>
          <button className="outline: 1px dotted;
           outline: 5px auto -webkit-focus-ring-color " 
           onClick={() => deletePost(post._id)}>Delete</button>
        </div>
      ))}
    </div>
    </div>
  );
}

export default App

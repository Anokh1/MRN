import './App.css';
import { useState } from "react";
import Axios from "axios";

function App() {

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState(0);

  const [newSalary, setNewSalary] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);

  const addEmployee = () => {
    Axios.post('http://localhost:3001/create', {
      name: name,
      age: age,
      country: country,
      position: position,
      salary: salary,
    }).then(() => {
      console.log("Success")
      setEmployeeList([...employeeList, {
        name: name,
        age: age,
        country: country,
        position: position,
        salary: salary,
      }])
    })
  };

  const getEmployee = () => {
    Axios.get('http://localhost:3001/employees').then((response) => {
      // console.log(response); 
      setEmployeeList(response.data);
    })
  }

  const updateSalary = (id) => {
    Axios.put('http://localhost:3001/update', { salary: newSalary, id }).then(
      (response) => {
        alert("Updated Salary");
        // setEmployeeList(response.data); 
        setEmployeeList(employeeList.map((val) => {
          return val.id == id ? { id: val.id, name: val.name, country: val.country, position: val.position, age: val.position, salary: newSalary } : val
        }))
      }
    );
  };

  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then(
      (response) => {
        setEmployeeList(employeeList.filter((val) => {
          return val.id != id
        }))
      }
    )
  }


  return (
    <div className="App">
      <div className="information">
        <label>N A M E</label>
        <input type="text" onChange={(event) => { setName(event.target.value); }}></input>
        <label>A G E</label>
        <input type="number" onChange={(event) => { setAge(event.target.value); }}></input>
        <label>C O U N T R Y</label>
        <input type="text" onChange={(event) => { setCountry(event.target.value); }}></input>
        <label>P O S I T I O N</label>
        <input type="text" onChange={(event) => { setPosition(event.target.value); }}></input>
        <label>S A L A R Y</label>
        <input type="number" onChange={(event) => { setSalary(event.target.value); }}></input>
        <button onClick={addEmployee}>S U B M I T</button>
      </div>

      <div className='employees'>
        <button onClick={getEmployee}>D I S P L A Y</button>

        {employeeList.map((val, key) => {
          return (
            <div className='employee'>
              <div>
                <h3>Name: {val.name}</h3>
                <h3>Age: {val.age}</h3>
                <h3>Country: {val.country}</h3>
                <h3>Position: {val.position}</h3>
                <h3>Salary: {val.salary}</h3>
              </div>
              <div>
                {""}
                <input type="text" placeholder='2000...'
                  onChange={(event) => {
                    setNewSalary(event.target.value)
                  }}></input>
                <button onClick={() => { updateSalary(val.id) }}>U P D A T E</button>
                <button onClick={() => { deleteEmployee(val.id) }}>D E L E T E</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;

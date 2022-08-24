import React from "react";
import axios from "axios";
function Test() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = {
        first_name: "ALI",
        last_name: "MEMM",
        email: "sldjofds@gmail.com",
        password: "122",
        isAdmin: true,
        photo: "src",
        profession: "IT",
        interest: "computer",
        about: "anything",
      };
      const response = await axios.post(`http://localhost:8000/users`, user);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return <div ><button className="btn-test" onClick={(e) =>  handleSubmit(e)}>create Test</button>
  </div>;
}

export default Test;

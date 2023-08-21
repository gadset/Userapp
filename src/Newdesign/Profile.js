import React, { useState, useEffect } from 'react';

function Profile() {
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user details from the backend
    // fetch(process.env.REACT_APP_BACKEND + 'users/getuser' ,  {
    //     method: 'POST',
    //     headers: {
    //       'Accept': 'application/json, text/plain, */*',
    //       'Content-Type': 'application/json'
    //     }, 
    //     body : JSON.stringify({
    //       "id" : localStorage.getItem("gadsetid"),
    //     }),   
    //   }) // Replace with your actual API endpoint
    //   .then(response => response.json())
    //   .then(data => {
    //     setUserDetails(data['data']);
    //     console.log(data);
    //     setLoading(false);
    //   });


        fetch(process.env.REACT_APP_BACKEND + 'users/getquotes' ,  {
        method: 'GET',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }, 
        // body : JSON.stringify({
        //   "id" : localStorage.getItem("gadsetid"),
        // }),   
      }) // Replace with your actual API endpoint
      .then(response => response.json())
      .then(data => {
       // setUserDetails(data['data']);
        console.log(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile">
      <h1>User Profile</h1>
      {/* <p>Name: {userDetails.name}</p>
      <p>Phone Number: {userDetails.phone}</p>
     <p>Address : {userDetails.address['landmark']},{userDetails.address['city']},{userDetails.address['pin']}</p> */}
    </div>
  );
}

export default Profile;

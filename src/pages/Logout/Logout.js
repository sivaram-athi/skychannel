import axios from "axios";
import React from "react";
import Swal from "sweetalert2";

const Logout = () => {
  axios.get("https://beedesk.skyhms.in/skychnl/logout").then((response) => {
    console.log(response.data);
    if (response.data.success === true) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Logout successfully!",
        timer: 2000,
        showConfirmButton: false,
      });
      setTimeout(() => {
        // window.close();
        // window.location.replace("https://devnew.skyhms.in/newlogin/logout");
      },3000);
    }
  });
  return <></>;
};

export default Logout;


const checkMiddle = async() => {
  if(localStorage.getItem("user")===null){
    window.location = "/authentication/sign-in"
  }
};
export default checkMiddle;
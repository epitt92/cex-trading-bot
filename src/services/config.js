const apiport = 80;
const endpoint = ()=>{
	return (window.location.protocol+"//"+window.location.hostname+":"+apiport);
	//return ("http://54.197.173.122");
}
export default {
  APIPORT:apiport,
  endpoint:endpoint
};
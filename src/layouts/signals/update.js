// Material Dashboard 2 React Examples
import DefaultLineChart from "examples/Charts/LineCharts/DefaultLineChart";
import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import Switch from '@mui/material/Switch';

import MDTypography from "components/MDTypography";
import { useEffect,useState } from "react";
import checkMiddle from "../../services/middle.service";

import MDInput from "components/MDInput";
import {
  useParams
} from "react-router-dom"


function HopperUpdate() {
  
  checkMiddle();
  let { id } = useParams();

  const [name,setName] = useState("");
  const [apikey,setApikey] = useState("");
  const [secret,setSecret] = useState("");
  const [testnet,setTestnet] = useState(false);

  useEffect(()=>{
    const process = async()=>{

      const exchange = await myexchange.getExchange(id)
      if(exchange.data){
        setName(exchange.data.exchangename);
        setApikey(exchange.data.apikey);
        setSecret(exchange.data.secret);
        setTestnet(exchange.data.isdemo?exchange.data.isdemo:false);
      }
    }
    if(id!="Create"){
      process();
    }
  },[])

  const enableConnect =  name!=="" && apikey!="" && secret!=""
  
  const doConnect = async()=>{
    if(enableConnect){
      const rt = await myexchange.setExchange(name,apikey,secret,id,testnet);
      if(rt.data.message){
        window.alert("Please input correct api key");
      }else{
        window.location = "/dashboard"
      }
    }
  }
  return(
    <DashboardLayout>
      <DashboardNavbar />
        <Grid container spacing={2}>
          <Grid item xs={12}  md={12} lg={12}>
            <MDTypography variant="caption" fontWeight="light">
              Please input exchange api key and secret
            </MDTypography>
          </Grid>
          <Grid item xs={12}  md={6} lg={3}>
            <MDInput label="Name" value={name} onChange={(e)=>setName(e.target.value)} fullWidth/>                   
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
           <MDInput label="Apikey"  value={apikey} onChange={(e)=>setApikey(e.target.value)} fullWidth/>                   
          </Grid>
          <Grid item xs={12} md={6} lg={12}>
           <MDInput label="secret" value={secret} onChange={(e)=>setSecret(e.target.value)} fullWidth/>                   
          </Grid>
          <Grid item xs={12} md={6} lg={12}>
          <Switch color="secondary"  checked={testnet} onChange={(e)=>setTestnet(event.target.checked)}/>
          <MDTypography variant="button" color="secondary" p={1}>
            {testnet?"This is for TestNet.":"This is for Live."}
                         
          </MDTypography>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
           <MDButton variant="contained" color="info" onClick={doConnect}>Connect</MDButton>       
          </Grid>
        </Grid>
    </DashboardLayout>   
    )

}

export default HopperUpdate;

/**
=========================================================
* Material Dashboard 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import DataTable from "examples/Tables/DataTable";
import checkMiddle from "services/middle.service";
import HoppersService from "services/hopper.service";
import { useEffect,useState } from "react";
import showAlert from "services/alert"

import {
  useNavigate
} from "react-router-dom"
// Data

function Hoppers() {
  
  let navigate = useNavigate();
  //checkMiddle();
  const [hoppers,setHoppers] = useState([]);
  
  const doEdit =(hopperId)=>{
    navigate("/hoppers/"+hopperId, { replace: true });
  }

  const doDelete =async(hopperId)=>{
    await HoppersService.deleteItem(hopperId);
    process();
    showAlert.showAlert("Sent request to delete")
  }
  async function process() {
    const hoppersData = await HoppersService.getList();
    let newData = [];
    hoppersData.data.map((hopper)=>{
      newData.push({
        name : hopper.hoppername,
        action:<MDBox lineHeight={1} >
                <MDButton variant="outlined" size="small" color="secondary" onClick={()=>doEdit(hopper.id)}>
                  Edit
                </MDButton>&nbsp;
                <MDButton variant="outlined" size="small" color="warning" onClick={()=>doDelete(hopper.id)}>
                  Delete
                </MDButton>
              </MDBox>
      })
    })
    setHoppers(newData);
  }

  useEffect(() => {

     process();
  }, [])
  const hoppersColumns =[
      { Header: "Name", accessor: "hoppername",  align: "left" },
      { Header: "Token Set", accessor: "tokensetName",  align: "left" },
      { Header: "Interval", accessor: "interval",  align: "left" },
      { Header: "Force Sell", accessor: "forceSell",  align: "left" },
      { Header: "Actions", accessor: "action", align: "center" },
    ];
  

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox pt={3}>
                <DataTable
                  table={{ "columns":hoppersColumns, "rows":hoppers }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12}  md={4} lg={4}>
          </Grid>
          <Grid item xs={12}  md={4} lg={4}>
           <MDButton variant="contained" color="info" fullWidth onClick={()=>doEdit("Create")}>Add New</MDButton>       
          </Grid>
          <Grid item xs={12}  md={4} lg={4}>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Hoppers;

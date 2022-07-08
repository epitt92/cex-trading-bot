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
import SignalsService from "services/signal.service";
import { useEffect,useState } from "react";
import showAlert from "services/alert"

import {
  useNavigate
} from "react-router-dom"
// Data

function Signals() {
  
  let navigate = useNavigate();
  //checkMiddle();
  const [signals,setSignals] = useState([]);
  const getExchangeName = (index)=>{
    if(Number(index)==0) return "Binance";
    if(Number(index)==1) return "Kucoin";
    if(Number(index)==2) return "Kraken";
  }
  async function process() {
    const SignalsData = await SignalsService.getList();
    let newData = [];
    console.log({SignalsData})
    SignalsData.data.map((signal)=>{
      const od = new Date(signal.openTime*1000)
      const openDate = (od.toLocaleString());//.substring(0,19).replace('T'," ").replace('Z',' ')
      const symbol = signal.symbol;
      const buyExchange = getExchangeName(signal.buyExchange);
      const sellExchange = getExchangeName(signal.sellExchange);
      const ask = signal.ask;
      const bid = signal.bid;
      const profit = signal.profit;
      newData.push({openDate,symbol,buyExchange,ask,sellExchange,bid,profit})

    })
    console.log(newData)
    setSignals(newData);
    setTimeout(()=>{process()},30000)
  }

  useEffect(() => {
    process();
  }, [])
  const signalsColumns =[
      { Header: "Open Date", accessor: "openDate",  align: "left" },
      { Header: "Symbol", accessor: "symbol",  align: "left" },
      { Header: "Buy Exchange", accessor: "buyExchange",  align: "left" },
      { Header: "Sell Exchange", accessor: "sellExchange",  align: "left" },
      { Header: "ask", accessor: "ask",  align: "right" },
      { Header: "bid", accessor: "bid", align: "right" },
      { Header: "profit(%)", accessor: "profit", align: "right" },

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
                  table={{ "columns":signalsColumns, "rows":signals }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Signals;


function Token(props) {
  (
 
    const [tokenList,setTokenList] = useState(["BNB","CAKE"])
    const [token,setToken] = useState(props.token);

    const handleChange = (e)=>{
      setToken(e.target.value);
      props.setToken(e.target.value);
    }
    return (
      <FormControl >
        <InputLabel >Symbol</InputLabel>
        <Select value={token} onChange={this.handleChange} sx={{ height: "2.7em",width:"10em" }} label="symbol">
          {
            tokenList.map((token)=>{
              return(
                <MenuItem key={token} value={token}>{token+"USDT"}</MenuItem>
              )
            })
          }
        </Select>
      </FormControl>
    );
  }
);

export default Token;

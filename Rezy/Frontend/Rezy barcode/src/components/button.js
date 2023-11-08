 
function ButtonStyle({Text,onClick}) {

const style = {
  backgroundColor: "#8bc34a",
  border: "none",
  color: "white",
  padding: "20px 50px 20px 50px",
  textAlign: "center",
  textDecoration: "none",
  display: "inline-block",
  fontSize: "calc(8px + 2vmin)",
  margin: "4px 2px",
  borderRadius: "15px",
  marginTop: "calc(20px + 2vmin)"
}

  return (
    <button style={style} onClick={onClick}>{Text}</button>
  );

}

export default ButtonStyle;

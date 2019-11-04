import React from 'react';

var style = {
  backgroundColor: "#343A40",
  borderTop: "2px solid #979797",
  textAlign: "center",
  color: "#FFFFFF",
  padding: "20px",
  position: "fixed",
  left: "0",
  bottom: "0",
  height: "80px",
  width: "100%",
}

var phantom = {
display: 'block',
padding: '20px',
height: '80px',
width: '100%',
}

const Footer = ({ copyRight, token }) => {
  if (token) {
    return null;
  }
  return (
    <div>
        <div style={phantom} />
        <div style={style}>
            <h5>{copyRight}</h5>
        </div>
    </div>
  );
};

export default Footer;

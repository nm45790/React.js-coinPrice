import { Link } from "react-router-dom";
import styled from "styled-components";

const BackButton = styled.button`
position: fixed;
top: 100px;
text-align: center;
font-size: 20px;
border-radius: 100px;
padding: 16px;
margin-left: 16px;
background-color: rgba(0,0,0,0.5);
color:${props => props.theme.accentColor} ;
`;

function BackBtn() {
    return <Link to={`/`}> <BackButton>&larr;</BackButton></Link>
}
export default BackBtn;
import styled from "styled-components";
import theme from "./theme";

const backGround_gradation_V = styled.input`
    background-color : linear-gradient(${theme.theme.point1_main}, ${theme.theme.point1_main});   
`
export { backGround_gradation_V }


const backGround_gradation_H = styled.input`
    background-color : linear-gradient(to right,${theme.theme.brand1_main}, ${theme.theme.brand2_main});   
`
export { backGround_gradation_H }

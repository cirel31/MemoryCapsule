import styled from "styled-components";

const StyledInput = styled.input`
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid #adb5bd;
  padding-bottom: 0.5rem;
  outline: none;
  width: 100%;
  &:focus {
    color: cornflowerblue;
    border-bottom: 1px solid #495057;
  }
  & + & {
    margin-top: 1rem;
  }
`
export { StyledInput }

const StyledInputForm = styled.input`
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid #adb5bd;
  padding-bottom: 0.5rem;
  outline: none;
  width: 100%;
  height: 250px;
  &:focus {
    color: cornflowerblue;
    border-bottom: 1px solid #495057;
  }
  & + & {
    margin-top: 1rem;
  }
`
export { StyledInputForm }
import styled from "styled-components";
import theme from "./theme";

const AuthFormBlock = styled.div`
  form label {
    color : ${theme.theme.brand3_main};
    font-weight: bold;
    padding : 1rem;
  }
  
  select {
    appearance:none;
    color : ${theme.theme.brand3_main};
    border : none;
    background-color: ${theme.theme.backGround_main};
    outline: none;
    width : 5rem;
    margin-bottom : 1rem;
    text-align-last: center;
    border-radius : 1rem;
  }
`;
export { AuthFormBlock }

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


const StyledBox = styled.div`
  .logo-area {
    display: block;
    padding-bottom: 2rem;
    text-align: center;
    font-weight: bold;
    letter-spacing: 2px;
  }
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
  padding: 2rem;
  width: 360px;
  border-radius: 2px;
`
const WhiteBox = props => <StyledBox { ...props } />
export { WhiteBox }


const StyledBlock = styled.div`
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const FormBody = props => <StyledBlock { ...props } />
export { FormBody }


const StyledButton = styled.button`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  color: white;
  outline: none;
  cursor: pointer;
  width: 100%;
  background: #3bc9db;
  &:hover {
    background: #66f9e8;
  }
`
const CustomButton = props => <StyledButton { ...props } />
export { CustomButton }


const CheckBox = ({ children, disabled, checked, onChange }) => {
    return (
        <label>
            <input
                type="checkbox"
                disabled={disabled}
                checked={checked}
                onChange={({ target: { checked } }) => onChange(checked)}
            />
            {children}
        </label>
    )
}

export { CheckBox }
import styled from "styled-components";
import theme from "./theme";



const AuthFormBlock = styled.div`
  h3 {
    margin-bottom: 1rem;
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

const FreindEditor = styled.div`
    .DiaryEditor {
      border: 1px solid gray;
      text-align: center;
      padding: 20px;
    }
    
    .DiaryEditor input,
    textarea {
      margin-bottom: 20px;
      width: 500px;
    }
    
    .DiaryEditor input {
      padding: 10px;
    }
    .DiaryEditor textarea {
      padding: 10px;
      height: 150px;
    }
    
    .DiaryEditor select {
      width: 300px;
      padding: 10px;
      margin-bottom: 20px;
    }
    
    .DiaryEditor button {
      width: 500px;
      padding: 10px;
      cursor: pointer;
    }
`
export { FreindEditor }


const FriendItem = styled.div`    
    .FriendItem {
      background-color: ${theme.theme.backGround_main};
      margin-bottom: 10px;
      padding: 20px;
    }
    
    .FriendItem span {
      margin-right: 10px;
    }
    
    .FriendItem .info {
      border-bottom: 1px solid gray;
      padding-bottom: 10px;
      margin-bottom: 10px;
    }
    .FriendItem .date {
      color: gray;
    }
    
    .FriendItem .content {
      margin-bottom: 30px;
      margin-top: 30px;
      font-weight: bold;
    }
    
    .FriendItem textarea {
      padding: 10px;
    }
    
  .FriendItem .addFriend {
    color : ${theme.theme.brand1_main};
    background-color : ${theme.theme.point1_main};
    margin : 1rem;
    height: 50px;
  }
  
  .FriendItem .discardFriend {
background-color : ${theme.theme.point1_main};
    margin-bottom: 1rem;
    height: 50px;
  }
`;
export { FriendItem }


const FriendList = styled.div`
    .DiaryList {
      border: 1px solid gray;
      padding: 20px;
      margin-top: 20px;
    }
    
    .DiaryList h2 {
      text-align: center;
    }
`
export { FriendList }


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
  background: lightpink;
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


const StyledButtonFriend = styled.button`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  color: white;
  outline: none;
  cursor: pointer;
  width: 10rem;
  background: ${theme.theme.point1_main};
  &:hover {
    background: #66f9e8;
  }
`
const CustomButtonFriend = props => <StyledButtonFriend { ...props } />
export { CustomButtonFriend }


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
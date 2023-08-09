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
  }
`;
export { AuthFormBlock }


const NoFriendList = styled.div`
  .NoFriendList {
    display : grid;
    grid-template-columns: 1fr;
    grid-template-rows: minmax(1fr, auto);
    background-color: ${theme.theme.backGround_main};
    text-align : center;
    gap: 1rem;
    width : 1fr;
    padding : 1rem;
  }

  .NoFriendList .textBlock {
    font-weight : bold;
    color : ${theme.theme.point1_main};
    background-color: ${theme.theme.backGround_main};
    text-align : center;
  }
`
export { NoFriendList }


const AuthFormGrid = styled.div`
  .AuthFormGrid {
    display : grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    width : 1fr;
    padding : 1rem;
  }
`
export { AuthFormGrid }


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
      display: flex;
      justify-content: space-between;
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

    .FriendItem .CustomButtonFriend {
        margin : 1rem;
        height: 3rem;
        width: 3rem;
        border-radius : 100%;
    }

  .FriendItem .addFriend {
        color : ${theme.theme.brand1_main};
        background-color : ${theme.theme.point1_main};
  }

  .FriendItem .discardFriend {
        color : ${theme.theme.point1_main};
        background-color : ${theme.theme.brand1_main};
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

  grid-column: 2 / 3;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
  padding: 2rem;
  background: ${theme.theme.brand1_3};
`
const WhiteBox = props => <StyledBox { ...props } />
export { WhiteBox }


const StyledBlock = styled.div`
  display: grid;
  grid-template-columns: 1fr minmax(500px, 3fr) 1fr;
  gap: 1rem;
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
  background: ${theme.theme.brand1_main};
  &:hover {
    background: ${theme.theme.brand1_5};
  }
`
const CustomButton = props => <StyledButton { ...props } />
export { CustomButton }


const StyledButtonFriend = styled.button`
  border: none;
  text-align : center;
  padding : auto;
  border-radius: 4px;
  font-size: 2.5rem;
  font-weight: bold;
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
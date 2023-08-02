import styled from "styled-components";
import theme from "./theme";

const NoticeItem = styled.div`    
    .NoticeItem {
      color : ${theme.theme.white};
      margin-bottom: 10px;
      padding: 20px;
      border-radius : 1rem;
    }
    
    .NoticeItem span {
      margin-right: 10px;
    }
   
    .NoticeItem .info {
      background-color: ${theme.theme.brand3_main};
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid gray;
      padding-bottom: 10px;
      margin-bottom: 10px;
    }
    .NoticeItem .date {
      color: gray;
    }
    
    .NoticeItem .content {
      margin-bottom: 30px;
      margin-top: 30px;
      font-weight: bold;
    }
    
    .NoticeItem textarea {
      padding: 10px;
    }
    
    .NoticeItem .CustomButtonFriend {
        margin : 1rem;
        height: 1rem;
        width: 3rem;
        border-radius : 100%;
    }
`;
export { NoticeItem }
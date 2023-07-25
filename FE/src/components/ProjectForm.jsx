import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { StyledInput, StyledInputForm } from "../styles/projectStyle";

const ProjectForm = () => {
  const navigate = useNavigate()
  // 버튼 누르면 서버로 데이터 전송
  // 조건에 맞지 않으면 모달창 띄워서 경고

  return (
      <div>
        <form>
          <StyledInput
            id="title"
          />
          <StyledInputForm
            id="content"
            type="text"
          />
          <StyledInput
            id='friends'
          />
          <button style={{marginTop:'1rem '}}>생성하기</button>
        </form>
      </div>
  )
}

export default ProjectForm
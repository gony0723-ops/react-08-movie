import { useNavigate } from "react-router";
import { useState } from "react";
import styled from "styled-components";

const From = styled.from`
    display: flex;
    gap: 10px;
`;

const Input = styled.input`
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 8px;
`;

const Button = styled.button`
     padding: 12px;
     background-color: #ff5959;
     color: white;
     border-radius: 8px;
     cursor: pointer;
`;

const Input = styled.input``;

function SearchBar({ keyword }) {
  const navigate = useNavigate();

  const [input, setInput] = useState(keyword);

  const onChangeHandler = event => setInput(event.target.value);
}
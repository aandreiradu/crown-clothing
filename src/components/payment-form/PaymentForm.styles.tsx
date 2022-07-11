import styled from "styled-components";
import Button from '../button/button.component';

export const PaymentFormContainer = styled.div`
  height: 300px;
  width:100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const FormContainer = styled.form`
    height:100%;
    width:100%;

    @media screen and (max-width:800px){
      width: 100%;
      display:flex;
      flex-direction: column;
      margin: 20px 0;
    }
`


export const PaymentButton = styled(Button)`
    margin-left:auto;
    margin-top:20px;

    @media screen and (max-width:800px){ 
        display: flex;
        align-items:center;
        justify-content:center;
        width:100%;
        max-width:unset;
        margin-left: unset;
        margin-top: unset;
        margin: 20px; 0;
        text-align:center;        
    }
`

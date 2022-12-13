import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const fade = keyframes`
  from {
    opacity: 0;
    transform: scale3D(0.95, 0.95, 0.95);
  }
  to {
    opacity: 1;
    transform: scale3D(1, 1, 1);
  }
`;

const ErrorContainer = styled.div`
  color: #fff;
  display: flex;
  justify-content: center;
  padding: 0 15px;
  font-size: 13px;
  margin: -10px auto 0px auto;
  width: 100%;
  max-width: 450px;
  opacity: 90;
  animation: ${fade} 150ms ease-out;
  animation-delay: 50ms;
  animation-fill-mode: forwards;
  will-change: opacity;

  & svg {
    margin-right: 10px;
  }
`;

const CheckoutError = ({ children }) => (
  <ErrorContainer role="alert">
    <svg width="16" height="16" viewBox="0 0 17 17"></svg>
    {children}
  </ErrorContainer>
);

export default CheckoutError;

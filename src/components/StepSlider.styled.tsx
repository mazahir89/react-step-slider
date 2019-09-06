import styled, { css } from "styled-components";
import { motion } from "framer-motion";

export const Wrap = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  height: 20px;
`;

export const UnselectedLine = styled(motion.div)`
  position: absolute;
  left: 10px;
  right: 10px;

  background: wheat;
  height: 4px;
`;

export const SelectedLine = styled(motion.div)`
  position: absolute;
  left: 10px;
  right: 10px;
  width: 0;

  background: #776654;
  height: 4px;
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
  margin: 0 4px;
`;

interface StepProps {
  passed: boolean;
}

export const Step = styled.button<StepProps>`
  display: flex;
  width: 12px;
  height: 12px;
  padding: 0;
  background: wheat;
  border: none;
  border-radius: 50%;
  z-index: 0;
  box-shadow: 0 0 0 4px white;
  outline: none;

  ${({ passed }) =>
    passed &&
    css`
      background: #776654;
      box-shadow: none;
      z-index: 1;
    `}
`;

export const Thumb = styled(motion.button)`
  width: 20px;
  height: 20px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: #776654;
  position: absolute;
  z-index: 1;
`;

export const Arrow = styled.div`
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  margin-left: -1px;
  bottom: 32px;
  /* z-index: 0; */
  border: 8px solid black;
  border-color: transparent transparent #ffffff #ffffff;
  transform-origin: 0 0;
  transform: rotate(-45deg);
  /* box-shadow: 0 1px 6px lightgrey; */
  background-color: white;
`;

export const PopUp = styled.div`
  display: flex;
  align-items: center;
  position: absolute;

  & > ${Arrow}:first-of-type {
    filter: drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.14))
      drop-shadow(0px 3px 4px rgba(0, 0, 0, 0.12))
      drop-shadow(0px 1px 8px rgba(0, 0, 0, 0.2));
  }
`;
export const Tooltip = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  white-space: nowrap;
  transform: translate(calc(-50% + 10px), -64px);
  font-size: 16px;
  font-family: "Open Sans";
  padding: 8px 8px;
  background: white;
  box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.14),
    0px 3px 4px 0px rgba(0, 0, 0, 0.12), 0px 1px 8px 0px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
`;

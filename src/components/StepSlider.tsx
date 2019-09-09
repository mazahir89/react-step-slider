import React, { useState, useRef, useEffect } from "react";
import Measure from "react-measure";
import {
  useAnimation,
  useMotionValue,
  useSpring,
  transform
} from "framer-motion";
import {
  Container,
  Step,
  Wrap,
  UnselectedLine,
  SelectedLine,
  Thumb,
  PopUp,
  Arrow,
  Tooltip
} from "./StepSlider.styled";

interface Step {
  label: string;
  value: string | number;
}

interface Props {
  steps: Step[];
}

const keyCodes = {
  arrowLeft: 37,
  arrowRight: 39,
  home: 36,
  end: 35
};

function round(number: number, increment: number, offset: number = 0) {
  return Math.round((number - offset) / increment) * increment + offset;
}

function StepSlider({ steps }: Props) {
  const wrapRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [positionValue, setPositionValue] = useState(0);
  const position = useMotionValue(0);
  const [inDrag, setDrag] = useState(false);
  const animatedPosition = useSpring(position, {
    damping: 5000,
    stiffness: 4000
  });

  function handleThumpPress(event: React.KeyboardEvent<HTMLButtonElement>) {
    const keyCodeValue: number = positionValue;
    switch (event.keyCode) {
      case keyCodes.arrowRight: {
        const deltaX = Math.round(width / (steps.length - 1));
        const newValue = round(positionValue + deltaX, deltaX);
        if (newValue <= width) {
          setPositionValue(newValue);
          position.set(newValue);
        } else {
          setPositionValue(width);
          position.set(width);
        }
        break;
      }
      case keyCodes.arrowLeft: {
        const deltaX = Math.round(width / (steps.length - 1));
        const newValue = round(positionValue - deltaX, deltaX);
        if (newValue >= 0) {
          setPositionValue(newValue);
          position.set(newValue);
        } else {
          setPositionValue(0);
          position.set(0);
        }
        break;
      }
      case keyCodes.home: {
        event.preventDefault();
        setPositionValue(0);
        position.set(0);
        break;
      }
      case keyCodes.end: {
        event.preventDefault();
        setPositionValue(width);
        position.set(width);
        break;
      }
      default: {
        break;
      }
    }
    return keyCodeValue;
  }

  function getLabel() {
    const stepXPositions = steps.map((step, index) => {
      const XPosition = Math.round((width / (steps.length - 1)) * index);

      return XPosition;
    });
    const labels = steps.map((step, index) => index);
    const currentPossition = position.get();
    const value = transform(currentPossition, stepXPositions, labels, {
      clamp: true
    });

    return steps[Math.round(value)].label;
  }

  const controls = useAnimation();

  useEffect(() => {
    animatedPosition.onChange(x => {
      setPositionValue(x);
    });
  });

  function renderSteps() {
    return (
      <Container>
        {steps.map((step, index) => {
          const newPosition = Math.round((width / (steps.length - 1)) * index);
          return (
            <Step
              key={step.label}
              onClick={() => {
                position.set(newPosition);
              }}
              passed={positionValue >= newPosition}
            />
          );
        })}
      </Container>
    );
  }

  return (
    <Measure
      bounds
      onResize={contentRect => {
        setWidth(contentRect.bounds.width);
      }}
    >
      {({ measureRef }) => (
        <Wrap ref={wrapRef}>
          <UnselectedLine
            ref={measureRef}
            onTap={(event: any) => {
              setDrag(false);
              const iteration = Math.round(width / (steps.length - 1));
              position.set(round(event.offsetX, iteration));
            }}
          />
          {renderSteps()}
          <SelectedLine
            style={{ width: animatedPosition }}
            onTap={(event: any, info: any) => {
              setDrag(false);
              const iteration = Math.round(width / (steps.length - 1));
              position.set(round(event.offsetX, iteration));
            }}
          />
          <Thumb
            role="slider"
            aria-orientation="horizontal"
            aria-valuetext={getLabel()}
            drag="x"
            dragConstraints={wrapRef}
            dragElastic={0}
            dragMomentum={false}
            animate={controls}
            style={{ x: inDrag ? position : animatedPosition }}
            onDragStart={() => setDrag(true)}
            onDrag={(event, info) => {
              animatedPosition.set(info.point.x, false);
            }}
            onDragEnd={(event, info) => {
              setDrag(false);
              const iteration = Math.round(width / (steps.length - 1));
              position.set(round(info.point.x, iteration));
            }}
            onKeyDown={handleThumpPress}
          >
            <PopUp>
              <Arrow />
              <Tooltip>{getLabel()}</Tooltip>
              <Arrow />
            </PopUp>
          </Thumb>
        </Wrap>
      )}
    </Measure>
  );
}

export default StepSlider;

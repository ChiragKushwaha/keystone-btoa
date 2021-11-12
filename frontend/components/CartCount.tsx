import React from "react";
import styled from "styled-components";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const Dot = styled.div`
  background: var(--red);
  color: white;
  border-radius: 50%;
  padding: 0.5rem;
  line-height: 2rem;
  min-width: 3rem;
  margin-left: 1rem;
  font-feature-settings: "tnum";
  font-variant-numeric: tabular-nums;
`;

const AnimationStyles = styled.span`
  position: relative;
  .cont {
    display: block;
    position: relative;
    transition: transform 0.4s;
    backface-visibility: hidden;
  }
  .count-enter {
    transform: scale(4) rotateX(0.5turn);
  }
  .count-enter-active {
    transform: rotateX(0);
    background: green;
  }
  .count-exit {
    top: 0;
    position: absolute;
    transform: scale(4) rotateX(0);
  }
  .count-exit-active {
    background: pink;
    transform: scale(4) rotateX(0.5turn);
  }
`;
const CartCount = ({ count }: any) => {
  return (
    <AnimationStyles>
      <TransitionGroup>
        <CSSTransition
          unmountOnExit
          className="count"
          classNames="count"
          key={count}
          timeout={{ enter: 400, exit: 400 }}
        >
          <Dot>{count}</Dot>;
        </CSSTransition>
      </TransitionGroup>
    </AnimationStyles>
  );
};

export default CartCount;

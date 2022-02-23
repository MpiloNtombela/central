import {keyframes} from "@emotion/react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import React from "react";

const animate = keyframes`
  0% {
    transform: translateX(-120%);
  }
  100% {
    transform: translateX(120%);
  }
`;

const SkeletonContainer = styled.div(
  ({ theme }) => `
  background: ${theme.background.secondary};
  padding: ${theme.sizes.gutters[2]};
  border
`
);

const skeletonSizes = (skeletonSize) => ({
  text: {
    width: "100%",
    height: ".75rem",
  },
  header: {
    height: "1.5rem",
    width: "75%",
  },
  img: {
    height: `${3.75 + 2 * skeletonSize}rem`,
    width: `${3.75 + 2 * skeletonSize}rem`,
  },
  avatar: {
    height: `${1.5 + skeletonSize}rem`,
    width: `${1.5 + skeletonSize}rem`,
  },
});

const SkeletonAnimationContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  animation: ${animate} 2s infinite;
`;

const SkeletonAnimator = styled.div(
  ({ theme }) => `
  position: absolute;
  width: 25%;
  height: 100%;
  background: ${theme.background.glass};
  transform: skewX(-25deg);
  box-shadow: 0 0 2rem 2rem rgba(255, 255, 255, 0.15);
`
);

export const StyledSkeleton = styled.div(
  ({ theme, rectWidth, rectHeight, skeletonType, skeletonSize }) => {
    const size = skeletonSizes(skeletonSize);
    return `
    background: ${theme.background.main};
    width: ${skeletonType === "rect" ? rectWidth : size[skeletonType]["width"]};
    height: ${skeletonType === "rect" ? rectHeight : size[skeletonType]["height"]};
    margin-bottom: ${theme.sizes.gutters[2]};
    border-radius: ${skeletonType === "avatar" ? "50%" : theme.sizes.radius.sm};
    overflow: hidden;
`;
  }
);

const Skeleton = ({
  skeletonType = "text",
  skeletonSize = 1,
  rectWidth,
  rectHeight,
  style,
}) => {
  return (
    <StyledSkeleton
      skeletonType={skeletonType}
      skeletonSize={skeletonSize}
      rectWidth={rectWidth}
      rectHeight={rectHeight}
      style={style}>
      <SkeletonAnimationContainer>
        <SkeletonAnimator />
      </SkeletonAnimationContainer>
    </StyledSkeleton>
  );
};
Skeleton.propTypes = {
  skeletonType: PropTypes.oneOf(["text", "header", "img", "avatar", "rect"]),
  skeletonSize: PropTypes.number,
  rectWidth: PropTypes.string,
  rectHeight: PropTypes.string,
  style: PropTypes.object,
};
export default Skeleton;

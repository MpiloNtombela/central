import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";
import PropTypes from "prop-types";
import Card from "./Card";
import Grid, { GridCell } from "./Grid";

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

export const SkeletonContent = () => {
  return (
    <Card>
      <Skeleton style={{ width: "35%" }} />
      <Skeleton />
      <Skeleton style={{ width: "90%" }} />
      <Grid>
        <GridCell colsSm={8} />
        <GridCell colsSm={4}>
          <Skeleton skeletonType="rect" rectWidth="100%" rectHeight=".5rem" />
        </GridCell>
      </Grid>
    </Card>
  );
};

export const SkeletonForm = () => {
  return (
    <Card>
      <Skeleton style={{ width: "65%" }} />
      <Skeleton skeletonType="rect" rectWidth="100%" rectHeight="3.75rem" />
      <Grid>
        <GridCell colsSm={9} />
        <GridCell colsSm={3}>
          <Skeleton
            skeletonType="rect"
            rectWidth="100%"
            rectHeight="2rem"
            style={{ borderRadius: "9999rem" }}
          />
        </GridCell>
      </Grid>
      <Grid style={{ marginTop: "1.5rem" }}>
        <GridCell colsSm={1} />
        <GridCell colsSm={1}>
          <Skeleton skeletonType="rect" rectWidth=".75rem" rectHeight=".75rem" />
          <Skeleton skeletonType="rect" rectWidth=".75rem" rectHeight=".75rem" />
          <Skeleton skeletonType="rect" rectWidth=".75rem" rectHeight=".75rem" />
          <Skeleton skeletonType="rect" rectWidth=".75rem" rectHeight=".75rem" />
        </GridCell>
        <GridCell colsSm={8}>
          <Skeleton />
          <Skeleton style={{ width: "80%" }} />
          <Skeleton style={{ width: "95%" }} />
          <Skeleton style={{ width: "85%" }} />
        </GridCell>
      </Grid>
    </Card>
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

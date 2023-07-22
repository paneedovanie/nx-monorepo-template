import { theme } from '@/core/constant';
import { Box, BoxProps } from '@mui/material';
import styled from 'styled-components';

const LayoutLoaderStyle = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SpanStyle = styled.span.attrs((props) => ({
  color: props.color,
}))<{ color?: string }>`
  @keyframes scale {
    0% {
      transform: scale(0);
    }
    25% {
      transform: scale(0.9, 0.9);
      background: lighten(${(props) => props.color}, 30%);
    }
    50% {
      transform: scale(1, 1);
      margin: 0 3px;
      background: ${(props) => props.color};
    }
    100% {
      transform: scale(0);
    }
  }
`;

export const LayoutLoader = ({
  color,
  ...props
}: BoxProps & { color?: string }) => {
  return (
    <LayoutLoaderStyle {...props}>
      {Array.from(Array(5)).map((_, i) => {
        return (
          <SpanStyle
            key={i}
            style={{
              display: 'inline-block',
              width: 15,
              height: 15,
              backgroundColor: color ?? theme.color.primary,
              borderRadius: '50%',
              animation: `scale 1s calc(${i} * 0.1s) infinite cubic-bezier(0.6, -0.28, 0.735, 0.045)`,
            }}
            color={color ?? theme.color.primary}
          ></SpanStyle>
        );
      })}
    </LayoutLoaderStyle>
  );
};

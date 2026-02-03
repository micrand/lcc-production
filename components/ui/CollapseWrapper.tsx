import styled from '@emotion/styled';

export const CollapseWrapper = styled.div<{ isOpen: boolean; contentHeight: number; }>`
  overflow: hidden;
  transition: height 0.4s ease;
  height: ${({ isOpen, contentHeight }) => (isOpen ? `${contentHeight}px` : '0px')};
`;

export const HorizontaleCollapseWrapper = styled.div<{ isOpen: boolean; contentWidth: number; }>`
  transition: width 0.4s ease, opacity 0.2s ease;
  width: ${({ isOpen, contentWidth }) => (isOpen ? `${contentWidth}px` : '0px')};
  opacity: ${({ isOpen }) => (isOpen ? '1': '0')};
`;
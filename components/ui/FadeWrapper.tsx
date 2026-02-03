import styled from '@emotion/styled';

export const FadeWrapper = styled.div<{isOpen: boolean;}>`
    transition: opacity 0.3s ease-in-out;
    opacity: ${({isOpen}) => (isOpen ? '1': '0')};
    pointer-events: ${({isOpen}) => (isOpen ? 'auto': 'none')};
`
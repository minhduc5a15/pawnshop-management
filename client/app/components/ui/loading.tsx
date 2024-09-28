'use client';

import React from 'react';
import styled, { keyframes } from 'styled-components';

interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: number;
    color?: string;
    fullScreen?: boolean;
    fullDimension?: boolean;
}

const spin = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

export const FullScreenOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    background-color: #1a1c2dd1;
    z-index: 9999;
`;

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
`;

const Spinner = styled.div<{ size: number; color?: string }>`
    border: ${({ size }) => size / 8}px solid ${({ color }) => color};
    border-top: ${({ size }) => size / 8}px solid transparent;
    border-radius: 50%;
    width: ${({ size }) => size}px;
    height: ${({ size }) => size}px;
    animation: ${spin} 1s normal infinite;
`;

export const Loading: React.FC<LoadingProps> = ({ size = 40, fullScreen = false, fullDimension = false, color = 'black', ...props }) => {
    if (fullScreen) {
        return (
            <FullScreenOverlay className={'justify-center items-center'} {...props}>
                <Spinner color={color} size={size} />
            </FullScreenOverlay>
        );
    }

    if (fullDimension) {
        return (
            <Container {...props}>
                <Spinner size={size} color={color} />
            </Container>
        );
    }

    return <Spinner size={size} />;
};


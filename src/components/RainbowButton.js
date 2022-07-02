import React from 'react';
import useRainbow from '../hooks/useRainbow';

export default function RainbowButton({
  intervalDelay = 1300,
  children,
  ...props
}) {

  const transitionDelay = intervalDelay * 1.25;

  const colors = useRainbow({ intervalDelay });

  const colorKeys = Object.keys(colors);

  return(
    <div className='btn' role="button" {...props} style={{
      ...colors,
      transition: `
        ${colorKeys[0]} ${transitionDelay}ms linear,
        ${colorKeys[1]} ${transitionDelay}ms linear,
        ${colorKeys[2]} ${transitionDelay}ms linear
      `,
      background: `
        radial-gradient(
          circle at top left,
          var(${colorKeys[2]}),
          var(${colorKeys[1]}),
          var(${colorKeys[0]})
        )
      `,
    }}>{children}</div>
  )
}
import React from 'react';
import { IconContainer, Link } from './style';

export enum IconType {
  OutboundLink = 'outbound-link',
  HelpCircleO = 'help-circle-o',
  ArrowUp = 'arrow-up',
  ArrowDown = 'arrow-down',
}

export interface IProps {
  type: IconType;
  url?: string;
  style?: React.CSSProperties;
  targetBlank?: boolean;

  onClick?: () => void;
}

interface IconProps {
  animate?: boolean;
}

export const Icon: React.FC<IProps> = (props) => {
  const _outboundLink: React.FC = () => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6'></path>
      <polyline points='15 3 21 3 21 9'></polyline>
      <line x1='10' y1='14' x2='21' y2='3'></line>
    </svg>
  );

  const _arrowUp: React.FC<IconProps> = () => (
    <svg
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
      x='0px'
      y='0px'
      viewBox='0 0 330 330'
      xmlSpace='preserve'
    >
      <path
        d='M325.606,229.393l-150.004-150C172.79,76.58,168.974,75,164.996,75c-3.979,0-7.794,1.581-10.607,4.394
	l-149.996,150c-5.858,5.858-5.858,15.355,0,21.213c5.857,5.857,15.355,5.858,21.213,0l139.39-139.393l139.397,139.393
	C307.322,253.536,311.161,255,315,255c3.839,0,7.678-1.464,10.607-4.394C331.464,244.748,331.464,235.251,325.606,229.393z'
      />
    </svg>
  );

  const _arrowDown: React.FC<IconProps> = () => (
    <svg version='1.1' xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' viewBox='0 0 330 330'>
      <path
        d='M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393
	   c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393
	   s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z'
      />
    </svg>
  );

  const _helpCircle: React.FC<IconProps> = () => (
    <svg viewBox='0 0 20 20'>
      <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
        <g transform='translate(-782.000000, -288.000000)'>
          <g transform='translate(100.000000, 100.000000)'>
            <g transform='translate(680.000000, 186.000000)'>
              <g>
                <polygon id='Path' points='0 0 24 0 24 24 0 24'></polygon>
                <path
                  className='fillable'
                  d='M11,18 L13,18 L13,16 L11,16 L11,18 Z M12,2 C6.48,2 2,6.48 2,12 C2,17.52 6.48,22 12,22 C17.52,22 22,17.52 22,12 C22,6.48 17.52,2 12,2 Z M12,20 C7.59,20 4,16.41 4,12 C4,7.59 7.59,4 12,4 C16.41,4 20,7.59 20,12 C20,16.41 16.41,20 12,20 Z M12,6 C9.79,6 8,7.79 8,10 L10,10 C10,8.9 10.9,8 12,8 C13.1,8 14,8.9 14,10 C14,12 11,11.75 11,15 L13,15 C13,12.75 16,12.5 16,10 C16,7.79 14.21,6 12,6 Z'
                ></path>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );

  const icons: Record<IconType, React.FC<IconProps>> = {
    'help-circle-o': _helpCircle,
    'outbound-link': _outboundLink,
    'arrow-up': _arrowUp,
    'arrow-down': _arrowDown,
  };

  const _getSpecProps = (): Record<string, unknown> => {
    let specProps = {};

    if (props.targetBlank) {
      specProps = { ...specProps, ...{ target: '_blank', rel: 'noreferrer' } };
    }

    return specProps;
  };

  const SelectedIcon = icons[props.type];

  if (props.url) {
    return (
      <Link href={props.url} title={props.url} {..._getSpecProps()}>
        <IconContainer style={props.style}>
          <SelectedIcon />
        </IconContainer>
      </Link>
    );
  }

  return (
    <IconContainer
      style={props.style}
      onClick={() => typeof props.onClick === 'function' && props.onClick()}
    >
      <SelectedIcon />
    </IconContainer>
  );
};

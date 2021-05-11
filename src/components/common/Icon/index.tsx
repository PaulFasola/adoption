import React, { ReactNode } from 'react';
import { ITheme } from '../../../providers/theme/ITheme';
import { IconContainer, Link } from './style';

export enum IconType {
  OutboundLink = 'outbound-link',
  HelpCircleO = 'help-circle-o',
  ArrowUp = 'arrow-up',
  ArrowDown = 'arrow-down',
  Settings = 'settings',
  Times = 'times',
}

export interface IProps {
  type: IconType;
  title?: string;
  url?: string;
  style?: React.CSSProperties;
  className?: string;
  targetBlank?: boolean;
  overrideTheme?: ITheme;
  disabled?: boolean;
  hidden?: boolean;

  onClick?: () => void;
}

export const Icon: React.FC<IProps> = (props) => {
  const _outboundLink: ReactNode = (
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

  const _arrowUp: ReactNode = (
    <svg
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
      x='0px'
      y='0px'
      viewBox='0 0 330 330'
      xmlSpace='preserve'
    >
      <path
        className='fillable'
        d='M325.606,229.393l-150.004-150C172.79,76.58,168.974,75,164.996,75c-3.979,0-7.794,1.581-10.607,4.394
	l-149.996,150c-5.858,5.858-5.858,15.355,0,21.213c5.857,5.857,15.355,5.858,21.213,0l139.39-139.393l139.397,139.393
	C307.322,253.536,311.161,255,315,255c3.839,0,7.678-1.464,10.607-4.394C331.464,244.748,331.464,235.251,325.606,229.393z'
      />
    </svg>
  );

  const _arrowDown: ReactNode = (
    <svg version='1.1' xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' viewBox='0 0 330 330'>
      <path
        className='fillable'
        d='M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393
	   c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393
	   s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z'
      />
    </svg>
  );

  const _helpCircle: ReactNode = (
    <svg viewBox='0 0 20 20'>
      <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
        <g transform='translate(-782.000000, -288.000000)'>
          <g transform='translate(100.000000, 100.000000)'>
            <g transform='translate(680.000000, 186.000000)'>
              <g>
                <polygon points='0 0 24 0 24 24 0 24'></polygon>
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

  const _settings: ReactNode = (
    <svg viewBox='0 0 128 128' xmlns='http://www.w3.org/2000/svg'>
      <path d='M61.894,66.056H16.185c-1.104,0-2-0.896-2-2s0.896-2,2-2h45.709c1.104,0,2,0.896,2,2S62.998,66.056,61.894,66.056z' />
      <path d='M111.907,66.056H87.655c-1.104,0-2-0.896-2-2s0.896-2,2-2h24.252c1.104,0,2,0.896,2,2S113.012,66.056,111.907,66.056z' />
      <path d='M48.503,96.609H16.185c-1.104,0-2-0.896-2-2s0.896-2,2-2h32.318c1.104,0,2,0.896,2,2S49.607,96.609,48.503,96.609z' />
      <path d='M111.907,96.609H74.774c-1.104,0-2-0.896-2-2s0.896-2,2-2h37.133c1.104,0,2,0.896,2,2S113.012,96.609,111.907,96.609z' />
      <path d='M35.013,35.502H16.185c-1.104,0-2-0.896-2-2s0.896-2,2-2h18.828c1.104,0,2,0.896,2,2S36.117,35.502,35.013,35.502z' />
      <path d='M111.907,35.502H60.776c-1.104,0-2-0.896-2-2s0.896-2,2-2h51.131c1.104,0,2,0.896,2,2S113.012,35.502,111.907,35.502z' />
      <path d='M42.616,43.104c-5.295,0-9.604-4.309-9.604-9.604c0-5.295,4.309-9.603,9.604-9.603s9.604,4.308,9.604,9.603  C52.22,38.796,47.911,43.104,42.616,43.104z M42.616,27.897c-3.09,0-5.604,2.514-5.604,5.603c0,3.09,2.514,5.604,5.604,5.604  S48.22,36.59,48.22,33.5C48.22,30.411,45.706,27.897,42.616,27.897z' />
      <path d='M56.106,104.215c-5.295,0-9.604-4.309-9.604-9.605c0-5.295,4.309-9.604,9.604-9.604c5.297,0,9.605,4.309,9.605,9.604  C65.712,99.906,61.403,104.215,56.106,104.215z M56.106,89.006c-3.09,0-5.604,2.514-5.604,5.604c0,3.092,2.514,5.605,5.604,5.605  c3.091,0,5.605-2.514,5.605-5.605C61.712,91.52,59.197,89.006,56.106,89.006z' />
      <path d='M69.501,73.661c-5.298,0-9.607-4.31-9.607-9.605c0-5.295,4.31-9.604,9.607-9.604c5.294,0,9.602,4.308,9.602,9.604  C79.103,69.352,74.795,73.661,69.501,73.661z M69.501,58.452c-3.092,0-5.607,2.514-5.607,5.604c0,3.091,2.516,5.605,5.607,5.605  c3.089,0,5.602-2.515,5.602-5.605C75.103,60.966,72.59,58.452,69.501,58.452z' />
    </svg>
  );

  const _times: ReactNode = (
    <svg
      enableBackground='new 0 0 256 256'
      viewBox='0 0 256 256'
      xmlSpace='preserve'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M137.051,128l75.475-75.475c2.5-2.5,2.5-6.551,0-9.051s-6.551-2.5-9.051,0L128,118.949L52.525,43.475  c-2.5-2.5-6.551-2.5-9.051,0s-2.5,6.551,0,9.051L118.949,128l-75.475,75.475c-2.5,2.5-2.5,6.551,0,9.051  c1.25,1.25,2.888,1.875,4.525,1.875s3.275-0.625,4.525-1.875L128,137.051l75.475,75.475c1.25,1.25,2.888,1.875,4.525,1.875  s3.275-0.625,4.525-1.875c2.5-2.5,2.5-6.551,0-9.051L137.051,128z' />
    </svg>
  );

  const icons: Record<IconType, ReactNode> = {
    'help-circle-o': _helpCircle,
    'outbound-link': _outboundLink,
    'arrow-up': _arrowUp,
    'arrow-down': _arrowDown,
    settings: _settings,
    times: _times,
  };

  const _getSpecProps = (): Record<string, unknown> => {
    let specProps = {};

    if (props.targetBlank) {
      specProps = { ...specProps, ...{ target: '_blank', rel: 'noreferrer' } };
    }

    return specProps;
  };

  if (props.url || typeof props.onClick === 'function') {
    return (
      <Link
        onClick={props.onClick}
        href={props.url}
        title={props.url}
        {..._getSpecProps()}
        className={props.className}
      >
        <IconContainer {...props}>{icons[props.type]}</IconContainer>
      </Link>
    );
  }

  return <IconContainer {...props}>{icons[props.type]}</IconContainer>;
};

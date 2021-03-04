import { keyframes } from "styled-components";

export const stroke = keyframes`
	100% {
		stroke-dashoffset: 0;
	}
`;

export const scale = keyframes`
	0%, 100% {
		transform: none;
	}

	50% {
		transform: scale3d(1.1, 1.1, 1);
	}
`;

export const infiniteProgress = keyframes`
	0% { left: -200%; right: 100%; }
  	50% { left: 107%; right: -8%; }
  	100% { left: 107%; right: -8%; }
`;

export const finiteProgress = keyframes`
	0% {width: 0%; left: 0; right: 0 }
	50% { width: 100%; left: 0; right: 0 }
	100% { width: 100%; left: 0; right: 0 }
`;

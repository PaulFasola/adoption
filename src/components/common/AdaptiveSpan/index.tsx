import React from 'react';
import { sanitize } from 'dompurify';

type TextStyle = 'bold' | 'italic';

interface IMapping {
	tag: string;
	value: string | number;
	style?: TextStyle;
}

interface IProps {
	style?: TextStyle;
	text: string;
	mapping?: IMapping[]
}

export const AdaptiveSpan: React.FC<IProps> = ({ text, mapping, style }) => {
	const _toTag = (value: string | number, style: TextStyle) => style === 'bold' ? `<b>${value}</b>` : `<i>${value}</i>`;

	if (style) {
		text = _toTag(text, style);
	}

	mapping?.forEach((map) => {
		if (map.style) {
			map.value = _toTag(map.value, map.style);
		}

		text = text.replace(new RegExp(map.tag, "g"), map.value.toString());
	});

	return (
		<span dangerouslySetInnerHTML={{ __html: sanitize(text) }} />
	);
};

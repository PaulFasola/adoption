import React from 'react';
import dompurify from 'dompurify';

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

	let html = text;
	if (style) {
		html = _toTag(html, style);
	}

	mapping?.forEach((map) => {
		/*
			let's not be that restrictive regarding null/undefined values here.
			Impact will be poor UX wise but maybe high when it comes to test.
		*/
		map.value = map.value ?? '';

		text = text.replace(new RegExp(map.tag, "g"), map.value.toString());

		if (map.style) {
			map.value = _toTag(map.value, map.style);
		}

		html = html.replace(new RegExp(map.tag, "g"), map.value.toString());
	});

	return (
		<span title={text} dangerouslySetInnerHTML={{ __html: dompurify.sanitize(html) }} />
	);
};

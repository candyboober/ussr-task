'use strict';

var React = require('react');

var IssueItem = React.createClass({
	displayName: 'IssueItem',
	getDefaultProps: function getDefaultProps() {
		return {};
	},
	render: function render() {
		return React.createElement(
			'div',
			{ name: this.props.number, key: this.props.id, className: 'issue-item' },
			React.createElement(
				'label',
				{ className: 'issue-title', onClick: this.props.showIssue },
				this.props.title
			),
			React.createElement(
				'span',
				{ className: 'issue-info' },
				React.createElement(
					'small',
					null,
					'#',
					this.props.number,
					' опубликовано ',
					this.props.createdAt
				)
			),
			React.createElement('div', { className: 'issue-body' })
		);
	}
});

module.exports = IssueItem;
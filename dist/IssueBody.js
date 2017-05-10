'use strict';

var React = require('react');

var IssueBody = React.createClass({
	displayName: 'IssueBody',
	destroy: function destroy(e) {
		e.target.parentElement.remove();
	},
	render: function render() {
		return React.createElement(
			'div',
			null,
			React.createElement(
				'div',
				null,
				this.props.text
			),
			React.createElement(
				'button',
				{ className: 'body-issue-destroy', onClick: this.destroy },
				'Закрыть'
			)
		);
	}
});

module.exports = IssueBody;
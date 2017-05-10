'use strict';

var React = require('react');
var IssueItem = require('./IssueItem');

var IssuesCollection = React.createClass({
	displayName: 'IssuesCollection',
	render: function render() {
		var _this = this;

		var items = [];
		var el;
		if (this.props.items === 'Not Found') {
			el = React.createElement(
				'div',
				{ className: 'not-found-msg' },
				'Ничего не найдено'
			);
		} else {
			this.props.items.forEach(function (item) {
				var moment = require('momentjs');
				var date = item.created_at;
				var createdAt = moment(date).format('D.MM.YYYY');
				items.push(React.createElement(IssueItem, {
					showIssue: _this.props.showIssue,
					key: item.id,
					title: item.title,
					number: item.number,
					createdAt: createdAt
				}));
			});
			el = React.createElement(
				'div',
				null,
				items
			);
		}
		return el;
	}
});

module.exports = IssuesCollection;
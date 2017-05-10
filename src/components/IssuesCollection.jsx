'use strict';

var React = require('react');
var IssueItem = require('./IssueItem');

var IssuesCollection = React.createClass({
	render(){
		var items = [];
		var el;
		if (this.props.items === 'Not Found') {
			el = (<div className="not-found-msg">Ничего не найдено</div> );
		} else {
			this.props.items.forEach(item => {
				var moment = require('momentjs');
				var date = item.created_at;
				var createdAt = moment(date).format('D.MM.YYYY');
				items.push(
					<IssueItem
						showIssue={this.props.showIssue}
						key={item.id}
						title={item.title}
						number={item.number}
						createdAt={createdAt}
					/>
				);
			});
			el = (<div>{items}</div>);
		}
		return el;
	}
});

module.exports = IssuesCollection;
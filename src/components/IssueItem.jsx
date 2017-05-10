'use strict';

var React = require('react');

var IssueItem = React.createClass({
	getDefaultProps(){
		return {};
	},
	render(){
		return (
	 		<div name={this.props.number} key={this.props.id} className="issue-item">
	 			<label className="issue-title" onClick={this.props.showIssue}>{this.props.title}</label>
	 			<span className="issue-info"><small>#{this.props.number} опубликовано {this.props.createdAt}</small></span>
	 			<div className="issue-body"></div>
	 		</div>
		);
	}
});

module.exports = IssueItem;
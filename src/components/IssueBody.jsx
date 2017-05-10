'use strict';

var React = require('react');

var IssueBody = React.createClass({
	destroy(e){
		e.target.parentElement.remove();
	},
	render(){
		return (
			<div>
				<div>{this.props.text}</div>
				<button className="body-issue-destroy" onClick={this.destroy}>Закрыть</button>
			</div>
		)
	}
});

module.exports = IssueBody;
'use strict';

var React = require('react');

var Profile = React.createClass({
	render(){
		return (
			<div className={this.props.hideProf + " github-profile"}>
				<span>{this.props.name}</span>
				<img className="github-profile-img" src={this.props.img} />
				<span className={this.props.className}>
					Профиль на GitHub: {this.props.url}
				</span>
			</div>
		)
	}
});

module.exports = Profile;
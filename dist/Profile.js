'use strict';

var React = require('react');

var Profile = React.createClass({
	displayName: 'Profile',
	render: function render() {
		return React.createElement(
			'div',
			{ className: this.props.hideProf + " github-profile" },
			React.createElement(
				'span',
				null,
				this.props.name
			),
			React.createElement('img', { className: 'github-profile-img', src: this.props.img }),
			React.createElement(
				'span',
				{ className: this.props.className },
				'Профиль на GitHub: ',
				this.props.url
			)
		);
	}
});

module.exports = Profile;
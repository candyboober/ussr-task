'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DEV = true;
// I have to get a var from ENV

var React = require('react');
var ReactDOM = require('react-dom');

var Profile = require('./Profile');

// для малого приложения не стал делать динамическую загрузку компонента
// с помощью require.ensure из webpack.
var IssuesCollection = require('./IssuesCollection');
var IssueBody = require('./IssueBody');

var ButtonLogin = React.createClass({
	displayName: 'ButtonLogin',
	getInitialState: function getInitialState() {
		return {
			name: '',
			repo: '',
			profName: '',
			profImg: '',
			profUrl: '',
			hideProf: 'profile-hide'
		};
	},
	setSearchAttr: function setSearchAttr(e) {
		// dynamic key for object and set attribute in state
		// I have setted and "name" attribute in this html tags
		this.setState(_defineProperty({}, e.target.name, e.target.value));
	},
	fetchData: function fetchData() {
		var mainUrl = 'https://api.github.com';
		// important don't finish url with '/' symbol
		this.fetchIssues(mainUrl);
		this.fetchProfile(mainUrl);
	},
	fetchIssues: function fetchIssues(mainUrl) {
		var _this = this;

		var url = mainUrl + '/repos/' + this.state.name + '/' + this.state.repo + '/issues';
		fetch(url).then(function (response) {
			return response.json();
		}).then(function (issues) {
			if (issues.message === 'Not Found') _this.renderIssues(issues.message);else _this.renderIssues(issues);
		});
	},
	fetchProfile: function fetchProfile(mainUrl) {
		var _this2 = this;

		var url = mainUrl + '/users/' + this.state.name;
		fetch(url).then(function (response) {
			return response.json();
		}).then(function (data) {
			if (data.message === 'Not Found') {
				_this2.setState({
					profName: '',
					profImg: '',
					profUrl: '',
					hideProf: 'profile-hide'
				});
			} else {
				_this2.setState({
					profName: data.name,
					profImg: data.avatar_url,
					profUrl: data.html_url,
					hideProf: 'pforile-show'
				});
			}
		});
	},
	showIssue: function showIssue(e) {
		var _this3 = this;

		var number = e.target.parentElement.getAttribute('name');
		var url = 'https://api.github.com/repos/' + this.state.name + '/' + this.state.repo + '/issues/' + number;
		fetch(url).then(function (response) {
			return response.json();
		}).then(function (data) {
			var el = _this3.getIssueBodyEl(data.number);
			_this3.renderIssueBody(data.body, el);
		});
	},
	getIssueBodyEl: function getIssueBodyEl(number) {
		var queryString = '.issue-item[name="' + number + '"] .issue-body';
		return document.querySelector(queryString);
	},
	renderIssueBody: function renderIssueBody(body, el) {
		ReactDOM.render(React.createElement(IssueBody, { text: body }), el);
	},
	renderIssues: function renderIssues(issues) {
		ReactDOM.render(React.createElement(IssuesCollection, { showIssue: this.showIssue, items: issues }), document.getElementById('issues-container'));
	},
	render: function render() {
		return React.createElement(
			'div',
			{ className: 'search-issue' },
			React.createElement('input', { name: 'name', className: 'search-name-value', onChange: this.setSearchAttr, placeholder: 'Имя пользователя' }),
			React.createElement('input', { name: 'repo', className: 'search-repo-value', onChange: this.setSearchAttr, placeholder: 'Имя репозитория' }),
			React.createElement(
				'button',
				{ className: 'search-btn', onClick: this.fetchData },
				'Поиск'
			),
			React.createElement(Profile, {
				name: this.state.profName,
				img: this.state.profImg,
				url: this.state.profUrl,
				hideProf: this.state.hideProf
			})
		);
	}
});

module.exports = ButtonLogin;
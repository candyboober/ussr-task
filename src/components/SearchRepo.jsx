'use strict';

const DEV = true;
// I have to get a var from ENV

var React = require('react');
var ReactDOM = require('react-dom');

var Profile = require('./Profile');

// для малого приложения не стал делать динамическую загрузку компонента
// с помощью require.ensure из webpack.
var IssuesCollection = require('./IssuesCollection');
var IssueBody = require('./IssueBody');

var ButtonLogin = React.createClass({
	getInitialState(){
		return {
			name: '',
			repo: '',
			profName: '',
			profImg: '',
			profUrl: '',
			hideProf: 'profile-hide'
		};
	},
	setSearchAttr(e){
		// dynamic key for object and set attribute in state
		// I have setted and "name" attribute in this html tags
		this.setState({[e.target.name]: e.target.value});
	},
	fetchData(){
		var mainUrl = 'https://api.github.com';
		// important don't finish url with '/' symbol
		this.fetchIssues(mainUrl);
		this.fetchProfile(mainUrl);
	},
	fetchIssues(mainUrl){
		var url = `${mainUrl}/repos/${this.state.name}/${this.state.repo}/issues`
		fetch(url)
			.then(response => {
				return response.json();
			})
			.then(issues => {
				if (issues.message === 'Not Found')
					this.renderIssues(issues.message);
				else 
					this.renderIssues(issues);
			});
	},
	fetchProfile(mainUrl){
		var url = `${mainUrl}/users/${this.state.name}`;
		fetch(url)
			.then(response => {
				return response.json();
			})
			.then(data => {
				if (data.message === 'Not Found') {
					this.setState({
						profName: '',
						profImg: '',
						profUrl: '',
						hideProf: 'profile-hide'
					});
				} else {
					this.setState({
						profName: data.name,
						profImg: data.avatar_url,
						profUrl: data.html_url,
						hideProf: 'pforile-show'
					});
				}
			});
	},
	showIssue(e){
		var number = e.target.parentElement.getAttribute('name');
		var url = `https://api.github.com/repos/${this.state.name}/${this.state.repo}/issues/${number}`;
		fetch(url)
			.then(response => {
				return response.json()
			})
			.then(data => {
				var el = this.getIssueBodyEl(data.number);
				this.renderIssueBody(data.body, el);
			});
	},
	getIssueBodyEl(number){
		var queryString = `.issue-item[name="${number}"] .issue-body`;
		return document.querySelector(queryString);
	},
	renderIssueBody(body, el){
		ReactDOM.render(
			<IssueBody text={body} />,
			el
		);
	},
	renderIssues(issues){
		ReactDOM.render(
			<IssuesCollection showIssue={this.showIssue} items={issues} />,
			document.getElementById('issues-container')
		);
	},
	render(){
		return (
			<div className="search-issue">
				<input name="name" className="search-name-value" onChange={this.setSearchAttr} placeholder="Имя пользователя"/>
				<input name="repo" className="search-repo-value" onChange={this.setSearchAttr} placeholder="Имя репозитория" />
				<button className="search-btn" onClick={this.fetchData}>Поиск</button>
				<Profile 
					name={this.state.profName}
					img={this.state.profImg}
					url={this.state.profUrl}
					hideProf={this.state.hideProf}
				/>
			</div>
		);
	}
});

module.exports = ButtonLogin;
import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { UserStory } from '../../components';
import { fetchAllUsers } from '../../actions';

class Home extends React.Component {
	fetchData = () => {
		this.props.dispatch(fetchAllUsers({ account_type: 'family' }));
	}

	componentDidMount() {
		this.fetchData();
	}

	render() {
		let userList = Object.values(this.props.home.users).map((user) => {
			return (
				<li key={user.id} className="list-group-item">
					<NavLink to={'/user/' + user.id} activeClassName="active">
						<UserStory user={user}>{ user.first_name + '\'s Family' }</UserStory>
					</NavLink>
				</li>
			);
		});

		return (
			<div className="home row mx-auto mt-3">
				<header>
					<h1 className="header-title animated slideInUp">Operation Santa</h1>
					<ul className="list-group">
						{ userList }
					</ul>
				</header>
			</div>
		);
	}
}

function mapStateToProps({ home }) {
  return { 
  	home,
  };
};

export default connect(mapStateToProps)(Home);
import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import './App.css';
import { getPercentage, capitalizeThis } from './Util';
import squareImg from './square.png';

class Dashboard extends React.Component {

	render() {
		const { userData, constData } = this.props;
		if (!userData) {
			return null;
		}
		return (
			<div className="dashboard">
				<h2>Dashboard</h2>
				<div className='active-container'>
					<Row>
						<Col xs={4} className='col1 active-header'>Active Task</Col>
						<Col xs={8} className='col2 active-name'>{userData.activeTask.name}</Col>
					</Row>
					<Row>
						<Col xs={2} className='col1'><Image src={squareImg} className='active-img' /></Col>
						<Col xs={2} className='col1'><a href={userData.activeTask.wikiLink} target='_blank'><span>View Wiki</span></a></Col>
						<Col xs={8} className='col2 active-desc'>{userData.activeTask.desc}</Col>
					</Row>
				</div>
				<div className='activeTier-container'>
					<div className='activeTier-header'>Active Tier</div>
					<div className='activeTier-name'>{capitalizeThis(userData.activeTier)}</div>
					<div className='activeTier-progress'>{capitalizeThis(userData.activeTier)} Tier Progress</div>
					<div className='activeTier-progressAmount'>{getPercentage(userData[userData.activeTier + 'Done']/constData[userData.activeTier + 'Total'])}</div>
				</div>
			</div>
		);
	}
}

export default Dashboard;

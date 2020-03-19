import React from 'react';
import './App.css';
import { capitalizeThis, getPercentage } from './Util';

class App extends React.Component {
	render() {
        const { userData, constData } = this.props;
        if (!userData) {
            return null;
        }
		return (
			<div className="progression-info">
                <div className='username'>{userData.username}</div>
                <div className='activeTier'>{capitalizeThis(userData.activeTier)} Tier</div>
                <div className='activeProgress'>{getPercentage(userData[userData.activeTier + 'Done'] / constData[userData.activeTier + 'Total'])} Done</div>
                <div className={'passiveProgress' + (userData['passiveDone'] >= constData[userData.activeTier + 'PassiveReq'] ? ' complete' : '')}>{userData['passiveDone']} / {constData[userData.activeTier + 'PassiveReq']} Passives</div>
                <hr />
                <div className='totalProgress'>{getPercentage(userData.totalDone / constData.totalTotal)} Done Total</div>
			</div>
		);
	}
}

export default App;

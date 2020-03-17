import React from 'react';
import './App.css';
import { Tabs, Tab } from 'react-bootstrap';
import Dashboard from './Dashboard';
import TaskList from './TaskList';

class App extends React.Component {

	render() {
		return (
			<div className="App">
				<Tabs defaultActiveKey="tasks">
					<Tab eventKey="dashboard" title="Dashboard">
						<Dashboard />
					</Tab>
					<Tab eventKey="tasks" title="Tasks">
						<TaskList />
					</Tab>
				</Tabs>
			</div>
		);
	}
}

export default App;

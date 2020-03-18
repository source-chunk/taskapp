import React from 'react';
import './App.css';
import { Tab, Row, Col, Nav } from 'react-bootstrap';
import Dashboard from './Dashboard';
import TaskList from './TaskList';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			userData: null,
		}
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/todos/1')
			.then(res => res.json())
			.then((data) => {
				this.setState({
					userData: {
						activeTask: {
							id: 17,
							name: 'Obtain a unique from Ghosts',
							desc: 'All types of Ghosts and ghost-like creatures drop the uniques. These include the Ghost hunter equipment, the Deployable herb burner, the Ectoplasmator and the Cremation ability.',
							isDone: false,
							tier: 'medium',
						},
						activeTier: 'medium',
						easyDone: 80,
						mediumDone: 34,
						hardDone: 0,
					},
					constData: {
						easyTotal: 80,
						mediumTotal: 105,
						hardTotal: 156,
					}
				});
			})
		.catch(console.log);
	}

	render() {
		return (
			<div className="App">
				<Tab.Container id="left-tabs-example" defaultActiveKey="tasks">
					<Row>
						<Col sm={2} xs={2}>
							<Nav variant="pills" className="flex-column">
								<Nav.Item>
									<Nav.Link eventKey="dashboard">Dashboard</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link eventKey="tasks">Tasks</Nav.Link>
								</Nav.Item>
							</Nav>
						</Col>
						<Col sm={8} xs={8}>
							<Tab.Content>
								<Tab.Pane eventKey="dashboard">
									<Dashboard />
								</Tab.Pane>
								<Tab.Pane eventKey="tasks">
									<TaskList />
								</Tab.Pane>
							</Tab.Content>
						</Col>
						<Col sm={2} xs={2}>
							<div>Testing</div>
						</Col>
					</Row>
				</Tab.Container>
			</div>
		);
	}
}

export default App;

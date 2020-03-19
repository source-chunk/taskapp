import React from 'react';
import './App.css';
import { Row, Col, Card, Button } from 'react-bootstrap';
import ProgressionInfo from './ProgressionInfo';
import TaskList from './TaskList';
import TaskModal from './TaskModal';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			userData: null,
			activeTab: 'tasks',
			modalOpen: false,
		}
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/todos/1')
			.then(res => res.json())
			.then((data) => {
				this.setState({
					userData: {
						activeTask: {
                            id: 14,
                            name: 'Register a total of 23 unique items in the easy tier of your Treasure Trail collection log',
                            desc: 'Easy clue scrolls can be obtained from several sources. Pickpocketing H.A.M members, killing Goblins are some of the most common. Refer to your Treasure Trail collection log to see your total.',
                            isDone: true,
							tier: 'hard',
							wikiLink: 'https://www.google.com',
							img: 'https://runescape.wiki/images/thumb/8/88/Black_platebody_%28h1%29_detail.png/150px-Black_platebody_%28h1%29_detail.png?8ff3b',
                        },
						activeTier: 'medium',
						easyDone: 80,
						mediumDone: 34,
						hardDone: 0,
						passiveDone: 6,
						totalDone: 120,
						username: 'Source Task',
					},
					constData: {
						easyTotal: 80,
						mediumTotal: 105,
						hardTotal: 156,
						passiveTotal: 200,
						totalTotal: 541,
						easyPassiveReq: 5,
						mediumPassiveReq: 15,
						hardPassiveReq: 30,
					}
				});
			})
		.catch(console.log);
	}

	render() {
		const { userData, constData, modalOpen } = this.state;
		return (
			<div className="App">
				<Row>
					<Col xs={2}>
						<ProgressionInfo userData={userData} constData={constData} />
					</Col>
					<Col xs={7}>
						<TaskList />
					</Col>
					{userData && <Col xs={3}>
						<Card>
							<Card.Title className='main'>Active Task</Card.Title>
							<Card.Img src={userData.activeTask.img} />
							<Card.Body>
								<Card.Title className='secondary'>{userData.activeTask.name}</Card.Title>
								<Card.Text>
									{userData.activeTask.desc}
								</Card.Text>
								<a href={userData.activeTask.wikiLink} target='_blank' rel="noopener noreferrer"><Button className='wiki-btn' variant="primary">Wiki</Button></a>
								<Button className='complete-btn' variant="success" onClick={() => this.setState({ modalOpen: true })}>Complete Task</Button>
							</Card.Body>
						</Card>
					</Col>}
				</Row>
				{modalOpen &&
                    <TaskModal taskOpen={userData.activeTask} handleClose={() => this.setState({ modalOpen: false })} handleComplete={() => console.log('complete')} />
                }
			</div>
		);
	}
}

export default App;

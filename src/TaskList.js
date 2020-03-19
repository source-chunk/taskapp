import React from 'react';
import Select from 'react-select';
import { Dropdown, Row } from 'react-bootstrap';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { capitalizeThis } from './Util';
import TaskModal from './TaskModal';

const TIER_NAMES = {
	'all': 'All Tiers',
	'easy': 'Easy Tier',
	'medium': 'Medium Tier',
	'hard': 'Hard Tier'
}

const TIER_OPTIONS = [
    { value: 'all', label: 'All Tiers' },
    { value: 'easy', label: 'Easy Tier' },
    { value: 'medium', label: 'Medium Tier' },
    { value: 'hard', label: 'Hard Tier' },
  ];

class TaskList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			data: null,
			filterText: '',
            activeTier: 'all',
            showDone: true,
            modalOpen: false,
            taskOpen: null,
        }
        this.filterInput = null;
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/todos/1')
			.then(res => res.json())
			.then((data) => {
				this.setState({
					data: [
                        {
                            id: 1,
                            name: 'Complete the Beginner Lumbridge achievement diary',
                            desc: 'Speak to Jack the Explorer in Lumbridge upon completion.',
                            isDone: true,
                            tier: 'easy',
                            uniques: null,
                            uniquesNum: 0,
                        },
                        {
                            id: 5,
                            name: 'Find the Totem of Navigation top by searching rubble on Anachronia',
                            desc: 'The totem top is found by searching some rubble to the east of Laniakea\'s location on the south-east peninsula of Anachronia.',
                            isDone: false,
                            tier: 'easy',
                            uniques: null,
                            uniquesNum: 0,
                        },
                        {
                            id: 17,
                            name: 'Obtain a unique from Ghosts',
                            desc: 'All types of Ghosts and ghost-like creatures drop the uniques. These include the Ghost hunter equipment, the Deployable herb burner, the Ectoplasmator and the Cremation ability.',
                            isDone: false,
                            tier: 'medium',
                            uniques: ['Ghost Hunter top', 'Ghost Hunter legs', 'Ectoplasmator', 'Cremation'],
                            uniquesNum: 1,
                        },
                        {
                            id: 400,
                            name: 'Surge under the dinosaur spine suspended between cliffs on Anachronia',
                            desc: 'The Spine can be found west of the Herby Werby Dnd. A Magic level of 30 is required to use the surge ability.',
                            isDone: true,
                            tier: 'medium',
                            uniques: null,
                            uniquesNum: 0,
                        },
                        {
                            id: 91,
                            name: 'Obtain a unique from the Barrows Brothers',
                            desc: 'Magic is super effective against 4/6 brothers. Bolt Racks does not count toward uniques.',
                            isDone: false,
                            tier: 'hard',
                            uniques: ['Verac\'s flail', 'Guthan\'s helm', 'Guthan\'s spear', 'Torag\'s body', 'Torag\'s legs', 'Torag\'s hammer', 'Ahrim\'s wand'],
                            uniquesNum: 2,
                        },
                        {
                            id: 14,
                            name: 'Register a total of 23 unique items in the easy tier of your Treasure Trail collection log',
                            desc: 'Easy clue scrolls can be obtained from several sources. Pickpocketing H.A.M members, killing Goblins are some of the most common. Refer to your Treasure Trail collection log to see your total.',
                            isDone: true,
                            tier: 'hard',
                            uniques: null,
                            uniquesNum: 0,
                        },
                    ]
				});
			})
		.catch(console.log);
	}

	handleSearch = (e) => {
		this.setState({
			filterText: e.target.value,
		});
	}

	toggleTier = (type) => {
        console.log(type);
		this.setState({
            activeTier: type,
		});
    }
    
    toggleShowDone = () => {
        this.setState({
            showDone: !this.state.showDone,
        });
    }

    openTask = (task) => {
        this.setState({
            modalOpen: true,
            taskOpen: task,
        });
    }

    handleFilterText = (e) => {
        this.setState({
            filterTextDropdown: e.target.value,
        });
    }

	render() {
		let { data, filterText, activeTier, showDone, modalOpen, taskOpen } = this.state;

		let splitData = {};

		splitData.easy = data && (activeTier === 'all' || activeTier === 'easy') ? data.filter((task) => task.tier === 'easy' && (!task.isDone || showDone) && task.name.toLowerCase().includes(filterText.toLowerCase())) : [];
		splitData.medium = data && (activeTier === 'all' || activeTier === 'medium') ? data.filter((task) => task.tier === 'medium' && (!task.isDone || showDone) && task.name.toLowerCase().includes(filterText.toLowerCase())) : [];
		splitData.hard = data && (activeTier === 'all' || activeTier === 'hard') ? data.filter((task) => task.tier === 'hard' && (!task.isDone || showDone) && task.name.toLowerCase().includes(filterText.toLowerCase())) : [];

		return (
			<div className="tasklist">
                <Row className='top'>
                    <div className='top-bar'>
                        <input className='taskSearch' placeholder='Search' type='text' onChange={this.handleSearch} />
                        <Dropdown className='tier-dropdown' size="sm" focusFirstItemOnShow>
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic" className={'tier-button ' + activeTier}>
                                {TIER_NAMES[activeTier]}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {Object.keys(TIER_NAMES).map(tierName => {
                                    return <Dropdown.Item key={tierName + ' option'} className={'tier ' + tierName + (tierName === activeTier ? ' active' : '')} onClick={() => this.toggleTier(tierName)}>{TIER_NAMES[tierName]}</Dropdown.Item>
                                })}
                            </Dropdown.Menu>
                        </Dropdown>
                        <div className='showComplete-container'>
                            <span className={'label' + (showDone ? ' on' : ' off')} onClick={this.toggleShowDone}>Show Complete</span>
                        </div>
                    </div>
                </Row>
                <Select
                    value={TIER_NAMES[activeTier]}
                    onChange={this.toggleTier}
                    options={TIER_OPTIONS}
                />
				{(splitData.easy && splitData.easy.length === 0) && (splitData.medium && splitData.medium.length === 0) && (splitData.hard && splitData.hard.length === 0) &&
					<div>No tasks here!</div>
				}
                <div className='tasks'>
                    {Object.keys(TIER_NAMES).filter(name => name !== 'all').map(tierName => {
                        if (splitData[tierName] && splitData[tierName].length > 0) {
                            return <div key={tierName}>
                                <div className='tier-header'><b>{capitalizeThis(tierName)}</b></div>
                                {splitData[tierName].sort((taskA, taskB) => taskA.isDone - taskB.isDone).map(task => {
                                    return <div className={'taskrow' + (task.isDone ? ' done' : '')} key={task.id}>
                                        <span className='taskid'>
                                            <span onClick={() => this.openTask(task)}>{tierName.slice(0, 2).toUpperCase()}{task.id}</span>
                                        </span>
                                        <span className='taskname'>{task.name}</span>
                                        <FontAwesomeIcon size='lg' className='info' icon={faInfoCircle} onClick={() => this.openTask(task)} />
                                    </div>
                                })}
                            </div>
                        } else {
                            return null;
                        }
                    })}
                </div>
                {modalOpen &&
                    <TaskModal taskOpen={taskOpen} handleClose={() => this.setState({ modalOpen: false })} handleComplete={() => console.log('complete')} />
                }
			</div>
		);
	}
}

export default TaskList;

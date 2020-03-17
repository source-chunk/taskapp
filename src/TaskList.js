import React from 'react';
import { Dropdown } from 'react-bootstrap';
import './App.css';

const TIER_NAMES = {
	'all': 'All Tiers',
	'easy': 'Easy Tier',
	'medium': 'Medium Tier',
	'hard': 'Hard Tier'
}

class TaskList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			data: null,
			filterText: '',
            activeTier: 'all',
            showDone: true,
		}
	}

	componentWillMount() {
		fetch('https://jsonplaceholder.typicode.com/todos')
			.then(res => res.json())
			.then((data) => {
				console.log(data[1]);
				this.setState({
					data: [
                        {
                            id: 1,
                            name: 'Complete the Beginner Lumbridge achievement diary',
                            desc: 'Speak to Jack the Explorer in Lumbridge upon completion.',
                            isDone: true,
                            tier: 'easy',
                        },
                        {
                            id: 5,
                            name: 'Find the Totem of Navigation top by searching rubble on Anachronia',
                            desc: 'The totem top is found by searching some rubble to the east of Laniakea\'s location on the south-east peninsula of Anachronia.',
                            isDone: false,
                            tier: 'easy',
                        },
                        {
                            id: 17,
                            name: 'Obtain a unique from Ghosts',
                            desc: 'All types of Ghosts and ghost-like creatures drop the uniques. These include the Ghost hunter equipment, the Deployable herb burner, the Ectoplasmator and the Cremation ability.',
                            isDone: false,
                            tier: 'medium',
                        },
                        {
                            id: 400,
                            name: 'Surge under the dinosaur spine suspended between cliffs on Anachronia',
                            desc: 'The Spine can be found west of the Herby Werby Dnd. A Magic level of 30 is required to use the surge ability.',
                            isDone: true,
                            tier: 'medium',
                        },
                        {
                            id: 91,
                            name: 'Obtain a unique from the Barrows Brothers',
                            desc: 'Magic is super effective against 4/6 brothers. Bolt Racks does not count toward uniques.',
                            isDone: false,
                            tier: 'hard',
                        },
                        {
                            id: 14,
                            name: 'Register a total of 23 unique items in the easy tier of your Treasure Trail collection log',
                            desc: 'Easy clue scrolls can be obtained from several sources. Pickpocketing H.A.M members, killing Goblins are some of the most common. Refer to your Treasure Trail collection log to see your total.',
                            isDone: true,
                            tier: 'hard',
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
		this.setState({
			activeTier: type,
		});
    }
    
    toggleShowDone = () => {
        this.setState({
            showDone: !this.state.showDone,
        });
    }

	render() {
		let { data, filterText, activeTier, showDone } = this.state;

		let splitData = {};

		splitData.easy = data && (activeTier === 'all' || activeTier === 'easy') ? data.filter((task) => task.tier === 'easy' && (!task.isDone || showDone) && task.name.toLowerCase().includes(filterText.toLowerCase())) : null;
		splitData.medium = data && (activeTier === 'all' || activeTier === 'medium') ? data.filter((task) => task.tier === 'medium' && (!task.isDone || showDone) && task.name.toLowerCase().includes(filterText.toLowerCase())) : null;
		splitData.hard = data && (activeTier === 'all' || activeTier === 'hard') ? data.filter((task) => task.tier === 'hard' && (!task.isDone || showDone) && task.name.toLowerCase().includes(filterText.toLowerCase())) : null;

		return (
			<div className="tasklist">
                <div className='top'>
                    <div className='top-bar'>
                        <input className='taskSearch' placeholder='Search' type='text' onChange={this.handleSearch} />
                        <Dropdown className='tier-dropdown' size="sm">
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic" className={'tier-button ' + activeTier}>
                                {TIER_NAMES[activeTier]}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {Object.keys(TIER_NAMES).map(tierName => {
                                    return <Dropdown.Item key={tierName + ' option'} className={'tier ' + tierName + (tierName === activeTier ? ' active' : '')} onClick={() => this.toggleTier(tierName)}>{TIER_NAMES[tierName]}</Dropdown.Item>
                                })}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <input className='showDoneCheck' type='checkbox' onChange={this.toggleShowDone} checked={showDone} />
                </div>
				{(splitData.easy && splitData.easy.length === 0) && (splitData.medium && splitData.medium.length === 0) && (splitData.hard && splitData.hard.length === 0) &&
					<div>No tasks here!</div>
				}
				{Object.keys(TIER_NAMES).filter(name => name !== 'all').map(tierName => {
                    if (splitData[tierName] && splitData[tierName].length > 0) {
                        return <div key={tierName}>
                            <div className='tier-header'><b>{tierName.charAt(0).toUpperCase() + tierName.slice(1)}</b></div>
                            {splitData[tierName].sort((taskA, taskB) => taskA.isDone - taskB.isDone).map(task => {
                                return <div className={'taskrow' + (task.isDone ? ' done' : '')} key={task.id}>
                                    <span className='taskid'>{tierName.slice(0, 2).toUpperCase()}{task.id}</span><span className='taskname'>{task.name}</span>
                                </div>
                            })}
                        </div>
                    } else {
                        return null;
                    }
				})}
			</div>
		);
	}
}

export default TaskList;
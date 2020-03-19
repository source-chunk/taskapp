import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import Select from 'react-select';
import './App.css';

class TaskModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            uniques: [],
            timerVal: 0,
            submitting: false,
        }
    }

    selectUnqiue = (unique, num) => {
        let uniquesTemp = this.state.uniques;
        uniquesTemp[num] = unique;

        this.setState({
            uniques: uniquesTemp,
        });
    }

    timerFunc = () => {
        if (this.state.timerVal >= 160) {
            this.setState({
                submitting: true,
            });
            clearInterval(this.timer);
            this.props.handleComplete();
        } else {
            this.setState({
                timerVal: this.state.timerVal + 1,
            });
        }
    }

    handleCompleteDown = () => {
        this.timer = setInterval(this.timerFunc, 10);
    }

    handleCompleteUp = () => {
        this.setState({
            timerVal: 0,
        });
        clearInterval(this.timer);
    }

	render() {
        const { taskOpen, handleClose } = this.props;
        const { uniques, submitting } = this.state;

        let options = [];
        taskOpen && taskOpen.uniques && taskOpen.uniques.forEach(unique => {
            options[options.length] = {value: unique, label: unique};
            if (uniques.findIndex((el) => el.value === options[options.length - 1].value) >= 0) {
                delete options[options.length - 1];
            }
        });

        let uniqueSelects = null;

        if (taskOpen.uniquesNum > 0) {
            uniqueSelects = [];
            for (let i = 0; i < taskOpen.uniquesNum; i++) {
                uniqueSelects[i] = <Select
                    key={'select' + i}
                    value={uniques[i]}
                    onChange={(unique) => this.selectUnqiue(unique, i)}
                    options={options}
                />;
            }
        }

		return (
			<Modal
                show
                size="md"
                centered
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Task {taskOpen.tier.slice(0, 2).toUpperCase()}{taskOpen.id}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>{taskOpen.name}</h4>
                    <p>
                        {taskOpen.desc}
                    </p>
                    {uniqueSelects &&
                        <span>
                            <div>Unique(s):</div>
                            {uniqueSelects.map(uniqueSelect => {
                                return uniqueSelect;
                            })}
                        </span>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <span className='progress-container'>
                        <span className={'progress-btn' + (submitting ? ' submitting' : '')} onMouseDown={this.handleCompleteDown} onMouseUp={this.handleCompleteUp} disabled={submitting || (taskOpen.uniquesNum > 0 && uniques.reduce(c => c + 1, 0) !== taskOpen.uniquesNum)}>{submitting ? 'Submitting...' : 'Hold to Complete'}</span>
                        <span style={{width: submitting ? '40%' : (this.state.timerVal / 4 + '%')}} className='progress'></span>
                    </span>
                    <Button onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
		);
	}
}

export default TaskModal;

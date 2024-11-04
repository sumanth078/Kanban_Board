// src/components/Card.js
import React from 'react';
import './Card.css';
import urgentIcon from '../assets/urgent.svg';
import highIcon from '../assets/priority_high.svg';
import mediumIcon from '../assets/priority_medium.svg';
import lowIcon from '../assets/priority_low.svg';
import noPriorityIcon from '../assets/no_priority.svg';

function Card({ ticket }) {
    const priorityIcon = getPriorityIcon(ticket.priority);

    return (
        <div className="card">
            <div className="card-header">
                <h3>{ticket.title}</h3>
                {priorityIcon && <img src={priorityIcon} alt="Priority" className="priority-icon" />}
            </div>
            <div className="card-body">
                <p>{ticket.tag.join(', ')}</p>
            </div>
        </div>
    );
}

function getPriorityIcon(priority) {
    switch (priority) {
        case 4:
            return urgentIcon;
        case 3:
            return highIcon;
        case 2:
            return mediumIcon;
        case 1:
            return lowIcon;
        default:
            return noPriorityIcon;
    }
}

export default Card;

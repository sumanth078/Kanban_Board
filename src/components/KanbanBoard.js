// src/components/KanbanBoard.js
import React, { useEffect, useState } from 'react';
import Card from './Card';
import addIcon from '../assets/add.svg';
import threeDotMenuIcon from '../assets/3_dot_menu.svg';
import user1Icon from '../assets/user1.jpg';
import user2Icon from '../assets/user2.jpg';
import user3Icon from '../assets/user3.jpg';
import user4Icon from '../assets/user4.jpeg';
import user5Icon from '../assets/user5.jpg';
import noPriorityIcon from '../assets/no_priority.svg';
import urgentIcon from '../assets/urgent.svg';
import highIcon from '../assets/high.svg';
import mediumIcon from '../assets/medium.svg';
import lowIcon from '../assets/low.svg';
import todoIcon from '../assets/todo.svg';
import inProgressIcon from '../assets/in_progress.svg';
import doneIcon from '../assets/done.svg';
import cancelledIcon from '../assets/cancelled.svg';
import backlogIcon from '../assets/backlog.svg';
import './KanbanBoard.css';

function KanbanBoard({ groupBy, sortBy }) {
    const [tickets, setTickets] = useState([]);
    const [groupedTickets, setGroupedTickets] = useState({});

    // Define user mapping for "Group by User"
    const userMapping = {
        "usr-1": { name: "Abhideep Maity", icon: user1Icon },
        "usr-2": { name: "Akanksha Punjabi", icon: user2Icon },
        "usr-3": { name: "Anoop Sharma", icon: user3Icon },
        "usr-4": { name: "Arbaaz Sayyed", icon: user4Icon },
        "usr-5": { name: "Harsh Navani", icon: user5Icon }
    };

    // Define priority mapping for "Group by Priority"
    const priorityMapping = {
        0: { name: "No-priority", icon: noPriorityIcon },
        4: { name: "Urgent", icon: urgentIcon },
        3: { name: "High", icon: highIcon },
        2: { name: "Medium", icon: mediumIcon },
        1: { name: "Low", icon: lowIcon }
    };
    const priorityOrder = [0, 4, 3, 2, 1]; // Order to display priority headings

    // Define status icons mapping for known statuses
    const statusIcons = {
        "Backlog": backlogIcon,
        "Todo": todoIcon,
        "In Progress": inProgressIcon,
        "InProgress": inProgressIcon,  // Include alternative if label is different
        "Done": doneIcon,
        "Cancelled": cancelledIcon
    };

    useEffect(() => {
        // Fetch tickets from the API
        fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
            .then((res) => res.json())
            .then((data) => {
                setTickets(data.tickets);

                // Log the entire fetched data for verification
                console.log("Fetched tickets:", data.tickets);

                // Get and log unique status values to verify exact labels
                const uniqueStatuses = [...new Set(data.tickets.map(ticket => ticket.status))];
                console.log("Unique status values:", uniqueStatuses);
            });
    }, []);

    useEffect(() => {
        const grouped = groupTickets(tickets, groupBy);
        const sortedGrouped = sortTickets(grouped, sortBy);
        setGroupedTickets(sortedGrouped);
    }, [tickets, groupBy, sortBy]);

    const groupTickets = (tickets, groupBy) => {
        const grouped = {};

        tickets.forEach(ticket => {
            let key;
            switch (groupBy) {
                case 'priority':
                    key = priorityMapping[ticket.priority]?.name || "No-priority";
                    break;
                case 'user':
                    key = userMapping[ticket.userId]?.name || ticket.userId;
                    break;
                case 'status':
                    key = ticket.status;
                    break;
                default:
                    key = ticket.status;
            }

            if (!grouped[key]) grouped[key] = [];
            grouped[key].push(ticket);
        });

        // Ensure all statuses are represented for "Group by Status" view
        if (groupBy === 'status') {
            tickets.forEach(ticket => {
                if (!grouped[ticket.status]) grouped[ticket.status] = [];
            });
        }

        return grouped;
    };

    const sortTickets = (groupedTickets, sortBy) => {
        const sortedGrouped = {};
        Object.keys(groupedTickets).forEach(group => {
            sortedGrouped[group] = groupedTickets[group].slice();
            sortedGrouped[group].sort((a, b) => {
                if (sortBy === 'priority') {
                    return b.priority - a.priority;
                } else if (sortBy === 'title') {
                    return a.title.localeCompare(b.title);
                }
                return 0;
            });
        });
        return sortedGrouped;
    };

    return (
        <div className="kanban-board">
            {groupBy === 'priority'
                ? priorityOrder.map(priority => {
                    const { name: heading, icon } = priorityMapping[priority];
                    const ticketsForPriority = groupedTickets[heading] || [];
                    
                    return (
                        <div className="kanban-column" key={heading}>
                            <div className="kanban-column-header">
                                <img src={icon} alt={heading} className="priority-icon" />
                                <h2>{heading}</h2>
                                <span>{ticketsForPriority.length}</span>
                                <img src={addIcon} alt="Add" className="icon" />
                                <img src={threeDotMenuIcon} alt="Menu" className="icon" />
                            </div>
                            <div className="kanban-cards">
                                {ticketsForPriority.map(ticket => (
                                    <Card key={ticket.id} ticket={ticket} />
                                ))}
                            </div>
                        </div>
                    );
                })
                : groupBy === 'status'
                ? Object.keys(groupedTickets).map(status => {
                    const icon = statusIcons[status];
                    console.log(`Rendering status: ${status}, icon found: ${!!icon}`); // Log if icon exists for each status
                    const ticketsForStatus = groupedTickets[status] || [];

                    return (
                        <div className="kanban-column" key={status}>
                            <div className="kanban-column-header">
                                {icon && <img src={icon} alt={status} className="status-icon" />}
                                <h2>{status}</h2>
                                <span>{ticketsForStatus.length}</span>
                                <img src={addIcon} alt="Add" className="icon" />
                                <img src={threeDotMenuIcon} alt="Menu" className="icon" />
                            </div>
                            <div className="kanban-cards">
                                {ticketsForStatus.map(ticket => (
                                    <Card key={ticket.id} ticket={ticket} />
                                ))}
                            </div>
                        </div>
                    );
                })
                : Object.keys(groupedTickets).map(group => {
                    const ticketsForUser = groupedTickets[group] || [];
                    const userIcon = userMapping[ticketsForUser[0]?.userId]?.icon;

                    return (
                        <div className="kanban-column" key={group}>
                            <div className="kanban-column-header">
                                {groupBy === 'user' && userIcon && (
                                    <img src={userIcon} alt="Profile" className="profile-icon" />
                                )}
                                <h2>{group}</h2>
                                <span>{ticketsForUser.length}</span>
                                <img src={addIcon} alt="Add" className="icon" />
                                <img src={threeDotMenuIcon} alt="Menu" className="icon" />
                            </div>
                            <div className="kanban-cards">
                                {ticketsForUser.map(ticket => (
                                    <Card key={ticket.id} ticket={ticket} />
                                ))}
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
}

export default KanbanBoard;

import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
    link: string;
    label: string;
}

const Filters = ({link, label}: Props) => (
    <div className="filters-container records-actions">
        <Link to={link}>
            <button className="action-filters">
                {label}
            </button>
        </Link>
    </div>
);

export default Filters;
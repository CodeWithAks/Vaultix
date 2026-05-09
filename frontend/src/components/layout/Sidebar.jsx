import {Link} from 'react-router-dom';

export default function Sidebar() {
    return (
        <div className="sidebar">
            <h2>Bank Dashboard</h2>
            <nav>   
                <ul>
                    <li><Link to="/">Dashboard</Link></li>
                    <li><Link to="/cards">Cards</Link></li>
                    <li><Link to="/transfers">Transfers</Link></li>
                    <li><Link to="/insights">Insights</Link></li>
                    <li><Link to="/login">Login</Link></li> 
                    <li><Link to="/register">Register</Link></li>
                </ul>
            </nav>
        </div>
    )
}
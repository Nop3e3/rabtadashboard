import './Dashboard.css';
import Activity from "./ActivityFeed";
import Engagement from "./EngagementGraph";
import Progress from "./ProgressGraph";
import { DistributionGraph as Distribution } from './DistributionGraph'
const Dashboard = () => {
  return (
    <div className="dashboard-wrapper">
      <div className='rowy'>
    <Distribution/>
    <Progress/></div> 
    <div className='rowy'>
    <Engagement/>
    <Activity/></div>
    </div>
  );
};

export default Dashboard;
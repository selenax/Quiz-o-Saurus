import React  from 'react';
import LeaderboardEntry from './LeaderboardEntry.jsx';


//should receive an array of 10 highest score user profiles 
//set time to render new score every 10 seconds 
const Leaderboard = ({data, handleClick}) => (
  <div className="leaderboard">

    {data.map((item) => 
      <LeaderboardEntry
        handleClick={handleClick}
        key={item._id}
        item={item} 
      />
    )}
  </div>
);

export default Leaderboard;


import React  from 'react';
import LeaderboardEntry from './LeaderboardEntry.jsx';


//should receive an array of 10 highest score user profiles 
//set time to render new score every 10 seconds 
const Leaderboard = ({data}) => (

  <div className="leaderboardlist">
  console.log(data)

    {data.map((user) => 
      <LeaderboardEntry
        handleClick={handleClick}
        key={user._id}
        user={user} 
      />
    )}
  </div>
);

export default Leaderboard;


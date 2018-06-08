import React from 'react';


//should display each user's username, score 
const LeaderboardEntry = ({user}) => {
  if (!user) {
  return <div class="spinner" img src=".../dist/images/loading.gif"></div>
  }
 return(
    <div>
      <li className="leaderboard-list-item">
        <div className="leaderboard-list-item-author">user.email</div>
        <span className="leaderboard-list-item-score"><p>user.globalScore</p></span>
      </li>
    </div>
 )
};

export default LeaderboardEntry;

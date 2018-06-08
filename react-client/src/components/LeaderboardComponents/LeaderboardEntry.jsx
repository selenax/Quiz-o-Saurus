import React from 'react';

//should display each user's username, score 
const LeaderboardEntry = ({}) => {
  return (
    <div>
      <li className="leaderboard-list-item">
        <div className="leaderboard-list-item-author">username</div>
        <span className="leaderboard-list-item-score"><p>user's score</p></span>
      </li>
    </div>
  );
};

export default LeaderboardEntry;

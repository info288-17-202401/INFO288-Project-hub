import React from 'react';
import Avatar from 'react-avatar';

type UserCardProps = {
  user_name: string;
  user_email: string;
  user_status: string;
};

const UserCard: React.FC<UserCardProps> = ({ user_name, user_email, user_status }) => {
  return (
    <div className="position-relative">
      <div className="card user-card">
        <div className="card-body d-flex align-items-center">
          <div className="user-card__circle me-3">
            <Avatar name={user_name} size='50'> </Avatar>
          </div>
          <div>
            <h3 className="card-title mb-0">{user_name}</h3>
            <h6 className="card-title mb-0">{user_email}</h6>
            <h6 className="card-title mb-0">{user_status}</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;

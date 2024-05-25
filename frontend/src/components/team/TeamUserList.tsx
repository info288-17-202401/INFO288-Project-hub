import React, { useEffect } from 'react'
import { UserProps } from '../../types/types'
import UserCard from '../UserCard'


type TeamUserListProps = {
    sessionUsers: UserProps[]
}

const TeamUserList: React.FC<TeamUserListProps> = ({
    sessionUsers,
}) => {
   
    useEffect(() => {
        console.log('Users...');

    }, [sessionUsers]);
    


  return (
    <ul className="p-2 m-1" style={{ listStyle: 'none', padding: 0 }}>
    {sessionUsers.map((user, index) => (
      <li className="mb-3" key={index}>
        <UserCard user_name={user.app_user_name} user_email={user.app_user_email} user_status={user.user_status} />
      </li>
    ))}
  </ul>
  )
}

export default TeamUserList

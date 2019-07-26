import React from 'react'

import NicknameEditForm from '../components/NicknameEditForm'
import FollowerList from '../components/FollowerList'
const Profile = ()=>{
    return(
        <> 
            <div>
                <NicknameEditForm/>
                <FollowerList name = {'팔로워 목록'}/>
                <FollowerList name = {'팔로잉 목록'}/>
            </div>
          
        </>
    )
}

export default Profile
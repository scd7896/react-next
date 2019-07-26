import React from 'react'
import {List, Card, Icon, Button} from 'antd'

const FollowerList =({name})=>{
    return(
        <List style = {{marginBottom : '20px'}}
                grid = {{gutter : 4, xs : 2, md : 3}}
                size = 'small'
                header = {<div>{name}</div>}
                loadMore = {<Button style = {{width: '100%'}}>더보기</Button>}
                bordered //테두리 디자인 줄지안줄지
                dataSource = {['김서버', '개천재', '서피셜']}
                renderItem = { item =>(
                    <List.Item style = {{marginTop : '20px'}}>
                        <Card actions = {[<Icon key = 'stop' type = 'stop'></Icon>]}>
                            <Card.Meta description = {item}/>
                        </Card>
                    </List.Item>
                )}>    
        </List>
    )
}

export default FollowerList
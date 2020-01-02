import React, {useState} from 'react';
import axios from 'axios';
import { useAsync } from "react-async";
import UserWithReactAsync from "./UserWithReactAsync";

async function getUsers() {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    return response.data;
}

function UsersWithReactAsync() {
    const [userId, setUserId] = useState(null);
    const { data: users, error, isLoading, reload, run } = useAsync({
        // promiseFn: 로딩 시점부터 해당 함수를 호출
        // deferFn: 로딩 시점에는 호출하지 않고 특정 이벤트 시에만 해당 함수를 호출
        deferFn: getUsers
    });

    if (isLoading) return <div>로딩중..</div>
    if (error) return <div>에러가 발생했습니다</div>
    if (!users) return <button onClick={run}>불러오기</button>;

    return (
        <>
            <ul>
                {users.map(user => (
                    <li key={user.id} onClick={() => setUserId(user.id)}>
                        {user.username} ({user.name})
                    </li>
                ))}
            </ul>
            <button onClick={reload}>다시 불러오기</button>
            {userId && <UserWithReactAsync id={userId} />}
        </>
    );
}

export default UsersWithReactAsync;
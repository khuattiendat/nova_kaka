import "./topBox.scss"
import {topDealUsers} from "../../utils/data/userData.js"

const TopBox = ({data}) => {
    return (
        <div className="topBox">
            <h1>Top user</h1>
            <div className="list">
                {data.map(user => (
                    <div className="listItem" key={user?.id}>
                        <div className="user">
                            <img src={user?.avatar || '/noavatar.png'} alt="avatar"/>
                            <div className="userTexts">
                                <span className="username">{user?.userName}</span>
                                <span className="email">Số bài thi <b>{user?.totalExam}</b></span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TopBox
import React, {useState} from "react";
import './random.scss'

function Random() {
    const [users] = useState(["User 1", "User 2", "User 3", "User 4", "User 5"]);
    const [randomUser, setRandomUser] = useState("");
    const [isAnimating, setIsAnimating] = useState(false);

    // Hàm để chọn ngẫu nhiên một user với hiệu ứng đẹp hơn
    const pickRandomUser = () => {
        if (isAnimating) return; // Ngăn không cho chạy animation nhiều lần cùng lúc

        setIsAnimating(true);
        let iterations = 30; // Số lần thay đổi user trước khi dừng (tăng số lần để animation mượt hơn)
        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * users.length);
            setRandomUser(`Đang chọn: ${users[randomIndex]}`);
            iterations--;

            if (iterations <= 0) {
                clearInterval(interval);
                // Sau khi hoàn thành, chọn user cuối cùng
                const finalIndex = Math.floor(Math.random() * users.length);
                setRandomUser(`User được chọn: ${users[finalIndex]}`);
                setIsAnimating(false);
            }
        }, 100); // Thời gian mỗi lần thay đổi user (100ms)
    };

    return (
        <div className="random">
            <h3>Danh sách User</h3>
            <ul>
                {users.map((user, index) => (
                    <li key={index}>{user}</li>
                ))}
            </ul>
            <button onClick={pickRandomUser} disabled={isAnimating}>
                Chọn User Ngẫu Nhiên
            </button>
            <div id="randomUser" className={isAnimating ? "random-animation" : ""}>
                {randomUser}
            </div>
        </div>
    );
}

export default Random;

import { useEffect } from 'react';

const Clock = () => {
    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            const hr = document.getElementById("hr");
            const min = document.getElementById("min");
            const sec = document.getElementById("sec");

            const hrRotation = (now.getHours() % 12) * 30 + now.getMinutes() / 2;
            const minRotation = now.getMinutes() * 6;
            const secRotation = now.getSeconds() * 6;

            hr.style.transform = `rotate(${hrRotation}deg)`;
            min.style.transform = `rotate(${minRotation}deg)`;
            sec.style.transform = `rotate(${secRotation}deg)`;
        };


        const intervalId = setInterval(updateClock, 1000);

        return () => clearInterval(intervalId);

        updateClock();
    }, []);

    return (
        <div className="clock">
            <div className="clock-bg">
                <img src="/assets/clock.png" alt="..." />
            </div>
            <div className="hour">
                <span className="hr" id="hr"></span>
            </div>
            <div className="minute">
                <span className="min" id="min"></span>
            </div>
            <div className="second">
                <span className="sec" id="sec"></span>
            </div>
        </div>
    );
};

export default Clock;

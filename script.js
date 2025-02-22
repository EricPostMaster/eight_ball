const answers = [
    "Yes", "No", "Ask again", "Megan has to decide", 
    "Make Austin decide", "Ask Juni", "Flip a coin",
    "Lexi has the answer", "Seek Beckham's Guidance"
];

const ball = document.getElementById("magicBall");
const answerText = document.getElementById("answer");

// Button click event
document.getElementById("shakeButton").addEventListener("click", shakeBall);

// Shake detection variables
let lastX = 0, lastY = 0, lastZ = 0, lastTime = 0;
const SHAKE_THRESHOLD = 1;  // Adjust sensitivity as needed

// Function to shake ball and show answer
function shakeBall() {
    ball.classList.add("shake");
    setTimeout(() => {
        ball.classList.remove("shake");
        const randomAnswer = answers[Math.floor(Math.random() * answers.length)];
        answerText.textContent = randomAnswer;
    }, 500);
}

window.addEventListener("devicemotion", (event) => {
    const acceleration = event.accelerationIncludingGravity;
    if (!acceleration) return;

    console.log("Acceleration:", acceleration);

    const currentTime = new Date().getTime();
    if ((currentTime - lastTime) > 100) {  // Limit event firing rate
        let deltaX = Math.abs(acceleration.x - lastX);
        let deltaY = Math.abs(acceleration.y - lastY);
        let deltaZ = Math.abs(acceleration.z - lastZ);

        console.log("DeltaX:", deltaX, "DeltaY:", deltaY, "DeltaZ:", deltaZ);

        let speed = deltaX + deltaY + deltaZ;

        console.log("Speed:", speed);

        if (speed > SHAKE_THRESHOLD) {
            console.log("Shake detected");
            shakeBall();
        }

        lastX = acceleration.x;
        lastY = acceleration.y;
        lastZ = acceleration.z;
        lastTime = currentTime;
    }
});

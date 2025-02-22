const answers = [
    "Yes", "No", "Ask again", "Megan has to decide", 
    "Make Austin decide", "Ask Juni", "Flip a coin",
    "Lexi has the answer", "Seek Beckham's Guidance"
];

const ball = document.getElementById("magicBall");
const answerText = document.getElementById("answer");
const shakeButton = document.getElementById("shakeButton");

// Button click event
shakeButton.addEventListener("click", shakeBall);

// Shake detection variables
let lastX = 0, lastY = 0, lastZ = 0, lastTime = 0;
const SHAKE_THRESHOLD = 15;  

// Function to shake ball and show answer
function shakeBall() {
    ball.classList.add("shake");
    setTimeout(() => {
        ball.classList.remove("shake");
        const randomAnswer = answers[Math.floor(Math.random() * answers.length)];
        answerText.textContent = randomAnswer;
    }, 500);
}

// Function to start motion tracking with permission
function startMotionTracking() {
    if (typeof DeviceMotionEvent.requestPermission === "function") {
        DeviceMotionEvent.requestPermission()
            .then((permissionState) => {
                if (permissionState === "granted") {
                    window.addEventListener("devicemotion", handleMotion);
                } else {
                    alert("Motion access denied. Shake detection won't work.");
                }
            })
            .catch(console.error);
    } else {
        // Non-iOS devices (Android, etc.) don’t need permission
        window.addEventListener("devicemotion", handleMotion);
    }
}

// Motion event handler
function handleMotion(event) {
    const acceleration = event.accelerationIncludingGravity;
    if (!acceleration) return;

    const currentTime = new Date().getTime();
    if ((currentTime - lastTime) > 100) {
        let deltaX = Math.abs(acceleration.x - lastX);
        let deltaY = Math.abs(acceleration.y - lastY);
        let deltaZ = Math.abs(acceleration.z - lastZ);
        let speed = deltaX + deltaY + deltaZ;

        if (speed > SHAKE_THRESHOLD) {
            shakeBall();
        }

        lastX = acceleration.x;
        lastY = acceleration.y;
        lastZ = acceleration.z;
        lastTime = currentTime;
    }
}

// Add event listener to request permission when user interacts with the page
document.body.addEventListener("click", startMotionTracking, { once: true });
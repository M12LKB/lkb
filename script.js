const startButton = document.getElementById('startButton');
 const pauseButton = document.getElementById('pauseButton');
 const stopButton = document.getElementById('stopButton');
 const timerDisplay = document.getElementById('timerDisplay');
 const minutesInput = document.getElementById('minutesInput');
 const secondsInput = document.getElementById('secondsInput');
 const whistleStartSound = document.getElementById('whistleStartSound');
 const whistleEndSound = document.getElementById('whistleEndSound');
 
 let timerInterval;
 let totalSeconds = 600; // Default 10:00
 let isPaused = false;
 let isStopped = false;
 
 // Format time like 00:00
 function formatTime(seconds) {
     const minutes = Math.floor(seconds / 60);
     const remainingSeconds = seconds % 60;
     return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
 }
 
 // Update Timer Display
 function updateDisplay() {
     timerDisplay.textContent = formatTime(totalSeconds);
 }
 
 function startTimer() {
     // Always play the start whistle
     whistleStartSound.play();
 
     // If the timer is already running, do nothing
     if (timerInterval) return;
 
     // Get user set time
     let minutes = parseInt(minutesInput.value) || 0;
     let seconds = parseInt(secondsInput.value) || 0;
     totalSeconds = (minutes * 60) + seconds;
     updateDisplay();
 
     isPaused = false;
     isStopped = false;
     pauseButton.textContent = "Pause";
     stopButton.textContent = "Reset";
 
     timerInterval = setInterval(() => {
         if (!isPaused) {
             totalSeconds--;
 
             if (totalSeconds <= 0) {
                 clearInterval(timerInterval);
                 timerInterval = null;
                 whistleEndSound.play();
                 timerDisplay.textContent = "00:00";
             } else {
                 updateDisplay();
             }
         }
     }, 1000);
 }
 
 function togglePause() {
     if (!timerInterval) return;
 
     isPaused = !isPaused;
     pauseButton.textContent = isPaused ? "Continue" : "Pause";
 }
 
 function stopAndReset() {
     clearInterval(timerInterval);
     timerInterval = null;
     isPaused = false;
 
     totalSeconds = 600;  // Reset to 10:00
     minutesInput.value = 10;
     secondsInput.value = 0;
 
     updateDisplay();
 }
 
 startButton.addEventListener('click', startTimer);
 pauseButton.addEventListener('click', togglePause);
 stopButton.addEventListener('click', stopAndReset); // Use stopAndReset for Stop/Reset functionality
 
 updateDisplay();
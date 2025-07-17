document.addEventListener("DOMContentLoaded", () => {
  const studyTimerH = document.getElementById("hours");
  const studyTimerM = document.getElementById("minutes");
  const studyMusic = document.getElementById("studyMusic");
  const startButton = document.getElementById("startButton");

  startButton.addEventListener("click", () => {
    const hours = parseInt(studyTimerH.value, 0);
    const minutes = parseInt(studyTimerM.value, 0);
    const isMusicEnabled = studyMusic.checked;

    console.log("Hours:", hours);
    console.log("Minutes:", minutes);
    console.log("Study Music Enabled:", isMusicEnabled);
    window.location.href = `study.html?t=${((hours * 60) + (minutes) )* 60};m=${isMusicEnabled}`;
  });
});
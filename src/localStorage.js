const saveProgress = function(data) {
  localStorage.setItem("highScores", JSON.stringify(data));
}

const getProgress = function() {
  if (!localStorage.getItem("highScores")) {
    return {easy: 0, medium: 0, hard: 0, custom: 0}
  }
  return JSON.parse(localStorage.getItem("highScores"));
}

const clearProgress = function() {
  localStorage.removeItem("highScores");
}

export { saveProgress, getProgress, clearProgress }
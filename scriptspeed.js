let score = 0;
let timeLeft = 60;  // 60 seconds
let wordList = ['function' , 'variable' , 'loop' , 'array' , 'object' , 'string' , 'integer' , 'syntax' , 'error' , 'input' , 'output' , 'compile' , 'debug' , 'execute' , 'stack' , 'queue' , 'recursion' , 'condition' , 'event' , 'asynchronous' , 'promise' , 'goto' , 'float' , 'sizeof' , 'switch' , 'typedef' , 'continue' , 'static' , 'for' , 'char' , 'return' , 'malloc' , 'extern' , 'enum' , 'if' , 'break' , 'main' , 'long' ,'void' , 'do' , 'while' , 'case' , 'int' , '#define' , 'scanf' , 'const' , 'free' , 'unsigned' , 'printf' , '#include' , 'signed' , 'def' , 'while' , 'import' , 'if' , 'try' , 'lambda' , 'else' , 'class' , 'for' , 'return' , 'break' , 'continue' , 'with' , 'global' , 'except' , 'is' , 'None' , 'yield' , 'and' , 'or' , 'del' , 'assert' , 'finally' , 'from' , 'in' , 'not' , 'pass' , 'True' , 'False' , 'nonlocal' , 'encryption' , 'decryption' , 'hash' , 'algorithm' , 'symmetric' , 'asymmetric' , 'key' , 'certificate' , 'public' , 'private' , 'cryptography' , 'brute' , 'force' , 'attack' , 'phishing' , 'malware' , 'ransomware' , 'firewall' , 'antivirus' , 'intrusion' , 'detection' , 'penetration' , 'testing' , 'vulnerability' , 'exploit' , 'game' , 'engine' , 'Unity' , 'Unreal' , 'asset' , 'physics' , 'shader' , 'animation' , 'sprite' , '3D' , '2D' , 'collision' , 'detection' , 'rendering' , 'framerate' , 'level' , 'design' , 'character' , 'controller' , 'AI' , 'pathfinding' , 'particle' , 'system' , 'skybox' , 'lighting' , 'texture' , 'rigging' , 'machine' , 'learning' , 'deep' , 'neural' , 'network' , 'supervised' , 'reinforcement' , 'learning' , 'dataset' , 'training' , 'validation' , 'testing' , 'extraction' , 'hyperparameter' , 'optimization' , 'overfitting' , 'underfitting' , 'backpropagation' , 'convolution' , 'recurrent' , 'pipeline' , 'Docker' , 'Kubernetes' , 'Jenkins' , 'GitHub' , 'Actions' , 'Terraform' , 'Ansible' , 'Puppet' , 'Chef' , 'monitoring' , 'logging' , 'Prometheus' , 'Grafana' , 'deployment' , 'scaling' , 'load' , 'balancing' , 'automation' , 'container' , 'orchestration' , 'version' , 'control' , 'repository' , 'HTML' , 'CSS' , 'JavaScript' , 'React' ,  'Angular' , 'Vue' , 'Node.js' , 'Express' , 'RESTful' , 'API' , 'GraphQL' , 'MongoDB' , 'MySQL' , 'authentication' , 'authorization' , 'session' , 'cookie' , 'token' , 'encryption' , 'hashing' , 'database' , 'schema' , 'table' , 'row' , 'column' , 'primary' , 'key' , 'foreign' , 'key' , 'index' , 'query' , 'SQL' , 'SELECT' , 'INSERT' , 'UPDATE' , 'DELETE' , 'JOIN' , 'INNER' , 'OUTER' , 'LEFT' , 'RIGHT' , 'CROSS' , 'UNION' , 'aggregate' , 'normalization' , 'ACID' , 'transaction' , 'rollback' , 'commit' , 'NoSQL' , 'Redis' , 'Cassandra' , 'Elasticsearch' , 'binary' , 'search' , 'merge' , 'sort' , 'quick' , 'sort' , 'dynamic' , 'programming' , 'greedy' , 'algorithm' , 'graph' , 'tree' , 'heap' , 'hash' , 'divide' , 'conquer' , 'brute' , 'force' , 'backtracking' , 'optimization' , 'traversal' , 'node'];
let currentWord = "";
let wordX;
let wordSpeed = 3;  // Word speed
let gameInterval;
let timerInterval;
let countdownInterval;
let currentIndex = 0;  // Index for word list
let totalCharactersTyped = 0;  // Track total characters typed

// Start the game
function startGame() {
  document.getElementById("start-btn").style.display = "none"; // Hide start button
  document.getElementById("score-time").classList.remove("hidden"); // Show score and time
  document.getElementById("word-container").classList.remove("hidden"); // Show word container
  document.getElementById("input").classList.remove("hidden"); // Show input field
  document.getElementById("mode").classList.remove("hidden");

  score = 0;
  timeLeft = 60;  // Set time to 60 seconds
  totalCharactersTyped = 0;  // Reset character count

  document.getElementById("score").textContent = `Score: ${score}`;
  document.getElementById("time").textContent = `Time: ${timeLeft}`;

  document.getElementById("input").value = "";
  document.getElementById("input").focus();

  // Countdown before game starts
  let countdown = 3;
  document.getElementById("time").textContent = `Starting in: ${countdown}`;

  countdownInterval = setInterval(() => {
    countdown--;
    document.getElementById("time").textContent = `Starting in: ${countdown}`;

    if (countdown <= 0) {
      clearInterval(countdownInterval); // Stop countdown
      startGameCountdown();  // Start the game
    }
  }, 1000);
}

// Start the game countdown
function startGameCountdown() {
  wordX = document.getElementById("word-container").offsetWidth; // Start from right side of the screen
  generateWord(); // Generate a new word

  // Start game timer
  timerInterval = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      endGame();  // End the game when time is up
    } else {
      timeLeft--;
      document.getElementById("time").textContent = `Time: ${timeLeft}`;
    }
  }, 1000);

  // Start word movement
  gameInterval = setInterval(gameLoop, 1000 / 60);
}

// Generate a new word
function generateWord() {
  if (currentIndex >= wordList.length) {
    currentIndex = 0; // If we run out of words, restart from the first word
  }
  currentWord = wordList[currentIndex];
  document.getElementById("word").textContent = currentWord;
  wordX = document.getElementById("word-container").offsetWidth; // Set initial position
  currentIndex++;  // Move to the next word in the list
}

// Main game loop
function gameLoop() {
  wordX -= wordSpeed; // Move the word leftward
  document.getElementById("word").style.left = `${wordX}px`;

  if (wordX < -document.getElementById("word").offsetWidth) {
    generateWord(); // If word moves off-screen, generate a new word
  }

  let inputText = document.getElementById("input").value;
  if (inputText === currentWord) {
    score += 10;
    totalCharactersTyped += currentWord.length;  // Add the length of the word to the total character count
    document.getElementById("score").textContent = `Score: ${score}`;
    document.getElementById("input").value = ""; // Clear input field
    generateWord(); // Generate a new word
  }

  // Update the real-time character count
  document.getElementById("character-count").textContent = `Characters Typed: ${totalCharactersTyped}`;
}

// End the game
function endGame() {
  clearInterval(gameInterval);
  clearInterval(timerInterval);
  clearInterval(countdownInterval);

  let wpm = totalCharactersTyped / 5;  // Calculate WPM by dividing total characters by 5
  document.getElementById("popup").style.display = "block"; // Show pop-up
  document.getElementById("final-score").textContent = `Score: ${score}`;
  document.getElementById("final-wpm").textContent = `Words Per Minute: ${wpm.toFixed(2)}`; // Display WPM with 2 decimal places
  document.getElementById("final-characters").textContent = `Total Characters Typed: ${totalCharactersTyped}`; // Show total characters typed
}

// Restart the game
document.getElementById("restart-btn").addEventListener("click", () => {
  // Hide pop-up
  document.getElementById("popup").style.display = "none";

  // Reset the game state to initial values
  score = 0;
  timeLeft = 60;
  totalCharactersTyped = 0;
  currentIndex = 0;

  // Clear any intervals to avoid conflicts
  clearInterval(gameInterval);
  clearInterval(timerInterval);
  clearInterval(countdownInterval);

  // Start the game again
  startGame();
});

// Start the game when the button is clicked
document.getElementById("start-btn").addEventListener("click", startGame);
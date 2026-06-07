# Tic Tac Toe Game

A sleek, modern, and interactive **Tic Tac Toe** web application built with a responsive user interface. Play against a friend locally, track scores, and enjoy a seamless gaming experience.

## 🚀 Features

* **Real-time Turn Tracking:** Clearly displays whose turn it is (**Player X** or **Player O**).
* **Live Scoreboard:** Tracks wins for Player X, Player O, and the total number of draws across multiple rounds.
* **Game Control Options:**
* **New Game:** Clears the board to start a fresh match while keeping the current scoreboard intact.
* **Reset Scores:** Wipes the scoreboard clean to restart your competitive session from scratch.


* **Responsive Design:** A beautifully styled, dark-themed grid layout optimized for both desktop and mobile viewports.

---

## 🛠️ Tech Stack

* **Frontend:** React / Vue / Vanilla HTML5 (depending on your exact framework)
* **Styling:** CSS3 / Tailwind CSS (featuring a modern deep-purple aesthetic)
* **Build Tool:** Vite (running on local development server)

---

## 📦 Installation & Setup

To get a local copy of this game up and running, follow these simple steps:

1. **Clone the repository:**
```bash
git clone https://github.com/your-username/tic-tac-toe-game.git

```


2. **Navigate to the project directory:**
```bash
cd tic-tac-toe-game

```


3. **Install dependencies:**
```bash
npm install

```


4. **Start the local development server:**
```bash
npm run dev

```


*Open your browser and navigate to the local URL provided (typically `http://localhost:5173`).*

---

## 🎮 How To Play

1. The game is played on a grid of **3x3 squares**.
2. **Player X** always goes first.
3. Players take turns clicking on empty squares to place their respective marks (`X` or `O`).
4. The first player to get **3 of their marks in a row** (up, down, across, or diagonally) is declared the winner of that round.
5. If all 9 squares are full and no player has 3 marks in a row, the game ends in a **Draw**.

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCxNmCfQDh3S4craBfML0uNPTna0VvVhBE",
  authDomain: "volleyball-tracker-eec49.firebaseapp.com",
  projectId: "volleyball-tracker-eec49",
  storageBucket: "volleyball-tracker-eec49.firebasestorage.app",
  messagingSenderId: "671979952221",
  appId: "1:671979952221:web:9e33a84db9eacb2f1d55b4",
  measurementId: "G-315GP7CN5B"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const playersRef = collection(db, "players");

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const firstName = document.getElementById("fname").value.trim();
  const lastName = document.getElementById("lname").value.trim();

  if (!firstName || !lastName) {
    alert("Please enter both first and last names");
    return;
  }

  try {
    await addDoc(playersRef, { firstName, lastName, wins: 0, losses: 0 });
    alert("Player added!");
    e.target.reset();
  } catch (error) {
    console.error("Error adding player: ", error);
  }
});
async function displayPlayers() {
  const playersUl = document.getElementById("players-ul");
  playersUl.innerHTML = ""; // clear current list

  const querySnapshot = await getDocs(playersRef);
  querySnapshot.forEach((doc) => {
    const player = doc.data();
    const li = document.createElement("li");
    li.textContent = `${player.firstName} ${player.lastName} - Wins: ${player.wins}, Losses: ${player.losses}`;
    playersUl.appendChild(li);
  });
}

// Call displayPlayers when page loads
displayPlayers();
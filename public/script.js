// Data provider dan game
const providers = {
    pragmatic: [
      "Starlight Princess",
      "Gates Of Olympus",
      "Sweet Bonanza",
      "Mahjong Wins 3 - Black Scatter"
    ],
    pgsoft: [
      "Mahjong Ways",
      "Mahjong Ways 2",
      "Wild Bandito",
      "Wild Bounty Showdown"
    ],
    habanero: ["Koi Gate", "Wealth Inn", "5 Lucky Lions", "Lucky Lucky"]
  };
  
  // Data untuk gambar provider dan game
  const providerImages = {
    pragmatic: "images/pragmatic.png",
    pgsoft: "images/pgsoft.png",
    habanero: "images/habanero.png"
  };
  
  const gameImages = {
    "Starlight Princess": "images/starlight_princess.png",
    "Gates Of Olympus": "images/gates_of_olympus.png",
    "Sweet Bonanza": "images/sweet_bonanza.png",
    "Mahjong Wins 3 - Black Scatter": "images/mahjong_wins3.png",
    "Mahjong Ways": "images/mahjong_ways.png",
    "Mahjong Ways 2": "images/mahjong_ways2.png",
    "Wild Bandito": "images/wild_bandito.png",
    "Wild Bounty Showdown": "images/wild_bounty.png",
    "Koi Gate": "images/koi_gate.png",
    "Wealth Inn": "images/wealth_inn.png",
    "5 Lucky Lions": "images/lucky_lions.png",
    "Lucky Lucky": "images/lucky_lucky.png"
  };
  
  // Variabel untuk mengelola state
  let currentProvider = "pragmatic";
  let currentGameIndex = 0;
  
  // Fungsi untuk memperbarui tampilan provider
  function updateProvider() {
    const providerImage = document.getElementById("provider-image");
    const gameImage = document.getElementById("game-image");
  
    providerImage.src = providerImages[currentProvider];
    providerImage.alt = currentProvider;
  
    currentGameIndex = 0; // Reset ke game pertama dalam provider
    updateGame();
  }
  
  // Fungsi untuk memperbarui tampilan game
  function updateGame() {
    const gameList = providers[currentProvider];
    const gameImage = document.getElementById("game-image");
  
    const gameName = gameList[currentGameIndex];
    gameImage.src = gameImages[gameName];
    gameImage.alt = gameName;
  
    updateItems(gameName);
  }
  
// Fungsi untuk memperbarui item berdasarkan game
function updateItems(gameName) {
    const itemRows = document.querySelectorAll(".item-row");
  
    // Mengupdate nama item dan gambar sesuai dengan game yang dipilih
    itemRows.forEach((itemRow, index) => {
      const itemNameElement = itemRow.querySelector(".item");
      const percentageValueElement = itemRow.querySelector(".percentage-value");
      const percentageBar = itemRow.querySelector(".percentage-bar");
  
      // Menentukan nama item berdasarkan game
      itemNameElement.textContent = `${gameName} Item ${index + 1}`; // Menambahkan nomor pada nama item
  
      // Menentukan gambar item sesuai dengan game yang dipilih
      const itemImage = document.createElement("img");
      itemImage.src = `images/${gameName.toLowerCase().replace(/ /g, "_")}_item${index + 1}.png`; // Sesuaikan path gambar
      itemNameElement.innerHTML = '';  // Hapus teks sebelumnya
      itemNameElement.appendChild(itemImage); // Tambahkan gambar item
  
      // Set initial percentage to 0%
      percentageValueElement.textContent = "0%";
      percentageBar.style.width = "0%"; // Reset the width to 0% initially
    });
  }
  
  
  // Fungsi untuk memperbarui item persentase secara acak antara 70% dan 95%
  function updateItemPercentages() {
    const itemRows = document.querySelectorAll(".item-row");
  
    itemRows.forEach((itemRow) => {
      const randomPercentage = Math.floor(Math.random() * (95 - 70 + 1)) + 70; // Random antara 70% dan 95%
      const percentageValueElement = itemRow.querySelector(".percentage-value");
      const percentageBar = itemRow.querySelector(".percentage-bar");
  
      // Update persentase dan bar
      percentageValueElement.textContent = `${randomPercentage}%`;
      percentageBar.style.width = `${randomPercentage}%`;
  
      // Sesuaikan warna berdasarkan persentase
      if (randomPercentage <= 80) {
        percentageBar.classList.add("low");
        percentageBar.classList.remove("medium", "high");
      } else if (randomPercentage <= 85) {
        percentageBar.classList.add("medium");
        percentageBar.classList.remove("low", "high");
      } else {
        percentageBar.classList.add("high");
        percentageBar.classList.remove("low", "medium");
      }
    });
  }
  
  // Event listener untuk tombol provider
  document.getElementById("prev-provider").addEventListener("click", () => {
    const providerKeys = Object.keys(providers);
    const currentIndex = providerKeys.indexOf(currentProvider);
    currentProvider = providerKeys[(currentIndex - 1 + providerKeys.length) % providerKeys.length];
    updateProvider();
  });
  
  document.getElementById("next-provider").addEventListener("click", () => {
    const providerKeys = Object.keys(providers);
    const currentIndex = providerKeys.indexOf(currentProvider);
    currentProvider = providerKeys[(currentIndex + 1) % providerKeys.length];
    updateProvider();
  });
  
  // Event listener untuk tombol game
  document.getElementById("prev-game").addEventListener("click", () => {
    const gameList = providers[currentProvider];
    currentGameIndex = (currentGameIndex - 1 + gameList.length) % gameList.length;
    updateGame();
  });
  
  document.getElementById("next-game").addEventListener("click", () => {
    const gameList = providers[currentProvider];
    currentGameIndex = (currentGameIndex + 1) % gameList.length;
    updateGame();
  });
  
  // Event listener untuk tombol start
  document.getElementById("start-btn").addEventListener("click", () => {
    if (document.getElementById("username").value) {  // Periksa apakah username telah diisi
      updateItemPercentages(); // Update item percentage setelah start
    } else {
      alert("Username harus diisi!");
    }
  });
  
// Variabel untuk mengecek apakah pesan sudah ditampilkan
let messageDisplayed = false;

// Event listener untuk tombol start
document.getElementById("start-btn").addEventListener("click", () => {
  const usernameInput = document.getElementById("username");
  const username = usernameInput.value.trim(); // Ambil username dari input field
  
  if (username) {  // Periksa apakah username telah diisi
    if (!messageDisplayed) { // Cek apakah pesan sudah ditampilkan
      // Update item percentage setelah start
      updateItemPercentages();

      // Hitung waktu 5 jam dari saat tombol start diklik
      const currentTime = new Date();
      currentTime.setHours(currentTime.getHours() + 5);  // Menambahkan 5 jam
      currentTime.setMinutes(currentTime.getMinutes()); // Biarkan menit tetap sesuai waktu klik
      currentTime.setSeconds(0); // Set detik ke 0

      const hours = currentTime.getHours().toString().padStart(2, "0");
      const minutes = currentTime.getMinutes().toString().padStart(2, "0");

      // Menampilkan pesan yang relevan
      const messageContainer = document.createElement("div");
      messageContainer.classList.add("boost-message");
      messageContainer.innerHTML = `
        <p>ID: ${username} telah berhasil di-boosting, segera bermain di Website BANDARTOTO666 !!!</p>
        <p>Berlaku sampai dengan jam ${hours}:${minutes} hari ini.</p>
      `;

      // Menambahkan pesan ke atas tombol start
      const startButton = document.getElementById("start-btn");
      startButton.parentNode.insertBefore(messageContainer, startButton);

      // Menandakan bahwa pesan sudah ditampilkan
      messageDisplayed = true;
    }
  } else {
    alert("Username harus diisi!");
  }
});

  // Inisialisasi pertama
  updateProvider();
  
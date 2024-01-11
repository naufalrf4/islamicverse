const endpointUrl = "https://api-berita-indonesia.vercel.app/republika/islam/";
const defaultLatitude = -6.2088;
const defaultLongitude = 106.8456;

async function fetchLatestPosts() {
  try {
    const response = await fetch(endpointUrl);
    const data = await response.json();

    if (data && data.data && data.data.posts) {
      const postsContainer = document.getElementById("posts-container");

      data.data.posts.slice(0, 3).forEach((post) => {
        const postElement = document.createElement("div");
        postElement.className = "col-md-4";
        postElement.innerHTML = `
    <div class="post"      
    data-aos="fade-up"
    data-aos-delay="50"
    data-aos-duration="1000"
    data-aos-easing="ease-in-out"
    data-aos-mirror="true"
    data-aos-once="true"
    data-aos-anchor-placement="top-center">
      <div class="post-img"> 
        <img class="img-responsive" src="${post.thumbnail}" alt="${
          post.title
        }"/> 
      </div>
      <div class="post-info">
        <h3><a href="${post.link}" target="_blank">${post.title}</a></h3>
        <p class="text-justify">${post.description}</p>
        <div class="date">${formatDate(post.pubDate)}</div>
        <a class="readmore" href="${post.link}" target="_blank">
          <span>Baca Selengkapnya <i class="eicon mdi mdi-arrow-right"></i></span>
        </a>
      </div>
    </div>
  `;

        postsContainer.appendChild(postElement);
      });
    } else {
      console.error("Invalid data format from API");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
}

function getLocationName(latitude, longitude) {
  const apiKey = "c780bbdac1d64f1cab2832c6f971a5da";
  const locationElement = document.getElementById("location");

  if (latitude === defaultLatitude && longitude === defaultLongitude) {
    locationElement.textContent = " Jakarta";
  } else {
    const apiUrl = `https://api.opencagedata.com/geocode/v1/json?key=${apiKey}&q=${latitude}+${longitude}&pretty=1`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.results.length > 0) {
          const locationName = data.results[0].formatted;
          locationElement.textContent = ` ${locationName}`;
        } else {
          locationElement.textContent = "Tidak dapat menemukan nama lokasi.";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        locationElement.textContent = "Gagal mengambil nama lokasi.";
      });
  }
}
function getJadwalSholatByLocation(latitude, longitude) {
  const apiEndpoint = "https://api.aladhan.com/v1/calendar/";
  const currentDate = new Date();
  const date = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  const dayName = [
    "Minggu,",
    "Senin,",
    "Selasa,",
    "Rabu,",
    "Kamis,",
    "Jumat,",
    "Sabtu,",
  ];
  const dayIndex = currentDate.getDay();
  const dayOfWeek = dayName[dayIndex];

  const namaBulan = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const dateElement = document.querySelector(".date-line p");
  dateElement.textContent = `${dayOfWeek} ${date} ${
    namaBulan[month - 1]
  } ${year}`;

  fetch(
    `${apiEndpoint}${year}/${month}?latitude=${latitude}&longitude=${longitude}&method=2`
  )
    .then((response) => response.json())
    .then((data) => {
      const jadwalSholat = data.data[0].timings;
      document.getElementById("fajr-counter").textContent = jadwalSholat.Fajr;
      document.getElementById("dhuhr-counter").textContent = jadwalSholat.Dhuhr;
      document.getElementById("asr-counter").textContent = jadwalSholat.Asr;
      document.getElementById("maghrib-counter").textContent =
        jadwalSholat.Maghrib;
      document.getElementById("isha-counter").textContent = jadwalSholat.Isha;
      document.getElementById("fajr-table").textContent = jadwalSholat.Fajr;
      document.getElementById("dhuhr-table").textContent = jadwalSholat.Dhuhr;
      document.getElementById("asr-table").textContent = jadwalSholat.Asr;
      document.getElementById("maghrib-table").textContent =
        jadwalSholat.Maghrib;
      document.getElementById("isha-table").textContent = jadwalSholat.Isha;
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}

document
  .getElementById("fetch-prayer-times-btn")
  .addEventListener("click", function () {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          getLocationName(latitude, longitude);
          getJadwalSholatByLocation(latitude, longitude);
        },
        function (error) {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.log("Geolocation is not supported.");
    }
  });

async function askServer(question) {
  try {
    const endpoint = "https://api-naufalrf.azurewebsites.net/chat";

    const responseContainer = document.getElementById("chat-messages");
    const newMessage = document.createElement("div");
    newMessage.classList.add("message", "right");
    newMessage.innerText = question;
    responseContainer.appendChild(newMessage);

    const loadingMessage = document.createElement("div");
    loadingMessage.classList.add("message", "left", "loading");
    loadingMessage.innerText = "...";
    responseContainer.appendChild(loadingMessage);

    const data = {
      chatId: generateChatId(),
      message: question,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(endpoint, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const serverResponse = await response.json();
    const answer = serverResponse.content;

    responseContainer.removeChild(loadingMessage);

    const serverMessage = document.createElement("div");
    serverMessage.classList.add("message", "left");
    serverMessage.innerText = answer;
    responseContainer.appendChild(serverMessage);
  } catch (error) {
    console.error("Terdapat kesalahan dalam menjawab pertanyaan:", error);

    const loadingMessage = document.querySelector(".loading");
    if (loadingMessage) {
      loadingMessage.remove();
    }

    const errorContainer = document.createElement("div");
    errorContainer.classList.add("message", "left", "error");
    errorContainer.innerText = "Terjadi kesalahan dalam memproses pertanyaan.";
    responseContainer.appendChild(errorContainer);
  }
}

const sendButton = document.getElementById("send-button");

sendButton.addEventListener("click", function () {
  const chatInput = document.getElementById("chat-input");
  const userQuestion = chatInput.value;

  if (userQuestion.trim() !== "") {
    askServer(userQuestion);
    chatInput.value = "";
  }
});

document.addEventListener("DOMContentLoaded", (event) => {
  document.getElementById("send-button").addEventListener("click", () => {
    const input = document.getElementById("chat-input");
    const question = input.value.trim();
    if (question !== "") {
      askServer(question);
      input.value = "";
    }
  });
});
function generateChatId() {
  return Math.floor(Math.random() * 1000000);
}

getLocationName(defaultLatitude, defaultLongitude);
getJadwalSholatByLocation(defaultLatitude, defaultLongitude);
fetchLatestPosts();

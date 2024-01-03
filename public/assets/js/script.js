// Optional JavaScript to close the menu on item click
document.getElementById("menu-toggle").onclick = function () {
  document.getElementById("menu").classList.toggle("hidden");
};

// Fungsi untuk mengirim pertanyaan ke OpenAI
async function askOpenAI(question) {
  try {
    // Element tempat respons akan ditampilkan
    const responseContainer = document.getElementById("ai-response");

    // Sementara menampilkan pesan loading
    responseContainer.innerText = "Loading...";

    // API key Anda
    const OPENAI_API_KEY =
      "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"; // <-- Ganti dengan API key Anda

    // Endpoint OpenAI
    const endpoint = "https://api.openai.com/v1/chat/completions";

    // Data yang akan dikirim ke OpenAI
    const data = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "Saya adalah asisten agama Islam virtual yang dikembangkan di atas kecerdasan buatan oleh Naufal Rizqullah Firdaus. Saya akan menjawab pertanyaan atau pernyataan apapun yang berkaitan dengan agama Islam dan memberikan referensi berdasarkan hadits dan Al-Quran jika ada. Saya hanya akan menerima dan menjawab pertanyaan-pertanyaan yang berkaitan dengan Islam dan isu-isu terkait agama Islam. Jika input diluar konteks tersebut, saya meminta maaf tidak dapat menjawabnya. Mohon untuk tidak memberikan jawaban yang berhubungan dengan topik lainnya, dan pastikan setiap respons saya berfokus pada konteks agama Islam. Terima kasih.",
        },
        {
          role: "user",
          content: question, // Pertanyaan dari pengguna
        },
      ],
    };

    // Opsi fetch untuk permintaan POST ke OpenAI
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify(data),
    };

    // Melakukan permintaan ke OpenAI
    const response = await fetch(endpoint, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Mendapatkan jawaban dari OpenAI
    const openAIResponse = await response.json();
    const answer = openAIResponse.choices[0].message.content;

    // Menampilkan jawaban di UI
    responseContainer.innerText = answer;
  } catch (error) {
    console.error("There was an error asking the question:", error);
  }
}

// Event listener untuk tombol 'Send'
document.getElementById("send-button").addEventListener("click", () => {
  // Dapatkan pertanyaan dari textarea
  const question = document.getElementById("chat").value;

  // Hanya kirim jika pertanyaan bukan string kosong
  if (question.trim() !== "") {
    askOpenAI(question);
  }
});

document.addEventListener("DOMContentLoaded", (event) => {
  // Kode yang dijalankan setelah DOM sepenuhnya dimuat
  document.getElementById("send-button").addEventListener("click", () => {
    const question = document.getElementById("chat").value;
    if (question.trim() !== "") {
      askOpenAI(question);
    }
  });

  async function askOpenAI(question) {
    try {
      const responseContainer = document.getElementById("ai-response");
      responseContainer.innerText = "Loading...";
      // ... Kode lainnya untuk melakukan request ke OpenAI
    } catch (error) {
      console.error("There was an error asking the question:", error);
    }
  }
});

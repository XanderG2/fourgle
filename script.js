async function search() {
  const query = document.getElementById("searchbar").value;
  const div = document.getElementById("results")
  try {
    const response = await fetch("/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });
    const data = await response.json();
    div.innerHTML = "";
    for (const result of data) {
      const title = result["title"]
      const url = result["url"]
      const description = result["description"]
      const sd = document.createElement("div");
      const a = document.createElement("a");
      a.innerHTML = title
      a.href = url; 
      const p = document.createElement("p");
      p.innerHTML = description
      sd.appendChild(a);
      sd.appendChild(p);
      sd.className = "result";
      div.appendChild(sd);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

document.getElementById("searchbtn").addEventListener("click", search);

const users = document.getElementById("users");

fetch("https://jsonplaceholder.typicode.com/users")
   .then((response) => response.json())
   .then((data) => {
      console.log(data);
      var html = "";
      data.forEach((user) => {
         html += `
          <div class="card">
          <b>${user.username}</b><br />
          ${user.name}<br />
          ${user.email}
          
          </div>
          `;
      });
      document.getElementById("users").innerHTML = html;
   });

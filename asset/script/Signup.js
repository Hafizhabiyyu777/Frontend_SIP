const url = "http://localhost:3000/users";

console.log("Masuk ke sini");

async function getData(url) {
  const response = await fetch(url);
  const result = response.json();
  return result;
}

async function createUser(url, payload) {
  console.log(payload);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": 'application/json',
    },
    body: JSON.stringify(payload)
  });
  const result = response.json();
  return result;
}

function validasi(isExist, password, confirmpassword) {
  let checkPassword = document.getElementById("passwordError");
  let checkEmail = document.getElementById("emailExist");
  if (isExist) {
    checkEmail.textContent = "Email sudah terpakai!";
  } else {
    checkEmail.textContent = "";
  }
  if (password === confirmpassword) {
    checkPassword.textContent = "";
  } else {
    checkPassword.textContent = "Password Harus Sama!";
  }
}

document
  .getElementById("form-registrasi")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmpasword = document.getElementById("confirmpassword").value;

    getData(`${url}/alluser`).then(function (users) {
      const isExist = users.Data.find((users) => users.email === email);
      validasi(isExist, password, confirmpasword);

      if (!isExist && password === confirmpasword) {
        createUser(`${url}/create`, {
          "username": username,
          "email": email,
          "password": password,
        }).then((result) => {
          document.getElementById("form-registrasi").reset();
          console.log("result: ", result);
          alert("Registrasi Berhasil");
          window.location = "login.html";
        });
      } else {
        console.log("Belum sesuai");
      }
    });
  });

import {
  createInput,
  appendChilds,
  createButton,
  baseUrl,
} from "./utils.js";

let step = "verifyEmail";
let email = "";
let code = "";

const submitNewPassword = async () => {
  const data = {
    email,
    code,
    newPassword: document.getElementById("inputNewPassword").value,
  };
  
  try {
    var request = new XMLHttpRequest(); 
    request.open('POST', `${baseUrl}/unauth/new-passowrd`, true);
    request.setRequestHeader('Content-Type', 'application/json');
  
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        var responseData = JSON.parse(request.responseText);
            
        if (responseData.success) {
          window.location.replace("player.html");
        }
      } else {
        console.error('Erro na requisição. Status:', request.status);
      }
    };
  
    request.onerror = function() {
      console.error('Erro na requisição.');
    };
  
    request.send(JSON.stringify(data)); 
  } catch (err) {
    console.log(err);
  }
};

const verifyCode = async () => {
  const data = {
    email,
    code: document.getElementById("codeInput").value
  };
  
  try {
    var request = new XMLHttpRequest(); 
    request.open('POST', `${baseUrl}/unauth/confirm-token`, true);
    request.setRequestHeader('Content-Type', 'application/json');
  
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        var responseData = JSON.parse(request.responseText);
            
        if (responseData.success) {
          step = "newPassword";
          code = data.code;
          main();
        }
      } else {
        console.error('Erro na requisição. Status:', request.status);
      }
    };
  
    request.onerror = function() {
      console.error('Erro na requisição.');
    };
  
    request.send(JSON.stringify(data)); 
  } catch (err) {
    console.log(err);
  }
};

const verifyEmail = async () => {
  const data = {
    email: document.getElementById("emailInput").value
  };
  
  try {
    var request = new XMLHttpRequest(); 
    request.open('POST', `${baseUrl}/unauth/forget`, true);
    request.setRequestHeader('Content-Type', 'application/json');
  
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        var responseData = JSON.parse(request.responseText);
            
        if (responseData.success) {
          step = "verifyCode";
          email = data.email;
          main();
        }
      } else {
        console.error('Erro na requisição. Status:', request.status);
      }
    };
  
    request.onerror = function() {
      console.error('Erro na requisição.');
    };
  
    request.send(JSON.stringify(data)); 
  } catch (err) {
    console.log(err);
  }
};

const main = () => {
  const root = document.getElementById("root");

  const inputEmail = createInput("emailInput", "input-email", "Insira seu e-mail", "e-mail");

  const buttonVerifyEmail = createButton("submit-button", verifyEmail, "Verificar e-mail");

  const inputCode = createInput("codeInput", "input-code", "Insira o código enviado", "text");

  const buttonVerifyCode = createButton("submit-button", verifyCode,"Verificar código");

  const inputNewPassword = createInput("inputNewPassword", "input-new-password", "Insira sua nova senha", "password");
  
  const inputConfirmNewPassword = createInput("inputConfirmNewPassword", "input-new-password", "Confirme sua nova senha", "password");

  const buttonCreateNewPassword = createButton("submit-button", submitNewPassword, "Confirme sua nova senha");

  const cancelButton = createButton("cancel-button", () => window.location.replace("player.html"), "Cancelar");
  
  root.innerHTML = "";

  if (step === "verifyEmail") appendChilds(root, [inputEmail, buttonVerifyEmail, cancelButton]);
  else if (step === "verifyCode") appendChilds(root, [inputCode, buttonVerifyCode, cancelButton]);
  else if (step === "newPassword") appendChilds(root, [inputNewPassword, inputConfirmNewPassword, buttonCreateNewPassword, cancelButton]);
};

document.addEventListener("DOMContentLoaded", () => main());

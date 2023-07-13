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
          step = "newPassword";
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

const createDivider = () => {
  const div = document.createElement('div');
  div.className = 'divider';
  return div;
}

const main = () => {
  const root = document.getElementById("root");

  const dividerTop = createDivider();
  const dividerBottom = createDivider();

  const infoText = "Para recuperar a sua senha, informe seu endereço de e-mail que nós enviaremos um código para a recuperação de senha."

  const info = document.createElement("p");
  info.appendChild(document.createTextNode(infoText));

  const titleText = "Esqueci a Senha";

  const title = document.createElement("h2");
  title.appendChild(document.createTextNode(titleText));

  const inputEmail = createInput("emailInput", "input-email input-values", "Insira seu e-mail", "e-mail");

  const buttonVerifyEmail = createButton("submit-button", verifyEmail, "ENVIAR");

  const buttonVerifyCode = createButton("submit-button", verifyCode,"Verificar");

  const inputCode = document.createElement('input');
  inputCode.type = "text";
  inputCode.className = "input-code input-values";
  inputCode.id = "codeInput";

  const codeLabel = document.createElement("label");
  codeLabel.appendChild(document.createTextNode('Código-Chave'));

  const codeAndButton = document.createElement('div');
  codeAndButton.className = 'code-and-button';

  const wrapperCode = document.createElement('div');
  wrapperCode.className = "wrapper-input";

  appendChilds(codeAndButton, [inputCode, buttonVerifyCode]);

  appendChilds(wrapperCode, [codeLabel, codeAndButton]);

  const inputNewPassword = createInput("inputNewPassword", "input-new-password input-values", "Nova senha", "password");
  
  const inputConfirmNewPassword = createInput("inputConfirmNewPassword", "input-new-password input-values", "Confirme sua nova senha", "password");

  const buttonCreateNewPassword = createButton("submit-button", submitNewPassword, "ENVIAR");

  const cancelButton = createButton("cancel-button", () => window.location.replace("player.html"), "Voltar");
  
  root.innerHTML = "";
  
  const forgetContainer = document.createElement("div");
  forgetContainer.className = "forget-container";

  if (step === "verifyEmail") appendChilds(forgetContainer, [title, dividerTop, info, inputEmail, buttonVerifyEmail, dividerBottom,cancelButton]);
  else if (step === "newPassword") {
    const codeContainer = document.createElement('div');
    codeContainer.className = "code-container";

    if (code) {
      inputCode.value = code;
      inputCode.disabled = true;
      buttonVerifyCode.disabled = false;
    }
    

    appendChilds(codeContainer, [wrapperCode]);

    const passwordContainer = document.createElement('div');
    passwordContainer.className = "password-container";

    appendChilds(passwordContainer, [inputNewPassword, inputConfirmNewPassword, buttonCreateNewPassword, ]);

    appendChilds(forgetContainer, [title, dividerTop, codeContainer, passwordContainer, dividerTop,cancelButton]);
  }

  appendChilds(root, [forgetContainer]);
};

document.addEventListener("DOMContentLoaded", () => main());

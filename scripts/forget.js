import {
  createInput,
  appendChilds,
  createButton,
  baseUrl,
} from "./utils.js";

let step = "verifyEmail";
let email = "";
let code = "";

const verifyPassword = (password) => {
  if (password.length < 8) return false;
  if (!/\d/.test(password)) return false;
  if (!/[A-Z]/.test(password)) return false;
  if (!/[\W_]/.test(password)) return false;

  return true;
}

const loading = () => {
  const mother = document.createElement("div");
  mother.id = "loading";
  mother.className = "lds-ellipsis";

  const one = document.createElement("div");
  const two = document.createElement("div");
  const three = document.createElement("div");
  const four = document.createElement("div");

  mother.appendChild(one);
  mother.appendChild(two);
  mother.appendChild(three);
  mother.appendChild(four);

  return mother;
}

const submitNewPassword = async () => {
  const info = document.getElementById('password-default-info');
  info.style.color = 'black';
  
  const passwordInput = document.getElementById('inputNewPassword');
  passwordInput.style.borderColor = '#dcdc01';

  const confirmPasswordInput = document.getElementById('inputConfirmNewPassword')
  confirmPasswordInput.style.borderColor = '#dcdc01';
  
  const data = {
    email,
    code,
    newPassword: document.getElementById("inputNewPassword").value,
  };

  const alert = document.getElementById('alert');
  alert.innerHTML = "";

  const buttonCreateNewPassword = createButton("submit-button", submitNewPassword, "ENVIAR");
  const passwordContainer = document.querySelector(".password-container");
  const oldBttn = document.querySelector('.password-container .submit-button');
  const loadingAnimation = loading();

  passwordContainer.removeChild(oldBttn);
  passwordContainer.appendChild(loadingAnimation);
  
  try {
    if (!verifyPassword(data.newPassword)) throw new Error('senhaFraca');
    if (confirmPasswordInput.value !== data.newPassword) throw new Error('noEqual');

    var request = new XMLHttpRequest(); 
    request.open('POST', `${baseUrl}/unauth/new-passowrd`, true);
    request.setRequestHeader('Content-Type', 'application/json');
  
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        var responseData = JSON.parse(request.responseText);
            
        if (responseData.success) {
          window.location.replace("player.html");
        } else {
          passwordContainer.removeChild(loadingAnimation);
          passwordContainer.appendChild(buttonCreateNewPassword);
          alert.innerHTML = responseData.message;
        }
      } else {
        passwordContainer.removeChild(loadingAnimation);
        passwordContainer.appendChild(buttonCreateNewPassword);
        alert.innerHTML = 'Erro na requisição';
      }
    };
  
    request.onerror = function() {
      passwordContainer.removeChild(loadingAnimation);
      passwordContainer.appendChild(buttonCreateNewPassword);
      alert.innerHTML = 'Erro na requisição';
    };
  
    request.send(JSON.stringify(data)); 
  } catch (err) {
    passwordContainer.removeChild(loadingAnimation);
    passwordContainer.appendChild(buttonCreateNewPassword);
    if (err.message === 'senhaFraca') {
      passwordInput.style.borderColor = 'red';
      info.style.color = 'red';
    }
    else if (err.message = 'noEqual') {
      alert.innerHTML = 'As digitadas senhas não coincidem';
      confirmPasswordInput.style.borderColor = 'red';
    }
    else alert.innerHTML = err;
  }
};

const verifyCode = async () => {
  const loadingAnimation = loading();
  const bttn = document.getElementById("submit-button")
  const alert = document.getElementById('alert');
  const newBttn = createButton("submit-button", verifyCode,"Verificar");
  alert.innerHTML = "";

  const containerInput = document.getElementById('code-and-button');
  containerInput.removeChild(document.querySelector('.code-and-button .submit-button'))
  containerInput.appendChild(loadingAnimation);

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
          bttn.disabled = false;
          main();
        } else {
          containerInput.removeChild(loadingAnimation);
          containerInput.appendChild(newBttn);
          alert.innerHTML = responseData.message;
        }
      } else {
        containerInput.removeChild(loadingAnimation);
        containerInput.appendChild(newBttn);
        alert.innerHTML = "Erro na requisição";
      }
    };
  
    request.onerror = function() {
      alert.innerHTML = "Erro na requisição";
      containerInput.removeChild(loadingAnimation);
      containerInput.appendChild(newBttn);
    };
  
    request.send(JSON.stringify(data)); 
  } catch (err) {
    containerInput.removeChild(loadingAnimation);
    containerInput.appendChild(newBttn);
    alert.innerHTML = err;
  }
};

const verifyEmail = async () => {
  const alert = document.getElementById('alert');
  alert.innerHTML = "";

  const data = {
    email: document.getElementById("emailInput").value
  };

  const loadingAnimation = loading();

  const bttn = document.createElement('button');
  bttn.className = "submit-button";
  bttn.id = "submit-button";
  bttn.onclick = verifyEmail;
  bttn.appendChild(document.createTextNode('ENVIAR'));

  const container = document.getElementById("container-bttn");
  container.removeChild(document.getElementById('submit-button'));
  container.appendChild(loadingAnimation);
  
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
        } else {
          container.removeChild(loadingAnimation);
          container.appendChild(bttn);
          alert.innerHTML = responseData.message;
        }
      } else {
        container.removeChild(loadingAnimation);
        container.appendChild(bttn);
        alert.innerHTML = responseData.message;
        
        console.error('Erro na requisição. Status:', request.status);
      }
    };
  
    request.onerror = function() {
      container.removeChild(loadingAnimation);
      container.appendChild(bttn);
      alert.innerHTML = 'Erro na requisição';
    };
  
    request.send(JSON.stringify(data)); 
  } catch (err) {
    container.removeChild(loadingAnimation);
    container.appendChild(bttn);
    alert.innerHTML = err;
  }
};

const createDivider = () => {
  const div = document.createElement('div');
  div.className = 'divider';
  return div;
}

const main = () => {
  const passwordDefaultText = document.createElement('p')
  passwordDefaultText.appendChild(document.createTextNode('Mínimo de 8 caracteres, incluíndo números, maiúsculas e símbolos.'));
  passwordDefaultText.id = 'password-default-info';

  const alert = document.createElement("div");
  alert.id = "alert";
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
  codeAndButton.id = 'code-and-button';

  const wrapperCode = document.createElement('div');
  wrapperCode.className = "wrapper-input";

  if (!code) appendChilds(codeAndButton, [inputCode, buttonVerifyCode]);
  else {
    const img = document.createElement('img');
    img.src = './T_Checked.png';
    img.id = "checked";
    const containerChecked = document.createElement('div');
    containerChecked.className = 'container-checked';
    containerChecked.appendChild(img);

    appendChilds(codeAndButton, [inputCode, containerChecked]);
  }

  appendChilds(wrapperCode, [codeLabel, codeAndButton]);

  const inputNewPassword = createInput("inputNewPassword", "input-new-password input-values", "Nova senha", "password");
  
  const inputConfirmNewPassword = createInput("inputConfirmNewPassword", "input-new-password input-values", "Confirme sua nova senha", "password");

  const buttonCreateNewPassword = createButton("submit-button", submitNewPassword, "ENVIAR");

  const cancelButton = createButton("cancel-button", () => window.location.replace("player.html"), "Voltar");
  
  root.innerHTML = "";
  
  const forgetContainer = document.createElement("div");
  forgetContainer.className = "forget-container";

  const containerBttn = document.createElement("div");
  containerBttn.id = "container-bttn";
  containerBttn.appendChild(buttonVerifyEmail)

  if (step === "verifyEmail") appendChilds(forgetContainer, [title, dividerTop, info, inputEmail, containerBttn, dividerBottom, cancelButton, alert]);
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
    if (!code) buttonCreateNewPassword.disabled = true;

    appendChilds(passwordContainer, [inputNewPassword, passwordDefaultText,inputConfirmNewPassword, buttonCreateNewPassword, ]);

    appendChilds(forgetContainer, [title, dividerTop, codeContainer, passwordContainer, dividerBottom, cancelButton, alert]);
  }

  appendChilds(root, [forgetContainer]);
};

document.addEventListener("DOMContentLoaded", () => main());

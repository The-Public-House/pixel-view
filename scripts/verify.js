import {
  appendChilds,
  createButton,
  createInput,
  postHttp
} from "./utils.js";

let codeValue

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

const main = () => {
  const loadingContainer = loading();
  const alert = document.createElement("div");
  alert.className = "alert";
  var urlParams = new URLSearchParams(window.location.search);
  var email = urlParams.get("email");
  
  const root = document.getElementById("root");

  const titleText = 'Confirmação de Cadastro';
  const infoText = `Um código de verificação de cadastro foi enviado para seu e-mail`;

  const title = document.createElement("h2");
  title.style.color = "#dcdc01";
  title.appendChild(document.createTextNode(titleText));

  const info = document.createElement("p");
  info.appendChild(document.createTextNode(infoText));
  info.style.color = "#6b6b6b";

  const codeInput = createInput('code', 'code-input', 'Código-Chave', 'code');

  const submitRegister = createButton('submit-button', () => window.location.replace("player.html"), 'FINALIZAR CADASTRO');

  submitRegister.disabled = true;

  const verifyCode = async () => {
    const input = document.getElementById("code");
    const wrapper = document.getElementById("wrapper-input")
    wrapper.removeChild(document.getElementById("verify-button"));
    const verifyBttn = createButton('verify-button', verifyCode, 'Verificar');
    wrapper.appendChild(loadingContainer);

    const hasVerified = document.createElement("div");
    hasVerified.className = "has-verified";
    
    const img = document.createElement("img");
    img.src = "./T_Checked.png";

    hasVerified.appendChild(img);

    const data = {
      email,
      code: document.getElementById('code').value
    }

    alert.innerHTML = "";

    try {
      postHttp(
        '/unauth/master/verify',
        (data) => {
          if (data.success) {
            wrapper.removeChild(loadingContainer);
            wrapper.appendChild(hasVerified);
            input.disabled = true;
            submitRegister.disabled = false
          } else {
            wrapper.removeChild(loadingContainer);
            wrapper.appendChild(verifyBttn);
            alert.innerHTML = data.message;
          }
        },
        () => {
          wrapper.removeChild(loadingContainer);
          wrapper.appendChild(verifyBttn);
          alert.innerHTML = 'Não foi possivel verificar o seu código';
        },
        () => {
          wrapper.removeChild(loadingContainer);
          wrapper.appendChild(verifyBttn);
          alert.innerHTML = 'Ocorreu um erro ao enviar seu código para verificação.';
        },
        data
      )

    } catch (err) {
      wrapper.removeChild(loadingContainer);
      wrapper.appendChild(verifyBttn);
    }
  };

  const dividerTop = document.createElement("div");
  const dividerBottom = document.createElement("div");

  dividerTop.className = "divider";
  dividerBottom.className = "divider";

  const verifyCodeButton = createButton('verify-button', verifyCode, 'Verificar');
  
  const toCancelButton = createButton('cancel-button', () => window.location.replace("player.html"), 'Voltar ao Login');

  const wrapperInput = document.createElement("div");
  wrapperInput.className = "wrapper-input";
  wrapperInput.id = "wrapper-input";

  appendChilds(wrapperInput, [codeInput, verifyCodeButton,])

  const elementList = [
    title,
    dividerTop,
    info,
    wrapperInput,
    submitRegister,
    dividerBottom,
  ]

  const mainContent = document.createElement("div");
  mainContent.className = "main-content";

  appendChilds(mainContent, elementList);

  const cardVerify = document.createElement("div");
  cardVerify.className = "card-verify";
  
  appendChilds(cardVerify, [mainContent, toCancelButton, alert]);

  appendChilds(root, [cardVerify, ]);
};

document.addEventListener("DOMContentLoaded", main);



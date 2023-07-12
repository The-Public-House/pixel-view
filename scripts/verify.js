import {
  appendChilds,
  createButton,
  createInput,
  postHttp
} from "./utils.js";

let step = 'verifyEmail';
let email;

const main = () => {
  const root = document.getElementById("root");

  const emailInput = createInput('email', 'email-input', 'Insira seu e-mail', 'email');

  const codeInput = createInput('code', 'code-input', 'Insira seu código de verificação', 'code');

  const verifyEmail = async () => {
    email = document.getElementById("email").value
    step = "verifyCode"
    main();
  };

  const verifyCode = async () => {
    const data = {
      email,
      code: document.getElementById('code').value
    }

    try {
      postHttp(
        '/unauth/master/verify',
        (data) => {
          console.log(data)
          window.location.replace("player.html");
        },
        () => console.log('Não foi possivel verificar o seu código'),
        () => console.log('Ocorreu um erro ao enviar seu código para verificação.'),
        data
      )

    } catch (err) {
      console.log(err);
    }
  };

  const verifyEmailButton = createButton('submit-button', verifyEmail, 'Verificar e-mail');
  const verifyCodeButton = createButton('submit-button', verifyCode, 'Verificar código');

  if (step === "verifyEmail") {
    root.innerHTML = "";
    appendChilds(root, [emailInput, verifyEmailButton]);
  }
  else if (step === "verifyCode") {
    root.innerHTML = "";
    appendChilds(root, [codeInput, verifyCodeButton]);
  }
};

document.addEventListener("DOMContentLoaded", main);
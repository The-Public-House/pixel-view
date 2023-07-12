import { constructData, postHttp } from "./utils.js";

const verifyPassword = (password) => {
  if (password.length < 8) return false;
  if (!/\d/.test(password)) return false;
  if (!/[A-Z]/.test(password)) return false;
  if (!/[\W_]/.test(password)) return false;

  return true;
}

const interestList = [
  "cotton",
  "sugarCane",
  "soy",
  "games",
  "birds",
  "cocoa",
  "swine",
  "consumer",
  "bovine",
  "milk",
  "events",
  "others",
  "coffee",
  "fish",
  "meets"
]

const optionalInputs = [
  "corp",
  "corpEmail",
  "role",
  "area",
  "chain"
]

function verificarScroll() {
  var alturaConteudo = document.getElementById("images").scrollHeight;

  var alturaVisivel = document.getElementById("images").clientHeight;

  var scrollAtual = document.getElementById("images").scrollTop;

  if (scrollAtual + alturaVisivel >= alturaConteudo) {
    const button = document.getElementById("accept");
    button.disabled = false;
  } else {
    const button = document.getElementById("accept");
    button.disabled = true;
  }
}

const main = () => {
  document.getElementById("images").addEventListener("scroll", verificarScroll);

  const modals = document.querySelectorAll('[data-modal]');

  modals.forEach(function (trigger) {
    trigger.addEventListener('click', function (event) {
      event.preventDefault();
      const modal = document.getElementById(trigger.dataset.modal);
      modal.classList.add('open');
      const exits = modal.querySelectorAll('.modal-exit');
      exits.forEach(function (exit) {
        exit.addEventListener('click', function (event) {
          event.preventDefault();
          modal.classList.remove('open');
        });
      });
      
      document.getElementById("accept").addEventListener('click', () => {
        event.preventDefault();
        modal.classList.remove('open');
        const checkbox = document.getElementById("acceptTerms");
        checkbox.checked = true;
      })
    });
  });

  document.getElementById("partOf").addEventListener("click", () => {
    const noPartOf = document.getElementById("noPartOf");
    noPartOf.checked = false;

    for (const input of optionalInputs) {
      const inp = document.getElementById(input);
      inp.disabled = false;
    }
  });

  document.getElementById("noPartOf").addEventListener("click", () => {
    const partOf = document.getElementById("partOf");
    partOf.checked = false;

    for (const input of optionalInputs) {
      const inp = document.getElementById(input);
      inp.disabled = true;
    }
  });

  document.getElementById("allChecked").addEventListener('click', () => {
    const allUnChecked = document.getElementById("allUnChecked");
    allUnChecked.checked = false;
    
    for (const interest of interestList) {
      const checkbox = document.getElementById(interest)
      
      checkbox.checked = true;
    }
  })

  document.getElementById("allUnChecked").addEventListener('click', () => {
    const allChecked = document.getElementById("allChecked");
    allChecked.checked = false;

    for (const interest of interestList) {
      const checkbox = document.getElementById(interest);
      checkbox.checked = false;
    }
  })

  document.getElementById("togglePassword").addEventListener('click', () => {
    const eye = document.getElementById("togglePassword");
    const passwordInput = document.getElementById("password");

    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password"

    passwordInput.setAttribute("type", type);

    eye.classList.toggle('fa-eye-slash');
  })

  document.getElementById("toggleConfirmPassword").addEventListener('click', () => {
    const eye = document.getElementById("toggleConfirmPassword");
    const passwordInput = document.getElementById("confirmPassword");

    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password"

    passwordInput.setAttribute("type", type);

    eye.classList.toggle('fa-eye-slash');
  })

  document.getElementById("cancel-button").addEventListener("click", () => window.location.replace("player.html"));
  document.getElementById("cancel-button-footer").addEventListener("click", () => window.location.replace("player.html"));

  document.getElementById("register-button").addEventListener("click", async () => {
    const alert = document.getElementById("alert");

    alert.innerHTML = "";

    try {

      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;
      
      if (!verifyPassword(password)) throw new Error('Senha fraca.');

      if (password !== confirmPassword) throw new Error('Senhas não coincidem.');

      let data = {
        name: document.getElementById("name").value,
        lastName: document.getElementById("lastName").value,
        email: document.getElementById("email").value,
        password,
        phone: document.getElementById("phone").value,
        cpf: document.getElementById("cpf").value,
        corpEmail: document.getElementById("corpEmail").value,
        role: document.getElementById("role").value,
      };

      data = {
        ...data,
        partOf: document.getElementById("partOf").checked,
        acceptTerms: document.getElementById("acceptTerms").checked,  
      };

      const translateCheckbox = (field, text) => document.getElementById(field).checked ? `${text},` : "";

      const areaOfInterest = `
        ${translateCheckbox("cotton", 'Algodão')}
        ${translateCheckbox("sugarCane", 'Cana de Açucar')}
        ${translateCheckbox("soy", 'Soja')}
        ${translateCheckbox("birds", 'Aves')}
        ${translateCheckbox("cocoa", 'Cacau')}
        ${translateCheckbox("swine", 'Suíno')}
        ${translateCheckbox("bovine", 'Bovino')}
        ${translateCheckbox("milk", 'Leite e derivados')}
        ${translateCheckbox("coffee", 'Café')}
        ${translateCheckbox("fish", 'Pescado')}`.replace(' ', '');
    
      const formatAreaOfInterest = areaOfInterest.slice(0, -1);

      data = { ...data, areaOfInterest: formatAreaOfInterest };

      // postHttp(
      //   '/unauth/signup',
      //   (data) => {
      //     console.log(data);
      //     alert.innerHTML = "<p>Usuário criado com sucesso!</p>";
      //   },
      //   () => console.error('Erro na requisição. Status:', request.status),
      //   () => alert.innerHTML = "<  p>Não foi possível cadastrar o usuário.</p>",
      //   data
      // );

    } catch (err) {
      console.log("Ocorreu um erro ao registrar: ", err);
    }
  });
};

document.addEventListener("DOMContentLoaded", () => main());

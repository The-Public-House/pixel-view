import { postHttp } from "./utils.js";

const verifyPassword = (password) => {
  if (password.length < 8) return false;
  if (!/\d/.test(password)) return false;
  if (!/[A-Z]/.test(password)) return false;
  if (!/[\W_]/.test(password)) return false;

  return true;
}

const verifyEmail = (email) => {
  const conditional = /^[\w\.-]+@[\w\.-]+\.\w+$/;
  if (conditional.test(email)) {
    return true;
  } else {
    return false;
  }
}

const verifyPhone = (phone) => {
  if (/^(\d)\1+$/.test(phone)) return false;
  return true;
}

const verifyCPF = (cpf) => {
  cpf = cpf.replace(/[^\d]+/g, '');

  if (cpf.length !== 11) return false;

  if (/^(\d)\1+$/.test(cpf)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let remainder = sum % 11;
  let digit = (remainder < 2) ? 0 : 11 - remainder;
  if (parseInt(cpf.charAt(9)) !== digit) {
    return false;
  }

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  remainder = sum % 11;
  digit = (remainder < 2) ? 0 : 11 - remainder;
  if (parseInt(cpf.charAt(10)) !== digit) {
    return false;
  }

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
    const loading = document.getElementById("loading");
    const button = document.getElementById("register-button");

    button.style.display = "none";
    loading.style.display = "block";

    const alert = document.getElementById("alert");

    alert.innerHTML = "";

    try {
      const noPartOf = document.getElementById("noPartOf").checked;

      const email = document.getElementById("email").value;
      const corpEmail = document.getElementById("corpEmail").value;
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;
      const cpf = document.getElementById("cpf").value;
      const phone = document.getElementById("phone").value;
      
      if (!verifyPassword(password)) throw new Error('Senha fraca.');
      if (password !== confirmPassword) throw new Error('Senhas não coincidem.');
      if (!verifyCPF(cpf)) throw new Error('CPF Invalido.');
      if (!verifyPhone(phone)) throw new Error('Telefone invalido.');
      if (!verifyEmail(email)) throw new Error('E-mail invalido.');

      let data = {
        name: document.getElementById("name").value,
        lastName: document.getElementById("lastName").value,
        partOf: document.getElementById("partOf").checked,
        acceptTerms: document.getElementById("acceptTerms").checked,
        email,
        corpEmail,
        phone,
        password,
        cpf,
      };
      
      if (!noPartOf) {
        if (!verifyEmail(corpEmail)) throw new Error('E-mail corporativo invalido.');
        
        data = {
          ...data,
          corp: document.getElementById("corp").value,
          corpEmail: document.getElementById("corpEmail").value,
          role: document.getElementById("role").value,
          area: document.getElementById("area").value,
          chain: document.getElementById("chain").value
        }
      }
      
      const translateCheckbox = (field, text) => document.getElementById(field).checked ? `${text},` : "";

      const areaOfInterest = `${translateCheckbox("cotton", 'Algodão')}${translateCheckbox("sugarCane", 'Cana de Açucar')}${translateCheckbox("soy", 'Soja')}${translateCheckbox("games", "Games")}${translateCheckbox("birds", 'Aves')}${translateCheckbox("cocoa", 'Cacau')}${translateCheckbox("swine", 'Suíno')}${translateCheckbox("consumer", "Consumo")}${translateCheckbox("bovine", 'Bovino')}${translateCheckbox("milk", 'Leite e derivados')}${translateCheckbox("events", "Eventos")}${translateCheckbox("coffee", 'Café')}${translateCheckbox("fish", 'Pescado')}${translateCheckbox("meets", 'Reuniões')}`.replace(' ', '');    const formatAreaOfInterest = areaOfInterest.slice(0, -1);

      data = { ...data, areaOfInterest: formatAreaOfInterest };

      postHttp(
        '/unauth/signup',
        (data) => window.location.replace("player.html"),
        () => {
          loading.style.display = "none";
          button.style.display = "block";
          console.error('Erro na requisição. Status:', request.status);
        },
        () => {
          loading.style.display = "none";
          button.style.display = "block";
          alert.innerHTML = "<p>Não foi possível cadastrar o usuário.</p>"
        },
        data
      );

    } catch (err) {
      loading.style.display = "none";
      button.style.display = "block";
      
      alert.innerHTML = String(err).replace("Error: ", '');
    }
  });
};

document.addEventListener("DOMContentLoaded", () => main());

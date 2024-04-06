let participantes = [
  {
    nome: "Marcos",
    email: "marcos@email.com",
    dataInscricao: new Date(2024, 01, 01, 21, 34),
    dataCheckIn: new Date(2024, 02, 01, 21, 34),
  },
  {
    nome: "Hiury",
    email: "hiury@email.com",
    dataInscricao: new Date(2024, 01, 28, 16, 00),
    dataCheckIn: new Date(2024, 03, 29, 21, 34),
  },
  {
    nome: "Felipe",
    email: "felipe@email.com",
    dataInscricao: new Date(2024, 03, 30, 10, 15),
    dataCheckIn: null,
  },
  {
    nome: "João",
    email: "joao@email.com",
    dataInscricao: new Date(2024, 01, 29, 14, 20),
    dataCheckIn: new Date(2024, 02, 30, 16, 45),
  },
  {
    nome: "Maria",
    email: "maria@email.com",
    dataInscricao: new Date(2024, 03, 28, 18, 30),
    dataCheckIn: new Date(2024, 01, 29, 20, 00),
  },
  {
    nome: "Pedro",
    email: "pedro@email.com",
    dataInscricao: new Date(2024, 01, 29, 22, 05),
    dataCheckIn: new Date(2024, 02, 30, 12, 10),
  },
  {
    nome: "Sofia",
    email: "sofia@email.com",
    dataInscricao: new Date(2024, 04, 30, 08, 45),
    dataCheckIn: null,
  },
  {
    nome: "Lucas",
    email: "lucas@email.com",
    dataInscricao: new Date(2024, 02, 31, 09, 20),
    dataCheckIn: new Date(2024, 03, 31, 09, 20),
  },
  {
    nome: "Carla",
    email: "carla@email.com",
    dataInscricao: new Date(2024, 01, 29, 17, 55),
    dataCheckIn: new Date(2024, 05, 30, 19, 30),
  },
  {
    nome: "Rafael",
    email: "rafael@email.com",
    dataInscricao: new Date(2024, 02, 30, 14, 10),
    dataCheckIn: new Date(2024, 01, 31, 18, 55),
  },
  {
    nome: "Mariana",
    email: "mariana@email.com",
    dataInscricao: new Date(2024, 02, 31, 11, 40),
    dataCheckIn: new Date(2024, 05, 31, 11, 40),
  },
];

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao);
  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn);

  if (participante.dataCheckIn == null) {
    dataCheckIn = `
   <button
    data-email="${participante.email}"
    onclick="fazerCheckIn(event)"
   >
     Confirmar check-in
   </button>
    `;
  }

  return `
   <tr>
     <td>
       <strong>
         ${participante.nome}
       </strong>
       <br>
       <small>
         ${participante.email}
       </small>
     </td>
     <td>${dataInscricao}</td>
     <td>${dataCheckIn}</td>
   </tr>
   `;
};

const atualizarLista = (participantes) => {
  let output = "";
  for (let participante of participantes) {
    output = output + criarNovoParticipante(participante);
  }

  document.querySelector("tbody").innerHTML = output;
};

atualizarLista(participantes);

const adicionarParticipante = (event) => {
  event.preventDefault();

  const dadosDoFormulario = new FormData(event.target);

  const participante = {
    nome: dadosDoFormulario.get("nome"),
    email: dadosDoFormulario.get("email"),
    dataInscricao: new Date(),
    dataCheckIn: null,
  };

  const participanteExiste = participantes.find(
    (p) => p.email == participante.email
  );

  if (participanteExiste) {
    alert("Email já cadastrado!");
    return;
  }

  participantes = [participante, ...participantes];
  atualizarLista(participantes);

  event.target.querySelector('[name="nome"]').value = "";
  event.target.querySelector('[name="email"]').value = "";
};

const fazerCheckIn = (event) => {
  const resultado = confirm("Tem certeza que deseja fazer o check-in?");

  if (false == resultado) {
    return;
  }

  const participante = participantes.find((p) => {
    return p.email == event.target.dataset.email;
  });

  participante.dataCheckIn = new Date();

  atualizarLista(participantes);
};

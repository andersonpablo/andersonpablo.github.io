const form = document.getElementById('declarationForm');
const nomeInput = document.getElementById('nome');
const cpfInput = document.getElementById('cpf');
const nomePreview = document.getElementById('nomePreview');
const cpfPreview = document.getElementById('cpfPreview');
const datePreview = document.getElementById('datePreview');
const previewBtn = document.getElementById('previewBtn');

const meses = [
  'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
];

function dataPorExtenso(data = new Date()) {
  return `Natal/RN, ${data.getDate()} de ${meses[data.getMonth()]} de ${data.getFullYear()}.`;
}

function formatarCPF(valor) {
  return valor
    .replace(/\D/g, '')
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

function cpfValido(cpf) {
  const numeros = cpf.replace(/\D/g, '');
  if (numeros.length !== 11 || /^(\d)\1{10}$/.test(numeros)) return false;

  const calcularDigito = (base, pesoInicial) => {
    let soma = 0;
    for (let i = 0; i < base.length; i++) soma += Number(base[i]) * (pesoInicial - i);
    const resto = (soma * 10) % 11;
    return resto === 10 ? 0 : resto;
  };

  const d1 = calcularDigito(numeros.slice(0, 9), 10);
  const d2 = calcularDigito(numeros.slice(0, 10), 11);
  return d1 === Number(numeros[9]) && d2 === Number(numeros[10]);
}

function mostrarErro(input, id, mensagem) {
  document.getElementById(id).textContent = mensagem;
  input.classList.toggle('invalid', Boolean(mensagem));
}

function validar() {
  const nome = nomeInput.value.trim().replace(/\s+/g, ' ');
  const cpf = cpfInput.value.trim();
  let valido = true;

  if (nome.length < 5 || !nome.includes(' ')) {
    mostrarErro(nomeInput, 'nomeError', 'Informe o nome completo.');
    valido = false;
  } else {
    mostrarErro(nomeInput, 'nomeError', '');
  }

  if (!cpfValido(cpf)) {
    mostrarErro(cpfInput, 'cpfError', 'Informe um CPF válido.');
    valido = false;
  } else {
    mostrarErro(cpfInput, 'cpfError', '');
  }

  return valido;
}

function atualizarPreview() {
  nomePreview.textContent = nomeInput.value.trim().replace(/\s+/g, ' ') || 'NOME DO(A) ALUNO(A)';
  cpfPreview.textContent = cpfInput.value || '000.000.000-00';
  datePreview.textContent = dataPorExtenso();
}

cpfInput.addEventListener('input', (event) => {
  event.target.value = formatarCPF(event.target.value);
  atualizarPreview();
});

nomeInput.addEventListener('input', atualizarPreview);
previewBtn.addEventListener('click', atualizarPreview);

document.addEventListener('DOMContentLoaded', atualizarPreview);

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  atualizarPreview();
  if (!validar()) return;

  const submitButton = form.querySelector('button[type="submit"]');
  const textoOriginal = submitButton.textContent;
  submitButton.disabled = true;
  submitButton.textContent = 'Gerando PDF...';

  try {
    if (!window.html2canvas || !window.jspdf) {
      throw new Error('Bibliotecas de PDF não carregadas. Verifique sua conexão com a internet.');
    }

    const documento = document.getElementById('document');
    const canvas = await html2canvas(documento, {
      scale: 2.2,
      useCORS: true,
      backgroundColor: '#ffffff',
      logging: false
    });

    const imagem = canvas.toDataURL('image/jpeg', 0.98);
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    pdf.addImage(imagem, 'JPEG', 0, 0, 210, 297, undefined, 'FAST');

    const nomeArquivo = nomeInput.value
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9]+/g, '_')
      .replace(/^_|_$/g, '')
      .toLowerCase();

    pdf.save(`declaracao_${nomeArquivo || 'i9_educacao'}.pdf`);
  } catch (erro) {
    alert(erro.message || 'Não foi possível gerar o PDF.');
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = textoOriginal;
  }
});

const readline = require("readline-sync");

let history = [];
let previousResult = null;

function displayMenu() {
  console.log("\n===== KALKULATOR =====");
  console.log("1. Hitung");
  console.log("2. Riwayat");
  console.log("3. Keluar");
}

function getUserChoice() {
  const choice = readline.question("Pilih opsi (1/2/3): ");
  return choice;
}

function getNumber(prompt) {
  let number;
  while (true) {
    number = parseFloat(readline.question(prompt));
    if (!isNaN(number)) {
      return number;
    }
    console.log("Inputan tidak valid. Harap masukkan angka.");
  }
}

function getOperator() {
  const validOperators = ["+", "-", "*", "/", "%"];
  let operator;
  while (true) {
    operator = readline.question("Pilih operator (+, -, *, /, %): ");
    if (validOperators.includes(operator)) {
      return operator;
    }
    console.log("Operator tidak valid. Silakan pilih dari operator yang tersedia.");
  }
}

function processHasil(inputanPertama, inputanKedua, operator) {
  switch (operator) {
    case "+":
      return inputanPertama + inputanKedua;
    case "-":
      return inputanPertama - inputanKedua;
    case "*":
      return inputanPertama * inputanKedua;
    case "/":
      if (inputanKedua === 0) {
        throw new Error("Kesalahan: Angka kedua tidak boleh bernilai 0.");
      }
      return inputanPertama / inputanKedua;
    case "%":
      return inputanPertama % inputanKedua;
    default:
      throw new Error("Operator tidak valid.");
  }
}

while (true) {
  displayMenu();
  const choice = getUserChoice();

  if (choice === '1') {
    const angkaPertama = previousResult !== null ? previousResult : getNumber("Masukkan angka pertama: ");
    const operator = getOperator();
    const angkaKedua = getNumber("Masukkan angka kedua: ");

    let hasil;
    try {
      hasil = processHasil(angkaPertama, angkaKedua, operator);
      console.log(`Hasilnya adalah: ${hasil}`);
      history.push(`${angkaPertama} ${operator} ${angkaKedua} = ${hasil}`);
      previousResult = hasil;
    } catch (e) {
      console.log(e.message);
    }

  } else if (choice === '2') {
    console.log("\nRiwayat kalkulasi:");
    history.forEach((item, index) => {
      console.log(`${index + 1}. ${item}`);
    });

  } else if (choice === '3') {
    console.log("Terima kasih telah menggunakan kalkulator!");
    break;

  } else {
    console.log("Pilihan tidak valid. Silakan pilih lagi.");
  }
}

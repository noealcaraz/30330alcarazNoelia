//Calcular pagos en cuotas sobre un monto determinado


function calcularCuotas() {

    let importeTotal = parseInt(prompt('Ingrese el importe total a calcular'));

    while (isNaN(importeTotal)) {

        importeTotal = prompt('El dato que ingreso no es valido. Ingrese el importe total a calcular')
        
    }

    let cantidadCuotas = parseInt(prompt('¿Quiere aplicar 3, 6 o 12 cuotas sin interes?'));
    let resultadoCuotas = importeTotal / cantidadCuotas;

    if (cantidadCuotas === 3) {

        alert(`Usted pagará $${importeTotal} en ${cuotas} cuotas de $${resultadoCuotas}`)

    } else if (cantidadCuotas === 6) {

        alert(`Usted pagará $${importeTotal} en ${cuotas} cuotas de $${resultadoCuotas}`)

    } else if (cantidadCuotas === 12) {

        alert(`Usted pagará $${importeTotal} en ${cuotas} cuotas de $${resultadoCuotas}`)

    } else if (cantidadCuotas != 3 && cantidadCuotas != 6 && cantidadCuotas != 12) {

        alert('la cantidad de cuotas no es válida')

    }
}

calcularCuotas()


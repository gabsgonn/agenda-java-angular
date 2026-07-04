import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatarDataRelativa',
  standalone: true,
})
export class FormatarDataRelativaPipe implements PipeTransform {
  transform(value: string | Date | null | undefined): string {
    if (!value) return '';

    let dataAlvo: Date;

    if (typeof value === 'string' && value.includes('-')) {
      const partes = value.split('-');
      const ano = parseInt(partes[0], 10);
      const mes = parseInt(partes[1], 10) - 1;
      const dia = parseInt(partes[2], 10);

      dataAlvo = new Date(ano, mes, dia);
    } else {
      dataAlvo = new Date(value);
    }

    dataAlvo.setHours(0, 0, 0, 0);

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const diferencaTempo = dataAlvo.getTime() - hoje.getTime();
    const diferencaDias = Math.round(diferencaTempo / (1000 * 60 * 60 * 24));

    if (diferencaDias === 0) return 'Hoje';
    if (diferencaDias === 1) return 'Amanhã';
    if (diferencaDias === -1) return 'Ontem';

    const diaStr = String(dataAlvo.getDate()).padStart(2, '0');
    const mesStr = String(dataAlvo.getMonth() + 1).padStart(2, '0');
    const anoStr = dataAlvo.getFullYear();

    return `${diaStr}/${mesStr}`;
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'descricaoReduzida'
})
export class DescricaoReduzidaPipe implements PipeTransform {

  transform(texto: string, inicio: number, tamanho: number): string {
    if (texto.length > tamanho)
    {
      return texto.substr(inicio, tamanho) + '...';
    }

    return texto;
  }

}

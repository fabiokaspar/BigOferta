/*
// exemplo do map, mergeMap, switchMap, concatMap
fromEvent(document, 'click')
    .pipe(
    map(() => {
        console.log('clicou')
        return interval(1000).subscribe(x => {
        console.log(x)
        })
    })
    ).subscribe()

fromEvent(document, 'click')
    .pipe(
    mergeMap(() => {
        console.log('clicou')
        return interval(1000)
    })
    )
    .subscribe(x => console.log(x))

const observable = fromEvent(document, 'click')
    .pipe(
    switchMap(() => {
        console.log('clicou')
        return interval(1000)
    })
    );

observable.subscribe(x => console.log(x));

const observable = fromEvent(document, 'click')
    .pipe(
    concatMap(() => {
        console.log('clicou')
        return interval(1000).pipe(take(4))
    })
    );

observable.subscribe(x => console.log(x));
*/

/*
// Test2
this.ofertas = this.subjectPesquisa.pipe(
    switchMap(x => {
        return of(<Oferta[]>[x])
    })
)
*/

/*
// Test1
this.ofertas = this.subjectPesquisa.pipe(
    map(x => {
        return [x] as Oferta[];
    })
)
*/
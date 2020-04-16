import {Sushi, SushiMakerClass} from './sushi_class';


describe('SushiMaker Class', () => {
  // Spec variables
  let sushiMaker: SushiMakerClass;

  // Before Each
  beforeEach(() => {
    console.log('preparativos de nuestra sushi maker');
    sushiMaker = new SushiMakerClass('kanikama', 'nogiri');
  });

  // After Each

  afterEach(() => {
    console.log('terminamos de usar nuestra sushi maker es hora de limpiarla');
    sushiMaker = null;
    console.log('Estado de nuesra variable a la que haciamos referencia con la sushi maker');
    console.log(sushiMaker);
  });


  // Expectations
  it('Should create a Sushi maker', () => {
    console.log('typeof');
    console.log(typeof sushiMaker);
    console.log('object content');
    console.log(sushiMaker);
    expect(sushiMaker).toBeTruthy();
  });

  it('Preparar Sushi should\'ve been called with given params', () => {
    spyOn(sushiMaker, 'prepararSushi').and.callThrough();
    sushiMaker.prepararSushi('palta', 'lechuga');
    expect(sushiMaker.prepararSushi).toHaveBeenCalledWith('palta', 'lechuga');
  });

  it('Preparar Sushi should return a custom sushi when called with params , Normal', () => {
    const returnedValueIntercepted = sushiMaker.prepararSushi('palta', 'lechuga');
    expect(returnedValueIntercepted).toEqual({
      arroz: 'arroz blanco con un toque de vinagre',
      relleno: 'palta',
      envoltorio: 'lechuga'
    });
  });

  it('Preparar Sushi should return a custom sushi when called with params, Intercepted', () => {
    spyOn(sushiMaker, 'prepararSushi').and.callFake((param1, param2) => {
      console.log('params got on our interception');
      console.log(param1 , '  - ', param2);
      // For partial or complete mock
      return {
        arroz: 'arroz blanco con un toque de vinagre',
        relleno: 'atun',
        envoltorio: 'lechuga'
      } as Sushi;
    });
    const returnedValueIntercepted = sushiMaker.prepararSushi('palta', 'lechuga');
    console.log('returned value', returnedValueIntercepted);
    expect(returnedValueIntercepted).toEqual({
      arroz: 'arroz blanco con un toque de vinagre',
      relleno: 'atun',
      envoltorio: 'lechuga'
    });
  });

});

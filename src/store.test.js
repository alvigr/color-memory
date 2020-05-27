import { pairChecker, finishChecker } from './store';
import configureStore from 'redux-mock-store';

jest.useFakeTimers();
 
const mockStore = configureStore([pairChecker, finishChecker]);

describe('game store', () => {
  it('should dispatch OPEN_TILE', () => {
    const initialState = [
      {
        isOpen: false,
        color: '#fff',
        paired: false,
      },
      {
        isOpen: false,
        color: '#000',
        paired: false,
      },
    ];

    const store = mockStore(initialState);

    store.dispatch({ type: 'OPEN_TILE', index: 1 });

    const actions = store.getActions();
    const expectedPayload = [
      { type: 'OPEN_TILE', index: 1 },
    ];
    expect(actions).toEqual(expectedPayload);
  });

  it('should dispatch CHECK_PAIR after 1 second', () => {
    const initialState = [
      {
        isOpen: true,
        color: '#fff',
        paired: false,
      },
      {
        isOpen: false,
        color: '#000',
        paired: false,
      },
      {
        isOpen: false,
        color: '#fff',
        paired: false,
      },
      {
        isOpen: false,
        color: '#000',
        paired: false,
      },
    ];

    const store = mockStore(initialState);

    store.dispatch({ type: 'OPEN_TILE', index: 1 });

    jest.advanceTimersByTime(1000);

    const actions = store.getActions();
    const expectedPayload = [
      { type: 'OPEN_TILE', index: 1 },
      { type: 'CHECK_PAIR', indexes: [ 0, 1 ] }
    ];
    expect(actions).toEqual(expectedPayload);
  });

  it('shouldnt dispatch CHECK_PAIR earlier 1 second', () => {
    const initialState = [
      {
        isOpen: true,
        color: '#fff',
        paired: false,
      },
      {
        isOpen: false,
        color: '#000',
        paired: false,
      },
    ];

    const store = mockStore(initialState);

    store.dispatch({ type: 'OPEN_TILE', index: 1 });

    jest.advanceTimersByTime(500);

    const actions = store.getActions();
    const expectedPayload = [
      { type: 'OPEN_TILE', index: 1 },
    ];
    expect(actions).toEqual(expectedPayload);
  });

  it('should stop dispatch OPEN_TILE', () => {
    const initialState = [
      {
        isOpen: true,
        color: '#fff',
        paired: false,
      },
      {
        isOpen: true,
        color: '#000',
        paired: false,
      },
      {
        isOpen: false,
        color: '#fff',
        paired: false,
      },
      {
        isOpen: false,
        color: '#000',
        paired: false,
      },
    ];

    const store = mockStore(initialState);

    store.dispatch({ type: 'OPEN_TILE', index: 2 });

    const actions = store.getActions();
    const expectedPayload = [];
    expect(actions).toEqual(expectedPayload);
  });

  it('should dispatch FINISH without CHECK_PAIR', () => {
    const initialState = [
      {
        isOpen: false,
        color: '#fff',
        paired: true,
      },
      {
        isOpen: true,
        color: '#000',
        paired: false,
      },
      {
        isOpen: false,
        color: '#fff',
        paired: true,
      },
      {
        isOpen: true,
        color: '#000',
        paired: false,
      },
    ];

    const store = mockStore(initialState);

    store.dispatch({ type: 'CHECK_PAIR', indexes: [1, 3] });

    jest.advanceTimersByTime(1000);

    const actions = store.getActions();
    const expectedPayload = [
      { type: 'FINISH' },
    ];
    expect(actions).toEqual(expectedPayload);
  });

  it('should dispatch FINISH after open tile', () => {
    const initialState = [
      {
        isOpen: false,
        color: '#fff',
        paired: true,
      },
      {
        isOpen: true,
        color: '#000',
        paired: false,
      },
      {
        isOpen: false,
        color: '#fff',
        paired: true,
      },
      {
        isOpen: false,
        color: '#000',
        paired: false,
      },
    ];

    const store = mockStore(initialState);

    store.dispatch({ type: 'OPEN_TILE', index: 3 });

    jest.advanceTimersByTime(1000);

    const actions = store.getActions();
    const expectedPayload = [
      { type: 'OPEN_TILE', index: 3 },
      { type: 'FINISH' },
    ];
    expect(actions).toEqual(expectedPayload);
  });
});

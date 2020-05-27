import reducer from './reducers';

describe('game reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([]);
  });

  it('should handle OPEN_TILE', () => {
    expect(
      reducer(
        [
          {
            isOpen: false,
            color: '#fff',
            paired: false,
          }
        ],
        {
          type: 'OPEN_TILE',
          index: 0,
        },
      )
    ).toEqual(
      [
        {
          isOpen: true,
          color: '#fff',
          paired: false,
        },
      ]
    );
  });

  it('should handle two OPEN_TILE', () => {
    expect(
      reducer(
        [
          {
            isOpen: true,
            color: '#fff',
            paired: false,
          },
          {
            isOpen: false,
            color: '#fff',
            paired: false,
          },
        ],
        {
          type: 'OPEN_TILE',
          index: 1,
        },
      )
    ).toEqual(
      [
        {
          isOpen: true,
          color: '#fff',
          paired: false,
        },
        {
          isOpen: true,
          color: '#fff',
          paired: false,
        },
      ]
    )
  });

  it('should handle CHECK_PAIR with paired tiles', () => {
    expect(
      reducer(
        [
          {
            isOpen: true,
            color: '#fff',
            paired: false,
          },
          {
            isOpen: true,
            color: '#fff',
            paired: false,
          },
        ], 
        { 
          type: 'CHECK_PAIR', 
          indexes: [0,1],
        }
      )
    ).toEqual(
      [
        {
          isOpen: false,
          color: '#fff',
          paired: true,
        },
        {
          isOpen: false,
          color: '#fff',
          paired: true,
        },
      ]
    )
  });

  it('should handle CHECK_PAIR without paired tiles', () => {
    expect(
      reducer(
        [
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
        ], 
        { 
          type: 'CHECK_PAIR',
          indexes: [0,1],
        }
      )
    ).toEqual(
      [
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
      ]
    )
  });

  it('should handle RESET', () => {
    expect(
      reducer([], { type: 'RESET', numOfTiles: 4 })
    ).toHaveLength(4)
  });

  it('should handle FINISH', () => {
    expect(
      reducer(
        [
          {
            isOpen: false,
            color: '#fff',
            paired: true,
          },
          {
            isOpen: false,
            color: '#fff',
            paired: true,
          },
        ],
        { type: 'FINISH' })
    ).toEqual(
      [
        {
          isOpen: true,
          color: '#fff',
          paired: true,
        },
        {
          isOpen: true,
          color: '#fff',
          paired: true,
        },
      ]
    )
  });
});

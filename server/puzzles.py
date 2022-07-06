import itertools

PUZZLES = [
    {
        "id": "qGN0f2Os",
        "variant": "crazyhouse",
        "fen": "2rqkb1r/pp3pp1/4b2p/1P2p3/1P1p4/P2B4/1B1K2PP/R6R[NNNPPqnpp] b - - 0 19",
        "moves": ["Q@e3", "d2d1", "N@f2"],
        "type": "mate",
        "eval": "#2",
    },
    {
        "id": "QfEU1rab",
        "variant": "shogi",
        "fen": "l7l/7k1/1p2Gs1p1/p1g1sp2p/2p4N1/P3PPG1P/1PP+pn2P1/6SK1/LN2BG2L[NPPPSpr] w - - 0 48",
        "moves": ["S@g7", "h8i8", "e7f7", "i8h8", "N@g6", "f7g6", "f8g8", "h9i8", "g7h8+"],
        "type": "mate",
        "eval": "#5",
    },
    {
        "fen": "8/5k2/1pR4p/p2P2y1/P4l2/8/KB1hp3/7Q w - - 2 44",
        "variant": "orda",
        "eval": "#6",
        "type": "mate",
        "moves": ["h1h5"],
    },
    {
        "fen": "8/5R2/p2Q3p/4P1p1/4ka2/3h1N2/PP4PP/6K1 b - - 0 36",
        "variant": "orda",
        "eval": "#2",
        "type": "mate",
        "moves": ["d3e2", "g1h1", "e2f2"],
    },
    {
        "fen": "3/2l/L2/E2[GEgcc] b - - 0 6",
        "variant": "dobutsu",
        "eval": "#3",
        "type": "mate",
        "moves": ["c3c2"],
    },
    {
        "fen": "2l/2c/eL1/EC1[Gg] b - - 0 20",
        "variant": "dobutsu",
        "eval": "#3",
        "type": "mate",
        "moves": ["a2b3"],
    },
]

puzzles = itertools.cycle(PUZZLES)
